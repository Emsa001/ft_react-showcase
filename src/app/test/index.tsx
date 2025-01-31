import React, { useEffect, useRef } from "react";
import { useTest } from "../../context/testContext";
import { createCanvas } from "canvas";

export default function TestPage() {
    const { number, setNumber, setName } = useTest();
    const ref = useRef(null);

    useEffect(() => {
        const canvas = createCanvas(200, 200);
        const ctx = canvas.getContext("2d");

        // Draw a circle
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        // Append the canvas to the ref element
        if (ref.current) {
            ref.current.appendChild(canvas);
        }
    }, []);

    return (
        <div>
            <div ref={ref}/>
            {/* <button onClick={() => setNumber(number + 1)}>cliek me</button>
            <p>Hello from test1: {number}</p> */}
        </div>
    );
}