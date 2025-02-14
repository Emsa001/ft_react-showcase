import { IReactUpdate, ReactElement } from "../other/types";
import { flattenChildren } from "../other/utils";
import { ReactRender } from ".";

ReactRender.prototype.update = function ({
    newEl,
    previous,
    dom = null,
    childIndex = 0,
}: IReactUpdate): void {
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

    if (typeof newEl != typeof previous) {
        console.error("Type mismatch");
        return;
    }

    if (typeof newEl === "string" || typeof newEl === "number") {
        if (!dom) return;
        if (JSON.stringify(newEl) != JSON.stringify(previous)) {
            dom.childNodes[childIndex].nodeValue = newEl;
        }
        return;
    }

    if(typeof previous === "string" || typeof previous === "number") {
        return console.error("Previous is not an object");
    }

    if (typeof newEl.tag === "function") {
        const name = newEl.tag.name;
        const current = newEl.tag({ ...newEl.props, children: newEl.children, dom: null });
        const component = this.components.find((component) => component.name === name);

        if (!component) return console.error("Component not found");

        this.update({ newEl: current, previous: component.component });
        return;
    }
    
    // Temporarily fix
    // TODO: Implement a better way to handle this
    if (newEl.children.length !== previous.children.length) {
        this.mount({ el: newEl, container: previous.dom || this.container, mode: "replace" });
        return;
    }
    
    
    if (newEl.props != null) {
        Object.keys(newEl.props).forEach((prop) => {
            if (!previous.dom) return;
            this.setProps({ dom: previous.dom, el: newEl, prop });
        });
    }

    if (newEl.children.length > 0) {
        for (let i = 0; i < newEl.children.length; i++) {
            const newChild = newEl.children[i];
            const previousChild = previous.children[i];
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
