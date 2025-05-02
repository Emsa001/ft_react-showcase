import { ReactComponentInstance } from "react/types/types";
import React from "..";

const unMountFunctionChild = (node: any) => {
    // Check if the current node's type is a function
    if (typeof node.type === "function") {
        React.vDomManager.components.get(node.componentName)?.onUnmount();
    }

    // If the node has children, recursively check them
    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            // Handle cases where children are nested arrays
            if (Array.isArray(child)) {
                for (const nestedChild of child) {
                    unMountFunctionChild(nestedChild);
                }
            } else {
                unMountFunctionChild(child);
            }
        }
    }
};

export function createComponentInstanceMethod(element: ReactElement): ReactComponentInstance {
    if (typeof element.type !== "function") {
        throw new Error("Invalid component type");
    }

    const name = !React.vDomManager.components.has(element.type.name)
        ? element.type.name
        : element.type.name + Math.random().toString(36).substring(2, 15);

    element.componentName = name;

    return {
        name: name,
        isMounted: false,
        isUpdating: false,
        isDirty: false,

        hooks: [],
        hookIndex: 0,

        vNode: null,
        jsx: element,

        queueFunctions: new Set<() => void>(),

        onMount() {
            console.log("Component mounted:", this.name);
            this.isMounted = true;
        },
        onUnmount() {
            console.log("Component unmounted:", this);
            this.vNode?.ref?.remove();

            const allChildren = Array.isArray(this.vNode?.children) ? this.vNode?.children : [];
            console.log("Unmounting children:", allChildren);
            for (const child of allChildren) {
                unMountFunctionChild(child);
            }

            React.vDomManager.components.delete(this.name);
            React.vDomManager.staticComponents.delete(this.name);
            this.queueFunctions.forEach((fn) => fn());
            this.queueFunctions.clear();

            this.isMounted = false;
            this.vNode = null;
            this.jsx = null;
            this.hooks = [];
            this.hookIndex = 0;
        },
        onUpdate() {
            console.log("Updating component:", this.name);
        },
    };
}
