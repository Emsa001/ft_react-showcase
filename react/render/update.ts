import React, { IS_DEVELOPMENT } from "..";
import { VDomManagerImpl } from "./manager";

interface IUpdateProps {
    oldNode: ReactNode;
    newVNode: ReactNode;
    ref: HTMLElement | null;
    parent: HTMLElement | null;
    index: number;
    name: string;
}

export let componentsInUse: string[] = [];

export const unMountFunctionChild = (node: any) => {
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

const needUpdate = (oldProps: any, newProps: any) => {
    if (oldProps === newProps) return false;

    const oldKeys = Object.keys(oldProps);
    const newKeys = Object.keys(newProps);

    if (oldKeys.length !== newKeys.length) return true;

    for (const key of oldKeys) {
        if (key === "children" || key === "ref") continue;
        if (oldProps[key] !== newProps[key]) return true;
    }

    return false;
};

let addToIndex = 0;

export function update(this: VDomManagerImpl, { oldNode, newVNode, ref, parent, index, name }: IUpdateProps) {
    if (Array.isArray(oldNode) && Array.isArray(newVNode)) {
        /* 
            TODO: Key checking
        */
        for (let i = 0; i < Math.max(oldNode.length, newVNode.length); i++) {
            const newChild = newVNode[i];
            const oldChild = oldNode[i];
            const childRef = oldChild?.ref || newChild?.ref || null;

            // console.log("========================")
            // console.log("newChild", newChild);
            // console.log("oldChild", oldChild);
            // console.log("parent", parent);
            // console.log("========================")

            this.update({
                oldNode: oldChild,
                newVNode: newChild,
                ref: childRef,
                parent,
                index: i,
                name,
            });
        }

        // if(!parent){
        //     console.warn("Cannot Create new now: Parent is null");
        //     return;
        // }

        // // remove full array (not a good solution)
        // parent.innerHTML = "";

        // // create new array
        // for (const child of newVNode as ReactElement[]) {
        //     this.mount({ vnode: child, parent: parent!, name });
        // }

        return;
    }

    if (oldNode === null || typeof oldNode === "undefined") {
        if (!parent) {
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        if (IS_DEVELOPMENT) console.log("[ Old node is null ]", oldNode, newVNode);
        this.mount({ vnode: newVNode, parent: parent, mode: "append", name });
        return;
    }

    if (newVNode === null || typeof newVNode === "undefined") {
        if (IS_DEVELOPMENT) console.log("[ New node is null ]", oldNode, newVNode);

        unMountFunctionChild(oldNode);
        // if (
        //     typeof oldNode === "object" &&
        //     !Array.isArray(oldNode) &&
        //     typeof oldNode.type === "function"
        // ) {
        //     this.components.get(oldNode.componentName!)?.onUnmount();
        //     return;
        // }

        ref?.remove();
        return;
    }

    if (typeof oldNode === "boolean" || typeof newVNode === "boolean") {
        if (oldNode === newVNode) return;

        if (IS_DEVELOPMENT) console.log("[ Boolean difference ]", oldNode, newVNode, ref);

        if (newVNode === false) {
            // if (typeof oldNode === "object" && oldNode.componentName) {
            //     const component = this.components.get(oldNode.componentName);
            //     console.log("Unmounting component:", oldNode.componentName, component);
            //     if (component) {
            //         component.onUnmount();
            //     }
            // }

            unMountFunctionChild(oldNode);
            if (typeof oldNode != "object" || (typeof oldNode === "object" && typeof oldNode.type !== "function")) {
                // this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
                ref?.remove();
            }
            return;
        }

        if (!parent) {
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        if (index - 1 < 0) {
            if (IS_DEVELOPMENT) console.log("Mounting first child", parent);
            this.mount({ vnode: newVNode, parent: parent as HTMLElement, mode: "before", name });
            addToIndex++;
        } else {
            const previousChild = (parent.childNodes[index - 1] as HTMLElement) || parent.lastChild;
            if (IS_DEVELOPMENT) console.log("Mounting after previous child", previousChild);
            this.mount({ vnode: newVNode, parent: previousChild, mode: "after", name });
        }
        return;
    }

    if ((typeof oldNode === "string" || typeof oldNode === "number") && (typeof newVNode === "string" || typeof newVNode === "number")) {
        if (oldNode.toString() !== newVNode.toString()) {
            ref!.textContent = newVNode.toString();
        }
        return;
    }

    if (typeof oldNode != typeof newVNode) {
        if (IS_DEVELOPMENT) console.log("[ Type difference ]", oldNode, newVNode);
        this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
        unMountFunctionChild(oldNode);
        return;
    }

    oldNode = oldNode as ReactElement;
    newVNode = newVNode as ReactElement;
    if (oldNode.componentName) newVNode.componentName = oldNode.componentName;

    if (typeof newVNode.type === "function" && typeof oldNode.type === "function") {
        // Compare props to check if function needs an update;
        const oldProps = oldNode.props || {};
        const newProps = newVNode.props || {};
        const isDirty = oldNode.componentName && this.components.get(oldNode.componentName!)?.isDirty;

        if (!needUpdate(oldProps, newProps) && !isDirty) {
            if (IS_DEVELOPMENT) console.log("[ Function component ], no update necessary", oldNode, newVNode);
            return;
        }

        const newComponent = newVNode.type(newVNode.props, ...newVNode.children);
        newComponent.componentName = newVNode.componentName;
        const oldComponent = this.components.get(oldNode.componentName!);

        if (!oldComponent) {
            console.warn("Old component not found", oldNode, newVNode);
            return;
        }

        const componentName = typeof newComponent.type === "function" ? newComponent.type.name : "";

        if (IS_DEVELOPMENT) console.log("[ Function component ]", newComponent, oldComponent.vNode);
        this.currentComponent = oldComponent;

        this.update({
            oldNode: oldComponent?.vNode,
            newVNode: newComponent,
            ref: ref,
            parent: ref?.parentElement!,
            index: 0,
            name: componentName,
        });

        // TODO: if something doesn't work correctly, probably because of it
        oldComponent!.vNode!.children = newComponent.children;
        oldComponent!.vNode!.componentName = componentName;
        oldComponent!.isDirty = false;

        return;
    }

    if (oldNode.type !== newVNode.type) {
        if (IS_DEVELOPMENT) console.log("[ Element type difference ]", oldNode, newVNode);

        this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
        unMountFunctionChild(oldNode);
        return;
    }

    // Set props
    const oldProps = oldNode.props || {};
    const newProps = newVNode.props || {};

    // Add or update props
    for (const [key, value] of Object.entries(newProps)) {
        this.setProps({ ref: ref!, key, value });
    }

    // Remove props that no longer exist
    for (const key of Object.keys(oldProps)) {
        if (!(key in newProps)) {
            this.removeProp({ ref: ref!, key });
        }
    }

    newVNode.ref = ref;

    // Check for children
    if (Array.isArray(oldNode.children) && Array.isArray(newVNode.children)) {
        let realIndex = 0;
        addToIndex = 0;
        for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {
            const newChild = newVNode.children[i];
            const oldChild = oldNode.children[i];
            const childRef = oldChild?.ref || newChild?.ref || (oldNode.ref!.childNodes[realIndex] as HTMLElement | null);

            if (newChild && oldChild) realIndex++;

            // console.log("========================")
            // console.log("newChild", newChild);
            // console.log("oldChild", oldChild);
            // console.log("childRef", childRef);
            // console.log("index", i,oldNode.ref!.childNodes);
            // console.log("realIndex", realIndex);
            // console.log("addToIndex", addToIndex);

            this.update({
                oldNode: oldChild,
                newVNode: newChild,
                ref: childRef,
                parent: ref,
                index: realIndex + addToIndex,
                name,
            });

            // console.log("========================")
        }
    }
}
