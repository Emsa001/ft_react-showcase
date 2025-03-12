import { IReactMount, ReactNode } from "react/types";
import { ReactRender } from ".";

ReactRender.prototype.mountArray = function ({ component, container }: IReactMount): void {
    const instance = component.instance;

    if (Array.isArray(instance)) {
        instance.map((child) => this.mount({ component: child, container }));
        return;
    }
}


ReactRender.prototype.mount = function ({ component, container }: IReactMount): void {
    if(!container) container = this.container; // default container body

    const instance = component.instance;
    const name = component.name;

    if(!instance) return;

    // handle array of components
    this.mountArray({ component, container });

    let newRef: HTMLElement | Text;

    if (typeof instance === "string" || typeof instance === "number") {
        newRef = document.createTextNode(instance.toString());
        container.appendChild(newRef);
        return;
    }

    if(typeof instance === "boolean") return ; // TODO: is correct?

    if(typeof instance.tag === "function") {
        console.log("Function component", instance.tag.name);
        return ;
    }

    newRef = document.createElement(instance.tag as string);

    if (instance.props) {
        Object.keys(instance.props).forEach((prop) => {

            const key = prop;
            const value = instance.props[prop];

            this.setProps({ ref: newRef, key, value });
        });
    }

    if (instance.children && instance.children.length > 0) {
        instance.children.forEach((child) => {
            this.mount({ component: child, container: newRef as HTMLElement });
        });
    }

    container.replaceWith(newRef);

    console.log(instance, container);
}

// ReactRender.prototype.mount = function ({ el, container, mode = "append" }: IReactMount): void {

//     if (el === undefined || el === null) {
//         return;
//     }

//     if (Array.isArray(el)) {
//         el.map((child) => this.mount({ el: child, container }));
//         return;
//     }

//     let dom: HTMLElement | Text;
    
//     if (typeof el === "string" || typeof el === "number") {
//         dom = document.createTextNode(el.toString());
//         container.appendChild(dom);
//         return;
//     }
    
//     if(typeof el === "boolean") return ;

//     if (typeof el.tag === "function") {
//         let component = el.tag({ ...el.props, children: el.children, dom: el.dom });
//         const found = this.components.find((c) => c.name === (el.tag as any).name);

//         if(found) {
//             this.components = this.components.filter((c) => c.name !== (el.tag as any).name);
//         }
        
//         this.components.push({
//             name: el.tag.name,
//             component,
//             id: 0,
//         });

//         return this.mount({ el: component, container, mode });
//     }
    
//     dom = document.createElement(el.tag as string);

//     if (el.props) {
//         Object.keys(el.props).forEach((prop) => {
//             this.setProps({ dom, el, prop });
//         });
//     }

//     if (el.children && el.children.length > 0) {
//         el.children.forEach((child) => {
//             this.mount({ el: child, container: dom as HTMLElement });
//         });
//     }

//     if (mode == "replace") container.replaceWith(dom);
//     else if (mode == "append") container.appendChild(dom);
//     el.dom = dom;
// };
