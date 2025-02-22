import { IReactUpdate, ReactElement } from "../other/types";
import { flattenChildren } from "../other/utils";
import { ReactRender } from ".";

/*

    TODO: Reimplement the update method, there are some bugs while using developer mode and hot reload

*/

const isPrintable = (el: any) =>
    typeof el === "string" || typeof el === "number";

ReactRender.prototype.update = function ({
    newEl,
    previous,
    parent,
    dom = null,
    childIndex = 0,
    component,
}: IReactUpdate): void {
    if (!this.container) {
        console.error("Root container is undefined or null!");
        return;
    }

    if (typeof newEl === "string" || typeof newEl === "number") {
        if (!isPrintable(previous)) return ;
        if (newEl === previous) return ;

        if(!dom){
            console.error("Parent element is undefined or null!");
            return;
        }

        if(childIndex >= dom.childNodes.length){
            console.error("Child index is greater than the number of children");
            return;
        }

        dom.childNodes[childIndex].textContent = String(newEl);

        return;
    }

    if (Array.isArray(newEl) || Array.isArray(previous)) {
        const flatNewEl = flattenChildren(newEl);
        const flatPrevious = flattenChildren(previous);

        const bigger =
            flatNewEl.length > flatPrevious.length
                ? flatNewEl.length
                : flatPrevious.length;
        const domEl = flatPrevious[0]?.dom?.parentElement || dom;
        
        for (let i = 0; i < bigger; i++) {
            this.update({
                newEl: flatNewEl[i],
                previous: flatPrevious[i],
                dom: domEl,
                parent,
                component: component?.component.children[i],
            });
        }
        return;
    }

    if(!newEl){
        console.error("New element is undefined or null!");
        return ;
    }

    if (!previous) {
        if (!dom) {
            console.error("Previous element is undefined or null!");
            return;
        }

        if(!parent){
            console.error("Parent element is undefined or null!");
            return;
        }

        // console.log(previous, parent);

        this.mount({ el: newEl, container: dom });
        // console.log(previous, parent);

        return ;
    }

    if (typeof previous != typeof newEl) {
        console.log("Element type mismatch!", newEl, previous);
        return;
    }

    
    
    // at this point we are sure that newEl is a ReactElement
    newEl = newEl as ReactElement;
    previous = previous as ReactElement;
    
    // Handle Components
    if (typeof newEl.tag === "function") {
        const name = newEl.tag.name;

        const current = newEl.tag({
            ...newEl.props,
        });

        const comp = this.components.find(
            (component) => component.name === name
        );

        if (!comp) {
            return console.error("Component not found");
        }

        // console.log("current", current);
        // console.log("previous", comp.component);
        this.update({ newEl: current, previous: comp.component, parent, component: comp });
        return;
    }

    // Update all props of the element
    if (newEl.props != null) {
        Object.keys(newEl.props).forEach((prop) => {
            if (!previous.dom) return;
            this.setProps({ dom: previous.dom, el: newEl, prop });
        });
    }

    // Update the children of the element
    if (newEl.children.length > 0) {
        const domEl = previous.dom || dom;
        for (let i = 0; i < newEl.children.length; i++) {
            this.update({
                newEl: newEl.children[i],
                previous: previous.children[i],
                parent: newEl,
                dom: domEl,
                childIndex: i,
                component,
            });
        }
    }

    // Save new dom
    newEl.dom = previous.dom;
    if(component){
        console.log(" ");
        console.log("newEl", newEl);
        console.log("previous", previous);
        console.log("component", component);
        console.log("parent", parent);
        console.log("childIndex", childIndex);
        console.log(" ");
    }
};
