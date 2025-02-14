import { IReactUpdate } from "../other/types";
import { flattenChildren } from "../other/utils";
import { ReactRender } from ".";

/*

    TODO: Reimplement the update method, there are some bugs while using developer mode and hot reload

*/

ReactRender.prototype.update = function ({
    newEl,
    previous,
    dom = null,
    childIndex = 0,
}: IReactUpdate): void {
    if(newEl === undefined || newEl === null){
        return;
    }
    
    if (!this.container) {
        console.error("Root container is undefined or null!");
        return;
    }
    
    if (Array.isArray(newEl) || Array.isArray(previous)) {
        const flatNewEl = flattenChildren(newEl);
        const flatPrevious = flattenChildren(previous);

        const bigger: number =
        flatNewEl.length > flatPrevious.length ? flatNewEl.length : flatPrevious.length;
        let domEl = flatPrevious[0]?.dom?.parentElement || dom;
        
        for (let i = 0; i < bigger; i++) {
            this.update({ newEl: flatNewEl[i], previous: flatPrevious[i], dom: domEl });
        }
        return;
    }
    
    if (!newEl && typeof previous != "string" && typeof previous != "number") {
        previous?.dom?.remove();
        return;
    }
    
    if (!previous && typeof newEl != "string" && typeof newEl != "number") {
        if (!dom) return;
        this.mount({ el: newEl, container: dom, mode: "append" });
        return;
    }
    
    // Temporarily fix
    if (typeof newEl != typeof previous) {
        console.error("Type mismatch");
        location.reload(); // << TODO: VERY BAD FIX
        return;
    }
    
    if (typeof newEl === "string" || typeof newEl === "number") {

        if (!dom) return;
        if (JSON.stringify(newEl) != JSON.stringify(previous)) {
            dom.childNodes[childIndex].nodeValue = newEl;
        }
        return;
    }
    
    if (typeof newEl.tag === "function") {
        const name = newEl.tag.name;
        const current = newEl.tag({ ...newEl.props, children: newEl.children, dom: null });
        const component = this.components.find((component) => component.name === name);
        
        if (!component) {
            return console.error("Component not found");
        }
        
        this.update({ newEl: current, previous: component.component });
        return;
    }
    
    if(typeof previous === "string" || typeof previous === "number") {
        return console.error("Previous is not an object");
    }
    
    // Temporarily fix
    if (newEl.children.length !== previous.children.length) {
        location.reload(); // << TODO: VERY BAD FIX
        return ;
    }
    
    
    if (newEl.props != null) {
        Object.keys(newEl.props).forEach((prop) => {
            if (!previous.dom) return;
            this.setProps({ dom: previous.dom, el: newEl, prop });
        });
    }

    if(previous.children.length > newEl.children.length){
        console.log(newEl,previous)
        return ;
    }

    if (newEl.children.length > 0) {
        for (let i = 0; i < newEl.children.length; i++) {
            const newChild = newEl.children[i];
            let previousChild = previous.children[i];

            if(previousChild === undefined){
                this.mount({ el: newChild, container: previous.dom || dom || this.container, mode: "append" });
                previousChild = newChild;
                continue;
            }

            this.update({
                newEl: newChild,
                previous: previousChild,
                dom: previous.dom,
                childIndex: i,
            });
        }
    }
    
    newEl.dom = previous.dom;
};
