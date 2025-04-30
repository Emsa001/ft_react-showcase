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

function addToDom(dom: HTMLElement | Text, parent: HTMLElement, mode: mode){

    // console.log("addToDom", dom, parent, mode);

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
): Promise<HTMLElement> {
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
        // Check if the component is already mounted

        /* TODO: check existing component remounting: */
        // if (this.currentComponent && this.components.has(this.currentComponent.name)) {
        //     const component = this.currentComponent;
        //     console.log("Component already mounted:", component.name);
        //     // console.log("Component already mounted:", component.name); 
        //     // this.currentComponent = component;
        //     // const newVNode = vnode.type(component.vNode!.props, ...component.vNode!.children);
        //     // component.hookIndex = 0;

        //     // component.jsx = vnode;         
        //     // // await scheduleUpdate(component, component.hooks);
        //     // console.log("OLD VNODE",component.vNode);

        //     // // addToDom(component.vNode!.ref!, parent, mode);
        //     // this.currentComponent = null;
        //     // return component.vNode!.ref!;
        //     return component.vNode!.ref!;
        // }

        const component = React.createComponentInstance(vnode);
        this.components.set(component.name, component);
                
        this.currentComponent = component;
        component.vNode = vnode.type(vnode.props, ...vnode.children);
        
        component.isMounted = true;
        component.onMount();
        
        const newRef = await this.mount({ vnode: component.vNode, parent, name: component.name, mode });
        component.vNode.ref = newRef;
        this.currentComponent = null;
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
