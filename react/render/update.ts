// import { IReactSetProps, IReactUpdate, ReactElement } from "../types";
// import { ReactRender } from ".";


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
