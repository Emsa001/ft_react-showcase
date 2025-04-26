import { IReactMount, ReactComponentTree, ReactElement, ReactNode } from "react/types";
import { ReactRender } from ".";

ReactRender.prototype.mountArray = function ({
    component,
    instance,
    container,
}: IReactMount): void {

    if (Array.isArray(instance)) {

        if (instance.length === 0) return;

        for(let i = 0; i < instance.length; i++){
            const child = instance[i];
            const key = instance[child]?.props?.key || i.toString();

            component?.keys.set(key, child);
            this.mount({ instance: child, container });
        }

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

    // handle array of components
    this.mountArray({ component, instance, container });

    let newRef: HTMLElement | Text;

    if (typeof instance === "boolean") return; // TODO: is correct?

    if (typeof instance === "string" || typeof instance === "number") {
        newRef = document.createTextNode(instance.toString());
        container.appendChild(newRef);
        return;
    }

    if(!instance) return;

    if (typeof instance.tag === "function") {
        // console.log("Function component", instance.tag.name);

        const funcComponent: ReactComponentTree = {
            name: instance.tag.name,
            instance: null,
            keys: new Map(),
            state: {
                hookIndex: 0,
                hookStates: [],
            },
            jsx: null,
        };

        this.addComponent(instance.tag.name, funcComponent);

        funcComponent.instance = instance.tag({
            ...instance.props,
            children: instance.children,
            dom: instance.ref,
        });

        const updatedComponent = this.getLastComponent();
        if(!updatedComponent) return;

        updatedComponent.jsx = instance;

        this.addComponent(instance.tag.name, funcComponent);

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
