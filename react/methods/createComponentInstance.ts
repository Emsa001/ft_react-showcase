import { ReactComponentInstance } from "react/types/types";
import React from "..";

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
            console.log("Component unmounted:", this.name);
            this.vNode?.ref?.remove();
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
