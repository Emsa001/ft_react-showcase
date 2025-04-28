import { VDomManagerImpl } from "./manager";

type ArrayAction = {
    action: "add" | "remove" | "move" | "update";
    element: IReactVNode;
    fromIndex?: number;
    toIndex?: number;
    ref?: HTMLElement | null;
};

interface IUpdateProps {
    oldNode: IReactElement;
    newVNode: IReactElement;
    ref: HTMLElement | null;
    parent: HTMLElement | null;
    index: number;
    name: string;
}

export function update(this: VDomManagerImpl, { oldNode, newVNode, ref, parent, index, name }: IUpdateProps) {
    // console.log("update", oldNode, newVNode, ref);
    if (Array.isArray(oldNode) && Array.isArray(newVNode)) {
        
        /* 
            CURRENT IMPLEMENTATION IS VERY BAD, DO NOT USE IN PRODUCTION

            TODO: Handle array diffing
            - Compare the two arrays and find the differences
            - Create a list of actions (add, remove, move, update)
            - Apply the actions to the DOM
        */

        if(!parent){
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        // remove full array (not a good solution)
        parent.innerHTML = "";        

        // create new array
        for (const child of newVNode as IReactVNode[]) {
            this.createDom({ vnode: child, parent: parent!, name });
        }

        return;
    }

    if (oldNode === null || typeof oldNode === "undefined") {
        if(!parent){
            console.warn("Cannot Create new now: Parent is null");
            return;
        }
        // console.log("Creating new node", newVNode);
        this.createDom({ vnode: newVNode, parent: parent, mode: "append", name });
        return;
    }

    if (newVNode === null || typeof newVNode === "undefined") {
        // console.log("Removing node", oldNode, ref);
        if(typeof oldNode === "object" && !Array.isArray(oldNode)){
            ref!.remove();
        }else{
            ref!.childNodes[index]?.remove();
        }
        return;
    }

    if (typeof oldNode === "boolean" || typeof newVNode === "boolean") {
        if (newVNode === false) {
            if (oldNode) this.createDom({ vnode: newVNode, parent: ref!, mode: "replace", name });
            return;
        }
    }

    if (
        (typeof oldNode === "string" || typeof oldNode === "number") &&
        (typeof newVNode === "string" || typeof newVNode === "number")
    ) {
        if (oldNode.toString() !== newVNode.toString()) {
            // console.log("Updating text node", oldNode, newVNode);
            ref!.textContent = newVNode.toString();
        }
        return;
    }

    if (typeof oldNode != typeof newVNode) {
        if(!parent){
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        const previousChild = parent.childNodes[index - 1] as HTMLElement || parent.lastChild

        if (oldNode === false) {
            this.createDom({ vnode: newVNode, parent: previousChild, mode: "after", name });
        } else {
            this.createDom({ vnode: newVNode, parent: ref!, mode: "replace", name });
        }
        return;
    }

    oldNode = oldNode as IReactVNode;
    newVNode = newVNode as IReactVNode;
    
    if (oldNode.tag !== newVNode.tag) {
        // console.log("[ Tag difference ]", oldNode, newVNode);

        this.createDom({ vnode: newVNode, parent: ref!, mode: "replace", name });
        return;
    }
    
    if(typeof newVNode.tag === "function"){
        if(JSON.stringify(oldNode.props) == JSON.stringify(newVNode.props)) return ;
        
        // console.log("[ Function difference ]", oldNode, newVNode);
        // this.createDom({ vnode: newVNode, parent: ref!, mode: "replace", name });

        const component = oldNode;
        const newComponent = newVNode.tag(newVNode.props, ...newVNode.children);
        
        console.log("New Component:", newComponent);
        console.log("Old Component:", component);

        this.components.set(newComponent.tag.name, newComponent);

        this.update({
            oldNode: oldNode,
            newVNode: newComponent,
            ref: ref,
            parent: ref?.parentElement!,
            index: 0,
            name: newComponent?.name || "",
        })
        
        
        if (component) {
            const saved = this.components.get(component.tag.name);
            if(saved) saved.vNode = newComponent;
        }
        
        return ;
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
        for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {

            const newChild = newVNode.children[i];
            const oldChild = oldNode.children[i];
            const childRef = oldChild?.ref || newChild?.ref || oldNode.ref!.childNodes[i] as HTMLElement | null;
     
            this.update({
                oldNode: oldChild,
                newVNode: newChild,
                ref: childRef,
                parent: ref,
                index: i,
                name,
            });
        }
    }
}
