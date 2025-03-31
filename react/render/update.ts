import { IReactUpdate, ReactComponentTree, ReactElement, ReactNode } from "react/types";
import { ReactRender } from ".";

let updatingComponent:ReactComponentTree | null = null;

ReactRender.prototype.updateLoop = function (
    previous: ReactElement,
    current: ReactElement,
    ref: HTMLElement,
    index: number
): void {
    if (!ref) return console.log("No reference");
    if(!updatingComponent) return console.log("No updating component");

    if (Array.isArray(current) && Array.isArray(previous)) {
        const parent = ref.parentElement;
        if (!parent) return console.error("Parent is required for arrays");

        const childNum = Math.max(previous.length, current.length);

        for (let i = 0; i < childNum; i++) {
            const element = current[i] as ReactNode;

            const key = element?.props?.key.toString() || i.toString();
            const previousKeyElement = updatingComponent.keys.get(key) || null;
            const prevRef = previousKeyElement && previousKeyElement?.ref as HTMLElement || ref;

            if(!previousKeyElement){
                updatingComponent.keys.set(key, element);
            }

            if(!element){
                updatingComponent.keys.delete(key);
            }

            console.log(element, previousKeyElement, prevRef, index);
            this.updateLoop(previousKeyElement, element, prevRef, index);
        }

        return;
    }

    if (Array.isArray(current) || Array.isArray(previous)) {
        console.log("Unexpected array");
        return;
    }

    if (previous === null || previous === undefined) {
        // if(parent)
        //     this.mount({ instance: current, container: parent, mode: "append" });
        // else
        this.mount({ instance: current, container: ref.parentElement!, mode: "append" });
        console.log("Previous is null", current, ref);
        return;
    }

    if (current === null || current === undefined) {
        console.log("Current is null", previous);
        (previous as ReactNode).ref?.remove();
        return;
    }

    if (typeof previous != typeof current) {
        console.log("Different type");
        return;
    }

    if (typeof previous === "string" || typeof previous === "number") {
        if (previous.toString() !== current.toString()) {
            if(!ref.childNodes[index]) return;
            ref.childNodes[index].textContent = current.toString();
        }

        return;
    }

    if (typeof previous === "boolean" || typeof current === "boolean") {
        console.log("Boolean");
        return;
    }

    current = current as ReactNode;
    previous = previous as ReactNode;

    current.ref = ref;

    // Prop update
    if (current.props != previous.props) {
        if (!current.props) return;

        Object.keys(current.props).forEach((prop) => {
            const key = prop;
            const value = current.props[prop];

            this.setProps({ ref: previous.ref! || ref, key, value });
        });
    }

    const children = Math.max(previous?.children?.length || 0, current?.children?.length || 0);

    for (let i = 0; i < children; i++) {
        const prevChild = previous?.children?.[i] ?? null;
        const newChild = current?.children?.[i] ?? null;
        const childRef = ref.children[i] ? (ref.children[i] as HTMLElement) : ref;

        // console.log("Prev Child: ", prevChild);
        // console.log("New Child: ", newChild);
        // console.log("Child Ref: ", childRef);

        this.updateLoop(prevChild, newChild, childRef, i);
    }
};

ReactRender.prototype.update = function ({ component }: IReactUpdate): void {
    let previous = component.instance;
    const jsx = component.jsx;

    if (!jsx) return;
    if (!previous) return;

    if (typeof jsx.tag != "function") return;

    const current = jsx.tag({
        ...jsx.props,
        children: jsx.children,
        dom: jsx.ref,
    });

    // console.log("Previous: ", previous);
    // console.log("Current: ", current);

    console.log(component);
    updatingComponent = component;
    this.updateLoop(previous, current, (previous as ReactNode).ref!);

    component.instance = current;
    this.addComponent(component.name, component);
};
