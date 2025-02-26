import { ReactRender } from ".";
import { clearArray, flattenChildren } from "../other/utils";
import { IReactMount } from "react/other/types";

ReactRender.prototype.mount = function ({ el, container, mode = "append" }: IReactMount): void {

    if (el === undefined || el === null) {
        return;
    }

    if (Array.isArray(el)) {
        el.map((child) => this.mount({ el: child, container }));
        return;
    }

    let dom: HTMLElement | Text;
    
    if (typeof el === "string" || typeof el === "number") {
        dom = document.createTextNode(el.toString());
        container.appendChild(dom);
        return;
    }
    
    if(typeof el === "boolean") return ;

    if (typeof el.tag === "function") {
        let component = el.tag({ ...el.props, children: el.children, dom: el.dom });
        const found = this.components.find((c) => c.name === (el.tag as any).name);

        if(found) {
            this.components = this.components.filter((c) => c.name !== (el.tag as any).name);
        }
        
        this.components.push({
            name: el.tag.name,
            component,
            id: 0,
        });

        return this.mount({ el: component, container, mode });
    }
    
    dom = document.createElement(el.tag as string);

    if (el.props) {
        Object.keys(el.props).forEach((prop) => {
            this.setProps({ dom, el, prop });
        });
    }

    if (el.children && el.children.length > 0) {
        el.children.forEach((child) => {
            this.mount({ el: child, container: dom as HTMLElement });
        });
    }

    if (mode == "replace") container.replaceWith(dom);
    else if (mode == "append") container.appendChild(dom);
    el.dom = dom;
};
