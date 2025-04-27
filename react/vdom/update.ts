import { VDomManagerImpl } from "./manager";

type ArrayAction = {
    action: "add" | "remove" | "move" | "update";
    element: IReactVNode;
    fromIndex?: number;
    toIndex?: number;
    ref?: HTMLElement | null;
};

export function update(
    this: VDomManagerImpl,
    oldNode: IReactElement,
    newVNode: IReactElement,
    ref: HTMLElement,
    index: number,
    name: string
): void {
    if (oldNode === newVNode) return; 

    if (Array.isArray(oldNode) && Array.isArray(newVNode)) {
        // remove full array
        for (const child of oldNode as IReactVNode[]) {
            child.ref?.remove();
        }

        // create new array
        for (const child of newVNode as IReactVNode[]) {
            this.createDom({ vnode: child, parent: ref, name });
        }
    
        return;
    }  

    if (oldNode === null || typeof oldNode === "undefined") {
        console.log("Creating new node", newVNode);
        this.createDom({ vnode: newVNode, parent: ref, mode: "append", name });
        return;
    }

    if (newVNode === null || typeof newVNode === "undefined") {
        console.log("Removing node", oldNode);
        ref.remove();
        return;
    }

    if (typeof oldNode === "string" || typeof oldNode === "number") {
        if (oldNode.toString() !== newVNode.toString()) {
            console.log("Updating text node", oldNode, newVNode);
            ref.childNodes[index].textContent = newVNode.toString();
        }
        return;
    }

    if (typeof oldNode === "boolean" || typeof newVNode === "boolean") {
        console.log("Boolean");
        return;
    }

    if (typeof oldNode != typeof newVNode) {
        console.log("Type mismatch");
        ref.remove();
        this.createDom({ vnode: newVNode, parent: ref, mode: "append", name });
        return;
    }

    oldNode = oldNode as IReactVNode;
    newVNode = newVNode as IReactVNode;

    newVNode.ref = ref;

    // Set props
    for (const [key, value] of Object.entries(newVNode.props)) {
        this.setProps({ ref: ref, key, value });
    }

    // Check for children
    if (Array.isArray(oldNode.children) && Array.isArray(newVNode.children)) {
        for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {
            const childRef = oldNode.children[i]?.ref || newVNode.children[i]?.ref || ref;
            this.update(oldNode.children[i], newVNode.children[i], childRef, i, name);
        }
    }
}
