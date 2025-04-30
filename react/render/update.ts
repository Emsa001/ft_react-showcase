import { ReactComponentInstance } from "react/types/types";
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

export function update(this: VDomManagerImpl, { oldNode, newVNode, ref, parent, index, name }: IUpdateProps) {
    if (Array.isArray(oldNode) && Array.isArray(newVNode)) {
        
        /* 
            CURRENT IMPLEMENTATION IS VERY BAD, DO NOT USE IN PRODUCTION
            
            - FULL ARRAY REPLACEMENT
            - HUGE ISSUE FOR PERFORMANCE
            - REMOUNTS ALL CHILDREN

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
        for (const child of newVNode as ReactElement[]) {
            this.mount({ vnode: child, parent: parent!, name });
        }

        return;
    }

    if (oldNode === null || typeof oldNode === "undefined") {
        if(!parent){
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        console.log("[ Old node is null ]", oldNode, newVNode);

        this.mount({ vnode: newVNode, parent: parent, mode: "append", name });
        return;
    }

    if (newVNode === null || typeof newVNode === "undefined") {
        console.log("[ New node is null ]", oldNode, newVNode);

        if(typeof oldNode === "object" && !Array.isArray(oldNode) && typeof oldNode.type === "function"){
            this.components.get(oldNode.componentName!)?.onUnmount();
            return ;
        }

        ref?.remove();
        return;
    }

    if (typeof oldNode === "boolean" || typeof newVNode === "boolean") {

        if(oldNode === newVNode) return ;

        console.log("[ Boolean difference ]", oldNode, newVNode, ref);
        
        if (newVNode === false) {
            if(typeof oldNode === "object" && !Array.isArray(oldNode) && typeof oldNode.type === "function"){
                this.components.get(oldNode.componentName!)?.onUnmount();
                return ;
            }
            if (oldNode) {
                console.warn("[ Old node is boolean ]", oldNode, newVNode);
                // this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
                ref?.remove();
            }
            return;
        }

        if(!parent){
            console.warn("Cannot Create new now: Parent is null");
            return;
        }

        const previousChild = parent.childNodes[index - 1] as HTMLElement || parent.lastChild
        console.log(index - 1);
        if(index -1 < 0){
            this.mount({ vnode: newVNode, parent: parent as HTMLElement, mode: "before", name });
        }else{
            this.mount({ vnode: newVNode, parent: previousChild, mode: "after", name });
        }
        return ;
    }

    if (
        (typeof oldNode === "string" || typeof oldNode === "number") &&
        (typeof newVNode === "string" || typeof newVNode === "number")
    ) {
        if (oldNode.toString() !== newVNode.toString()) {
            ref!.textContent = newVNode.toString();
        }
        return;
    }

    if (typeof oldNode != typeof newVNode) {
        this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
        return;
    }

    oldNode = oldNode as ReactElement;
    newVNode = newVNode as ReactElement;
    newVNode.componentName = oldNode.componentName;

    if (oldNode.type !== newVNode.type) {
        console.log("[ Element type difference ]", oldNode, newVNode);

        this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });
        return;
    }
    
    if(typeof newVNode.type === "function"){
        if(JSON.stringify(oldNode.props) == JSON.stringify(newVNode.props)) return ;
        
        // console.log("[ Function difference ]", oldNode, newVNode);
        // this.mount({ vnode: newVNode, parent: ref!, mode: "replace", name });

        const newComponent = newVNode.type(newVNode.props, ...newVNode.children);

        const componentName = typeof newComponent.type === "function" ? newComponent.type.name : "";
        this.components.set(componentName, newComponent as unknown as ReactComponentInstance);

        this.update({
            oldNode: oldNode,
            newVNode: newComponent,
            ref: ref,
            parent: ref?.parentElement!,
            index: 0,
            name: componentName,
        })
   
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
        let realIndex = 0;
        for (let i = 0; i < Math.max(oldNode.children.length, newVNode.children.length); i++) {

            const newChild = newVNode.children[i];
            const oldChild = oldNode.children[i];
            const childRef = oldChild?.ref || newChild?.ref || oldNode.ref!.childNodes[realIndex] as HTMLElement | null;
            
            if(newChild && oldChild) realIndex++;

            // console.log("========================")
            // console.log("newChild", newChild);
            // console.log("oldChild", oldChild);
            // console.log("childRef", childRef);
            // console.log("index", i,oldNode.ref!.childNodes);
            // console.log("realIndex", realIndex);

            this.update({
                oldNode: oldChild,
                newVNode: newChild,
                ref: childRef,
                parent: ref,
                index: realIndex,
                name,
            });
        }
    }

}
