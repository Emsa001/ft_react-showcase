import { IReactUpdate, ReactElement } from "react/types";
import { ReactRender } from ".";
import { ReactNode } from "react";

ReactRender.prototype.updateLoop = function (
    previous: ReactElement | ReactElement[],
    current: ReactElement | ReactElement[],
    ref: HTMLElement | null
): void {
    if (previous === null || previous === undefined) {
        console.log("Previous is null");
        return;
    }

    if (current === null || current === undefined) {
        console.log("Current is null");
        return;
    }

    if(!ref) return console.log("No reference");

    if(Array.isArray(current) && Array.isArray(previous)){

        for(let i = 0; i < current.length; i++){

            console.log("Previous: ", previous[i]);
            console.log("Current: ", current[i]);

            this.updateLoop(previous[i], current[i], ref?.children[i] as HTMLElement);
        }

        return;
    }

    if (typeof previous != typeof current) {
        console.log("Different type");
        return;
    }

    if (typeof previous === "string" || typeof previous === "number") {
        if (previous.toString() !== current.toString()) {
            ref.textContent = current.toString();
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

            this.setProps({ ref: previous.ref!, key, value });
        });
    }

    const children = Math.max(
        previous?.children?.length || 0,
        current?.children?.length || 0
    );

    for (let i = 0; i < children; i++) {
        const prevChild = previous?.children?.[i] ?? null;
        const newChild = current?.children?.[i] ?? null;
        const childRef = ref.children[i]
            ? (ref.children[i] as HTMLElement)
            : ref;

        // console.log("Prev Child: ", prevChild);
        // console.log("New Child: ", newChild);
        // console.log("Child Ref: ", childRef);

        this.updateLoop(prevChild, newChild, childRef);
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

    this.updateLoop(previous, current, (previous as ReactNode).ref!);

    component.instance = current;
};

// ReactRender.prototype.update = function ({
//     prevElement,
//     newReactElement,
//     prevReactElement,
//     childIndex = 0,
//     component,
//     keys = {}
// }: IReactUpdate): void {
//     console.log("\n");
//     // console.log("Prev Child: ", prevElement);
//     // console.log("New React Element: ", newReactElement);
//     // console.log("Prev React Element: ", prevReactElement);
//     // console.log("\n");

//     if (Array.isArray(newReactElement) || Array.isArray(prevReactElement)) {
//         // Ensure that both arrays are in fact arrays
//         newReactElement = newReactElement as ReactElement[];
//         prevReactElement = prevReactElement as ReactElement[];

//         // Create a map of the keys in the new array
//         const keys = newReactElement.reduce((acc: { [key: string]: ReactElement}, e) => {
//             if (e.props.key != null) {
//                 acc[e.props.key] = e;
//             }
//             return acc;
//         }, {});

//         // const parent = prevElement?.parentElement;
//         const parent = prevElement?.parentElement;
//         if(!parent) return;

//         for(let i = 0; i < newReactElement.length; i++){
//             console.log("new", newReactElement[i]);
//             console.log("prev", prevReactElement[i]);
//             console.log("parent", parent);
//             // this.update({
//             //     newReactElement: newReactElement[i],
//             //     prevElement: prevElement?.children?.[i] as HTMLElement,
//             //     prevReactElement: prevReactElement[i],
//             //     childIndex: i,
//             //     keys
//             // });
//         }

//         return;
//     }

//     // remove element
//     if (newReactElement === undefined) {
//         console.log("Removing element: ", prevReactElement);
//         prevElement!.remove();
//         return;
//     }

//     // create element
//     if (prevReactElement === undefined) {

//         console.log("Creating new element: ", newReactElement);
//         this.mount({
//             el: newReactElement,
//             container: prevElement!,
//             mode: "append",
//         });
//         return;
//     }

//     // Prop update
//     if (newReactElement.props != prevReactElement.props) {
//         if (!newReactElement.props || !prevElement) return;

//         console.log("Updating props: ", newReactElement.props);
//         Object.keys(newReactElement.props).forEach((prop) => {
//             this.setProps({
//                 dom: prevElement as HTMLElement,
//                 el: newReactElement,
//                 prop,
//             });
//             prevReactElement.props = newReactElement.props;
//         });
//     }

//     if (typeof newReactElement === "boolean") {
//         if (newReactElement === false) {
//             prevElement!.innerHTML = ""; // TODO: Doesn't actually remove element, just hides it
//             return;
//         }

//         return;
//     }

//     // printable element
//     if (
//         typeof newReactElement === "string" ||
//         typeof newReactElement === "number"
//     ) {
//         if (newReactElement === 0) {
//             console.log("removing element: ", prevElement, prevReactElement);
//             prevElement!.innerHTML = ""; // TODO: Doesn't actually remove element, just hides it
//             return;
//         }
//         if (newReactElement != prevReactElement) {
//             if (!prevElement) return;

//             prevElement.textContent = newReactElement;
//         }
//         return;
//     }

//     if (
//         typeof newReactElement.tag === "function" &&
//         typeof prevReactElement.tag === "function"
//     ) {

//         const prev = this.components.find(
//             (c) =>
//                 c.name === ((newReactElement as ReactElement).tag as any).name
//         );

//         const newR = newReactElement.tag({
//             ...newReactElement.props,
//         });

//         const dom = document.createElement("div");
//         this.mount({ el: newR, container: dom, mode: "replace" });

//         if(!prev) return ;

//         this.update({
//             newReactElement: newR,
//             prevElement: prevElement as HTMLElement,
//             prevReactElement: prev.component,
//             component: newR,
//         });

//         return;
//     }

//     // different tag
//     if (
//         newReactElement.tag !== prevReactElement.tag ||
//         typeof newReactElement != typeof prevReactElement
//     ) {
//         console.log(
//             "Different tag: ",
//             prevElement,
//             childIndex,
//             newReactElement,
//             prevReactElement
//         );
//         if (!prevElement) return console.log("No previous element");

//         this.mount({
//             el: newReactElement,
//             container: prevElement as HTMLElement,
//             mode: "replace",
//         });
//         return;
//     }

//     const max = Math.max(
//         newReactElement.children.length,
//         prevReactElement.children.length
//     );

//     for (let i = 0; i < max; i++) {
//         const newReactChild = newReactElement.children?.[i];
//         let prevReactChild = prevReactElement.children?.[i];
//         let prevElementChild = prevElement?.children?.[i] || prevElement;
//         let newComponent = Array.isArray(component) ? component : component?.children[i] || null

//         this.update({
//             newReactElement: newReactChild,
//             prevElement: prevElementChild as HTMLElement,
//             prevReactElement: prevReactChild,
//             childIndex: i,
//             component: newComponent,
//         });
//     }

//     if(prevReactElement.dom)
//         newReactElement.dom = prevReactElement.dom;
// };
