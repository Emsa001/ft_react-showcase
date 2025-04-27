import { VDomManagerImpl } from "./manager";

type ArrayAction = {
    action: "add" | "remove" | "move" | "update";
    element: IReactVNode;
    fromIndex?: number;
    toIndex?: number;
    ref?: HTMLElement | null;
};

function handleArray(oldNode: IReactVNode[], newNode: IReactVNode[]): ArrayAction[] {
    const oldKeyMap = new Map<string, { vnode: IReactVNode; index: number }>();
    const newKeyMap = new Map<string, { vnode: IReactVNode; index: number }>();

    // Build maps
    for (let i = 0; i < oldNode.length; i++) {
        const oldChild = oldNode[i];
        if (oldChild?.key != null) {
            oldKeyMap.set(oldChild.key, { vnode: oldChild, index: i });
        }
    }

    for (let i = 0; i < newNode.length; i++) {
        const newChild = newNode[i];
        if (newChild?.key != null) {
            newKeyMap.set(newChild.key, { vnode: newChild, index: i });
        }
    }

    const actions: ArrayAction[] = [];

    // Detect removes
    for (const [key, { vnode, index }] of Array.from(oldKeyMap)) {
        if (!newKeyMap.has(key)) {
            actions.push({
                action: "remove",
                element: vnode,
                fromIndex: index,
                ref: vnode.ref ?? null,
            });
        }
    }

    // Detect adds and moves
    for (let i = 0; i < newNode.length; i++) {
        const newChild = newNode[i];
        if (newChild?.key != null) {
            const old = oldKeyMap.get(newChild.key);
            if (!old) {
                // New node
                actions.push({
                    action: "add",
                    element: newChild,
                    toIndex: i,
                });
            } else {
                actions.push({
                    action: "update",
                    element: newChild,
                    fromIndex: i,
                    toIndex: i,
                    ref: newChild.ref ?? null,
                });
            }
        }
    }

    return actions;
}

export function update(
    this: VDomManagerImpl,
    oldNode: IReactElement,
    newVNode: IReactElement,
    ref: HTMLElement,
    index: number,
    name: string
): void {
    if (oldNode === newVNode) return; 

    if (oldNode === null || typeof oldNode === "undefined") {
        console.log(ref);
        this.createDom({ vnode: newVNode, parent: ref, mode: "after", name });
        return;
    }

    if (newVNode === null || typeof newVNode === "undefined") {
        ref.remove();
        return;
    }

    if (typeof oldNode === "string" || typeof oldNode === "number") {
        if (oldNode.toString() !== newVNode.toString()) {
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
        // this.createDom(newVNode, ref, name);
        return;
    }

    oldNode = oldNode as IReactVNode;
    newVNode = newVNode as IReactVNode;

    newVNode.ref = ref;

    // Check for children
    if (Array.isArray(oldNode.children) && Array.isArray(newVNode.children)) {
        for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {
            const childRef = oldNode.children[i]?.ref || newVNode.children[i]?.ref || ref;
            this.update(oldNode.children[i], newVNode.children[i], childRef, i, name);
        }
    }
}
