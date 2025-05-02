import React from "react";
import { VDomManagerImpl } from "./manager";
import { scheduleUpdate } from "react/hooks/useState";

type mode = "append" | "replace" | "before" | "after" | "create-only";

interface ICreateDomProps {
    vnode: ReactNode;
    parent: HTMLElement;
    mode?: mode;
    name: string;
}

function addToDom(dom: HTMLElement | Text, parent: HTMLElement | null, mode: mode){
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
    { vnode, parent, mode = "append", name }: ICreateDomProps
): Promise<HTMLElement | null> {
    if (vnode === null || typeof vnode === "undefined") {
        return parent;
    }

    if (Array.isArray(vnode)) {
        for (const child of vnode) {
            this.mount({ vnode: child, parent, name });
        }
        return parent;
    }
    
    if (typeof vnode === "string" || typeof vnode === "number") {
        const textNode = document.createTextNode(vnode.toString())
        addToDom(textNode, parent, mode);
        
        return parent;
    }
    
    if(typeof vnode === "boolean"){        
        if(vnode === false){
            parent.remove();
        }
        return parent;
    }

    if (typeof vnode.type === "function") {

        /*
         * Check if the component is already mounted, if so, update it
        */

        const currentComponent = vnode.componentName && this.components.get(vnode.componentName);
        if (currentComponent) {
            await scheduleUpdate(currentComponent, currentComponent.hooks);
            addToDom(currentComponent.vNode!.ref!, parent, mode);

            return currentComponent.vNode!.ref!;
        }

        /*
         * Component is new, create a new instance and mount
        */

        const component = React.createComponentInstance(vnode);
        
        this.components.set(component.name, component);
        this.currentComponent = component;
        component.vNode = vnode.type(vnode.props, ...vnode.children);

        if(component.vNode === null) return null;
        component.vNode.componentName = component.name;
        
        component.isMounted = true;
        component.onMount();
        
        const newRef = await this.mount({ vnode: component.vNode, parent, name: component.name, mode });
        component.vNode.ref = newRef;
        // this.currentComponent = null;
        return newRef;
    }

    const dom = document.createElement(vnode.type);
    vnode.ref = dom;

    // Set props
    for (const [key, value] of Object.entries(vnode.props)) {
        this.setProps({ ref: dom, key, value });
    }
    
    // Create children recursively
    for (const child of vnode.children) {
        this.mount({ vnode: child, parent: dom, name });
    }

    addToDom(dom, parent, mode);
    return dom;
    
}
