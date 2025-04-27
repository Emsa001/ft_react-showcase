import React from "react";
import { VDomManagerImpl } from "./manager";

interface ICreateDomProps {
    vnode: IReactElement;
    parent: HTMLElement;
    mode?: "append" | "replace" | "before" | "after" | "create-only";
    name: string;
}

export function createDom(
    this: VDomManagerImpl,
    { vnode, parent, mode = "append", name }: ICreateDomProps
): HTMLElement {
    if (vnode === null || typeof vnode === "undefined") {
        return parent;
    }

    if (Array.isArray(vnode)) {
        for (const child of vnode) {
            this.createDom({ vnode: child, parent, name });
        }
        return parent;
    }

    if (typeof vnode === "string" || typeof vnode === "number" || typeof vnode === "boolean") {
        const textNode = document.createTextNode(vnode.toString());
        parent.appendChild(textNode);
        return parent;
    }

    if (typeof vnode.tag === "function") {
        const component = React.createComponentInstance(vnode);
        this.components.set(component.name, component);
        
        this.currentComponent = component;
        component.vNode = vnode.tag(vnode.props, ...vnode.children);
        this.currentComponent = null;

        component.isMounted = true;
        component.onMount();

        return this.createDom({ vnode: component.vNode, parent, name: component.name });
    }

    const dom = document.createElement(vnode.tag);
    vnode.ref = dom;
    
    // Set props
    for (const [key, value] of Object.entries(vnode.props)) {
        this.setProps({ ref: dom, key, value });
    }
    
    // Create children recursively
    for (const child of vnode.children) {
        this.createDom({ vnode: child, parent: dom, name });
    }
    
    if (mode === "replace") {
        parent.replaceChild(dom, parent);
    } else if (mode === "before") {
        parent.insertBefore(dom, parent.firstChild);
    } else if (mode === "after") {
        parent.after(dom);
    } else {
        parent.appendChild(dom);
    }
    return dom;
    
}
