import React, { IS_DEVELOPMENT, UpdateProps } from "..";
import { mount, unMountNode } from "./mount";
import { removeProp, setProps } from "./props";

const areNodesDifferent = (oldNode: ReactElement, newNode: ReactElement): boolean => {
    if (oldNode.type !== newNode.type) return true;

    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];

    if (oldChildren.length !== newChildren.length) return true;

    // Compare props
    const oldProps = oldNode.props || {};
    const newProps = newNode.props || {};
    const oldPropsKeys = Object.keys(oldProps);
    const newPropsKeys = Object.keys(newProps);

    if (oldPropsKeys.length !== newPropsKeys.length) return true;

    for (const key of oldPropsKeys) {
        if (oldProps[key] !== newProps[key]) return true;
    }

    for (let i = 0; i < oldChildren.length; i++) {
        const oldChild = oldChildren[i];
        const newChild = newChildren[i];

        if (typeof oldChild === "string" || typeof oldChild === "number") {
            if (oldChild !== newChild) return true;
        } else if (typeof oldChild === "object" && typeof newChild === "object") {
            if (areNodesDifferent(oldChild, newChild)) return true;
        } else {
            return true;
        }
    }

    return false;
};


let addToIndex = 0;

export function update({ oldNode, newNode, ref, parent, index, name }: UpdateProps) {
    if (Array.isArray(oldNode) && Array.isArray(newNode)) {
        /* 
            TODO: Key checking
        */
        for (let i = 0; i < Math.max(oldNode.length, newNode.length); i++) {
            const newChild = newNode[i];
            const oldChild = oldNode[i];
            const childRef = oldChild?.ref || newChild?.ref || null;

            update({
                oldNode: oldChild,
                newNode: newChild,
                ref: childRef,
                parent,
                index: i,
                name,
            });
        }

        return;
    }

    if (oldNode === null || typeof oldNode === "undefined") {
        if (!parent) {
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        if (IS_DEVELOPMENT) console.log("[ Old node is null ]", oldNode, newNode);
        mount({ vNode: newNode, parent: parent, mode: "append", name });
        return;
    }

    if (newNode === null || typeof newNode === "undefined") {
        if (IS_DEVELOPMENT) console.log("[ New node is null ]", oldNode, newNode);

        unMountNode(oldNode);
        ref?.remove();
        return;
    }

    if (typeof oldNode === "boolean" || typeof newNode === "boolean") {
        if (oldNode === newNode) return;

        if (IS_DEVELOPMENT) console.log("[ Boolean difference ]", oldNode, newNode, ref);

        if (newNode === false) {
            unMountNode(oldNode);
            if (typeof oldNode != "object" || (typeof oldNode === "object" && typeof oldNode.type !== "function")) {
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
            mount({ vNode: newNode, parent: parent as HTMLElement, mode: "before", name });
            addToIndex++;
        } else {
            const previousChild = (parent.childNodes[index - 1] as HTMLElement) || parent.lastChild;
            if (IS_DEVELOPMENT) console.log("Mounting after previous child", previousChild);
            mount({ vNode: newNode, parent: previousChild, mode: "after", name });
        }
        return;
    }

    if ((typeof oldNode === "string" || typeof oldNode === "number") && (typeof newNode === "string" || typeof newNode === "number")) {
        if (oldNode.toString() !== newNode.toString()) {
            ref!.textContent = newNode.toString();
        }
        return;
    }

    if (typeof oldNode != typeof newNode) {
        if (IS_DEVELOPMENT) console.log("[ Type difference ]", oldNode, newNode);
        mount({ vNode: newNode, parent: ref!, mode: "replace", name });
        unMountNode(oldNode);
        return;
    }

    oldNode = oldNode as ReactElement;
    newNode = newNode as ReactElement;
    if (oldNode.componentName) newNode.componentName = oldNode.componentName;

    if (typeof newNode.type === "function" && typeof oldNode.type === "function") {
        // Compare props to check if function needs an update;
        const oldComponent = React.components.get(oldNode.componentName!);
        if (!oldComponent) {
            console.warn("Old component not found", oldNode, newNode);
            return;
        }

        if (areNodesDifferent(oldNode, newNode)) {
            oldComponent.isDirty = true;
        }

        const isDirty = oldNode.componentName && React.components.get(oldNode.componentName!)?.isDirty;
        if (!isDirty) {
            if (IS_DEVELOPMENT) {
                console.log("[ Function component ], no update necessary");
                console.log("Old node", oldNode);
                console.log("New node", newNode);
                console.log("[ Component ]", React.components.get(oldNode.componentName!));
            }
            return;
        }

        const newComponent = newNode.type(newNode.props, ...newNode.children);
        newComponent.componentName = newNode.componentName;

        oldComponent.isDirty = false;
        const componentName = typeof newComponent.type === "function" ? newComponent.type.name : "";

        if (IS_DEVELOPMENT) console.log("[ Function component ]", newComponent, oldComponent);
        React.currentComponent = oldComponent;

        update({
            oldNode: oldComponent?.vNode || oldNode,
            newNode: newComponent,
            ref: ref,
            parent: ref?.parentElement!,
            index: 0,
            name: componentName,
        });

        // TODO: if something doesn't work correctly, probably because of it
        if (oldComponent.vNode) {
            oldComponent.vNode.children = newComponent.children;
            oldComponent.vNode.componentName = componentName;
        }

        return;
    }

    if (oldNode.type !== newNode.type) {
        if (IS_DEVELOPMENT) console.log("[ Element type difference ]", oldNode, newNode);

        mount({ vNode: newNode, parent: ref!, mode: "replace", name });
        unMountNode(oldNode);
        return;
    }

    // Set props
    const oldProps = oldNode.props || {};
    const newProps = newNode.props || {};

    // Add or update props
    for (const [key, value] of Object.entries(newProps)) {
        setProps({ ref: ref!, key, value });
    }

    // Remove props that no longer exist
    for (const key of Object.keys(oldProps)) {
        if (!(key in newProps)) {
            removeProp({ ref: ref!, key });
        }
    }

    newNode.ref = ref;

    // Check for children
    if (Array.isArray(oldNode.children) && Array.isArray(newNode.children)) {
        let realIndex = 0;
        addToIndex = 0;
        for (let i = 0; i < Math.max(oldNode.children.length, newNode.children.length); i++) {
            const newChild = newNode.children[i];
            const oldChild = oldNode.children[i];
            const childRef = oldChild?.ref || newChild?.ref || (oldNode.ref!.childNodes[realIndex] as HTMLElement | null);

            if (newChild && oldChild) realIndex++;

            update({
                oldNode: oldChild,
                newNode: newChild,
                ref: childRef,
                parent: ref,
                index: realIndex + addToIndex,
                name,
            });
        }
    }
}
