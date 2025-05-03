import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreejsTest = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const plane = new THREE.Plane();
        const intersectPoint = new THREE.Vector3();
        const offset = new THREE.Vector3();

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        let isDragging = false;
        let isRotating = false;
        let selectedObject: THREE.Object3D | null = null;
        let prevMouseX = 0;

        const onMouseDown = (event: MouseEvent) => {
            if (!mountRef.current) return;

            prevMouseX = event.clientX;

            // Right click
            if (event.button === 2) {
                isRotating = true;
                return;
            }

            // Left click
            if (event.button === 0) {
                const bounds = mountRef.current.getBoundingClientRect();
                mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
                mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(cube);

                if (intersects.length > 0) {
                    selectedObject = intersects[0].object;
                    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), intersects[0].point);
                    offset.copy(intersects[0].point).sub(selectedObject.position);
                    isDragging = true;
                }
            }
        };

        const onMouseMove = (event: MouseEvent) => {
            if (!mountRef.current) return;

            const bounds = mountRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

            if (isDragging && selectedObject) {
                raycaster.setFromCamera(mouse, camera);
                if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
                    selectedObject.position.copy(intersectPoint.sub(offset));
                }
            }

            if (isRotating) {
                const deltaX = event.clientX - prevMouseX;
                prevMouseX = event.clientX;

                // Horizontal camera rotation around cube
                const angle = deltaX * 0.005;

                const x = camera.position.x;
                const z = camera.position.z;

                const newX = x * Math.cos(angle) - z * Math.sin(angle);
                const newZ = x * Math.sin(angle) + z * Math.cos(angle);

                camera.position.x = newX;
                camera.position.z = newZ;
                camera.lookAt(scene.position);
            }
        };

        const onMouseUp = (event: MouseEvent) => {
            console.log("Mouse up", event.button);
            if (event.button === 2) isRotating = false;
            if (event.button === 0) {
                isDragging = false;
                selectedObject = null;
            }
        };

        // Disable context menu so right-click works
        const onContextMenu = (e: MouseEvent) => e.preventDefault();

        mountRef.current.addEventListener("mousedown", onMouseDown);
        mountRef.current.addEventListener("mousemove", onMouseMove);
        mountRef.current.addEventListener("mouseup", onMouseUp);
        mountRef.current.addEventListener("contextmenu", onContextMenu);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (!mountRef.current) return;
            mountRef.current.removeChild(renderer.domElement);
            mountRef.current.removeEventListener("mousedown", onMouseDown);
            mountRef.current.removeEventListener("mousemove", onMouseMove);
            mountRef.current.removeEventListener("mouseup", onMouseUp);
            mountRef.current.removeEventListener("contextmenu", onContextMenu);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "100%", height: "100vh", overflow: "hidden" }} />;
};

export { ThreejsTest };
