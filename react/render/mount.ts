import React, { ICreateDomProps, MountMode } from "react";
import { VDomManagerImpl } from "./manager";

const isSvgElement = (type: string) => type === "svg" || type === "circle" || type === "rect" || type === "path" || type === "line" || type === "ellipse" || type === "polygon" || type === "polyline";

function addToDom(dom: Element | Text, parent: Element | null, mode: MountMode){
    if(!parent){
        throw new Error("Parent is null");
    }

    if (mode === "replace") {
        parent.replaceWith(dom);
    } else if (mode === "before") {
        parent.insertBefore(dom, parent.firstChild);
    } else if (mode === "after") {
        parent.after(dom);
    } else {
        parent.appendChild(dom);
    }
}

export async function mount(
    this: VDomManagerImpl,
    { vnode, parent, mode = "append", name, isSvg = false }: ICreateDomProps & { isSvg?: boolean }
  ): Promise<Element | null> {  
    if (vnode === null || typeof vnode === "undefined") {
        return parent;
    }

    if (Array.isArray(vnode)) {
        for (const child of vnode) {
            this.mount({ vnode: child, parent, name, isSvg });
        }
        return parent;
    }

    if (typeof vnode === "string" || typeof vnode === "number") {
        const textNode = document.createTextNode(vnode.toString());
        addToDom(textNode, parent, mode);
        return parent;
    }

    if (typeof vnode === "boolean") {
        if (vnode === false) {
            parent.remove();
        }
        return parent;
    }

    if (typeof vnode.type === "function") {
        const component = React.createComponentInstance(vnode);

        this.components.set(component.name, component);
        this.currentComponent = component;
        component.vNode = vnode.type(vnode.props, ...vnode.children);

        if (!component.vNode.type) {
            component.vNode.type = "div";
        }

        if (component.vNode === null) return null;
        component.vNode.componentName = component.name;

        component.isMounted = true;
        component.onMount();

        const newRef = await this.mount({ vnode: component.vNode, parent, name: component.name, mode, isSvg });
        component.vNode.ref = newRef as HTMLElement | null;
        return newRef;
    }

    const nextIsSvg = isSvgElement(vnode.type) || isSvg;
    const dom = nextIsSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", vnode.type)
        : document.createElement(vnode.type);

    vnode.ref = dom as Element | null;

    // Set props
    for (const [key, value] of Object.entries(vnode.props)) {
        this.setProps({ ref: dom, key, value });
    }

    // Mount children recursively with SVG awareness
    for (const child of vnode.children) {
        this.mount({ vnode: child, parent: dom, name, isSvg: nextIsSvg });
    }

    addToDom(dom, parent, mode);
    return dom;
}
