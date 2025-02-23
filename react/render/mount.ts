import { ReactRender } from ".";
import { flattenChildren } from "../other/utils";
import { IReactMount } from "react/other/types";

ReactRender.prototype.mount = function ({ el, container, mode = "append" }: IReactMount): void {
    if (el === undefined || el === null) {
        return;
    }
    
    if (Array.isArray(el)) {
        el.forEach((child) => this.mount({ el: child, container }));
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
        const component = el.tag({ ...el.props, children: el.children, dom: el.dom });

        if(this.components.find((c) => c.name === (el.tag as any).name)) {
            this.components = this.components.filter((c) => c.name !== (el.tag as any).name);
        }
        
        this.components.push({
            name: el.tag.name,
            component,
        });
        
        return this.mount({ el: component, container });
    }
    
    dom = document.createElement(el.tag as string);

    if (el.props) {
        Object.keys(el.props).forEach((prop) => {
            this.setProps({ dom, el, prop });
        });
    }

    if (el.children && el.children.length > 0) {
        flattenChildren(el.children).forEach((child) => {
            this.mount({ el: child, container: dom as HTMLElement });
        });
    }

    if (mode == "replace") container.replaceWith(dom);
    else if (mode == "append") container.appendChild(dom);
    el.dom = dom;
};
