import React from "..";
import { IVDomManager, IReactComponent } from "../types";

export class VDomManagerImpl implements IVDomManager {
    rootDom: HTMLElement | null = null;

    components: Map<string, IReactComponent> = new Map();
    currentComponent: IReactComponent | null = null;

    mount(component: IReactComponent, container: HTMLElement): void {
        console.log(this.components);

        this.rootDom = this.createDom(component.vNode, container, component.name);
        container.appendChild(this.rootDom);

        console.log(this.components);
    }

    // TODO: Implement diffing algorithm
    update(oldNode: IReactElement, newVNode: IReactElement, ref: HTMLElement, index: number, name: string): void {
        // console.log(name, oldNode, newVNode);
        if(oldNode === newVNode) return;
        
        if(Array.isArray(oldNode) && Array.isArray(newVNode)) {
            for (let i = 0; i < Math.max(oldNode.length, newVNode.length); i++) {
                const ref = oldNode[i]?.ref || newVNode[i]?.ref;
                this.update(oldNode[i], newVNode[i], ref, i, name);
            }
            return;
        }

        if (oldNode === null || typeof oldNode === "undefined") {
            console.log(ref);
            this.createDom(newVNode, ref, name);
            return;
        }
        
        if (newVNode === null || typeof newVNode === "undefined") {
            ref.remove();
            return;
        }
        
        if (typeof oldNode === "string" || typeof oldNode === "number") {
            if (oldNode.toString() !== newVNode.toString()) {
                ref.childNodes[index].textContent = newVNode.toString();
            }
            return;
        }

        if (typeof oldNode === "boolean" || typeof newVNode === "boolean") {
            console.log("Boolean");
            return;
        }

        if(typeof oldNode != typeof newVNode) {
            console.log("Type mismatch");
            ref.remove();
            this.createDom(newVNode, ref, name);
            return;
        }

        oldNode = oldNode as IReactVNode;
        newVNode = newVNode as IReactVNode;

        // check for children
        if (Array.isArray(oldNode.children) && Array.isArray(newVNode.children)) {
            for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {
                const childRef = oldNode.children[i]?.ref || newVNode.children[i]?.ref || ref;
                this.update(oldNode.children[i], newVNode.children[i], childRef, i, name);
            }
        }
    }

    private createDom(vnode: IReactElement, parent: HTMLElement, name: string): HTMLElement {
        if (vnode === null || typeof vnode === "undefined") {
            return parent;
        }

        if (Array.isArray(vnode)) {
            for (const child of vnode) {
                this.createDom(child, parent, name);
            }
            return parent;
        }

        if (typeof vnode === "string" || typeof vnode === "number" || typeof vnode === "boolean") {
            const textNode = document.createTextNode(vnode.toString());

            parent.appendChild(textNode);
            return parent;
        }

        if(typeof vnode.tag === "function") {
            if(typeof vnode.tag === "function") {
                const component = React.createComponentInstance(vnode);
                this.components.set(component.name, component);
                this.currentComponent = component;
                component.vNode = vnode.tag(vnode.props, ...vnode.children);
                this.currentComponent = null;
                
                component.isMounted = true;
                component.onMount();
                return this.createDom(component.vNode, parent, component.name);
            }
        }

        const dom = document.createElement(vnode.tag);
        vnode.ref = dom;

        for (const [key, value] of Object.entries(vnode.props)) {
            this.setProps({ ref: dom, key, value });
        }

        for (const child of vnode.children) {
            this.createDom(child, dom, name);
        }

        parent.appendChild(dom);
        return dom;
    }

    setProps({ ref, key, value }: { ref: HTMLElement; key: string; value: any }): void {
        if (key === "children") return;

        if (key === "style" && typeof value === "object") {
            Object.assign(ref.style, value);
            return;
        }

        if (key === "ref") {
            value.current = ref;
            return;
        }

        if (key === "onChange" && ref instanceof HTMLInputElement) {
            ref.removeEventListener("input", (ref as any)._onChangeListener);
            ref.addEventListener("input", value);
            (ref as any)._onChangeListener = value;
            return;
        }

        if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            ref.removeEventListener(eventName, (ref as any)[key]);
            ref.addEventListener(eventName, value);
            (ref as any)[key] = value;
        }

        (ref as any)[key] = value;
    }
}
