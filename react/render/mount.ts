import { IReactMount, ReactComponentTree, ReactNode } from "react/types";
import { ReactRender } from ".";

ReactRender.prototype.mountArray = function ({
    instance,
    container,
}: IReactMount): void {
    if (Array.isArray(instance)) {
        instance.map((child) => this.mount({ instance: child, container }));
        return;
    }
};

ReactRender.prototype.mount = function ({
    component,
    instance,
    container,
    mode = "append",
}: IReactMount): void {
    if (!container) container = this.container; // default container body
    if (!instance) return;

    // handle array of components
    this.mountArray({ instance, container });

    let newRef: HTMLElement | Text;

    if (typeof instance === "string" || typeof instance === "number") {
        newRef = document.createTextNode(instance.toString());
        container.appendChild(newRef);
        return;
    }

    if (typeof instance === "boolean") return; // TODO: is correct?

    if (typeof instance.tag === "function") {
        console.log("Function component", instance.tag.name);

        const funcComponent: ReactComponentTree = {
            name: instance.tag.name,
            instance: null,
            parent: component || null,
            state: {
                hookIndex: 0,
                hookStates: [],
            },
            jsx: null,
        };

        this.components.set(instance.tag.name, funcComponent);

        funcComponent.instance = instance.tag({
            ...instance.props,
            children: instance.children,
            dom: instance.ref,
        });

        funcComponent.jsx = instance;

        this.components.set(instance.tag.name, funcComponent);

        this.mount({
            component: funcComponent,
            instance: funcComponent.instance,
            container,
        });

        return;
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
            this.mount({ component, instance: child, container: newRef });
        });
    }

    if (mode == "replace") container.replaceWith(newRef);
    else if (mode == "append") container.appendChild(newRef);
    instance.ref = newRef;
};

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
