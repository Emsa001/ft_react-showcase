import React, { ICreateDomProps } from "react";
import { VDomManagerImpl } from "./manager";
import { addToDom } from "./utils";

export const unMountFull = (node: any) => {
    if (typeof node.type === "function") {
        React.vDomManager.components.get(node.componentName)?.onUnmount();
    }

    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            if (Array.isArray(child)) {
                for (const nestedChild of child) {
                    unMountFull(nestedChild);
                }
            } else {
                unMountFull(child);
            }
        }
    }
};

export async function mount(
    this: VDomManagerImpl,
    { vNode, parent, mode = "append", name, isSvg = false }: ICreateDomProps & { isSvg?: boolean }
  ): Promise<Element | null> {  
    if (vNode === null || typeof vNode === "undefined") {
        return parent;
    }

    if (Array.isArray(vNode)) {
        for (const child of vNode) {
            this.mount({ vNode: child, parent, name, isSvg });
        }
        return parent;
    }

    if (typeof vNode === "string" || typeof vNode === "number") {
        const textNode = document.createTextNode(vNode.toString());
        addToDom(textNode, parent, mode);
        return parent;
    }

    if (typeof vNode === "boolean") {
        if (vNode === false) {
            parent.remove();
        }
        return parent;
    }

    if (typeof vNode.type === "function") {
        const component = React.createComponentInstance(vNode);

        this.components.set(component.name, component);
        this.currentComponent = component;
        component.vNode = vNode.type(vNode.props, ...vNode.children);

        if (!component.vNode.type) {
            component.vNode.type = "div";
        }

        if (component.vNode === null) return null;
        component.vNode.componentName = component.name;

        component.isMounted = true;
        component.onMount();

        const newRef = await this.mount({ vNode: component.vNode, parent, name: component.name, mode, isSvg });
        component.vNode.ref = newRef as HTMLElement | null;
        return newRef;
    }

    const nextIsSvg = vNode.type == "svg" || isSvg;
    const dom = nextIsSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", vNode.type)
        : document.createElement(vNode.type);

    vNode.ref = dom as Element | null;

    // Set props
    for (const [key, value] of Object.entries(vNode.props)) {
        this.setProps({ ref: dom, key, value });
    }

    // Mount children recursively with SVG awareness
    for (const child of vNode.children) {
        this.mount({ vNode: child, parent: dom, name, isSvg: nextIsSvg });
    }

    addToDom(dom, parent, mode);
    return dom;
}
