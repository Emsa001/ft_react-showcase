import { IReactSetProps, IReactUpdate, ReactElement } from "../other/types";
import { ReactRender } from ".";
import React from "react";

/*

    TODO: Reimplement the update method, there are some bugs while using developer mode and hot reload

*/

ReactRender.prototype.update = function ({
    newElement,
    prevElement,
    newReactElement,
    prevReactElement,
    childIndex = 0,
}: IReactUpdate): void {
    console.log("\n");
    // console.log("New Child: ", newElement);
    // console.log("Prev Child: ", prevElement);
    // console.log("New React Element: ", newReactElement);
    // console.log("Prev React Element: ", prevReactElement);
    // console.log("\n");

    if(Array.isArray(newReactElement) || Array.isArray(prevReactElement)){
        console.log(newReactElement, prevReactElement);
        return ;
    }

    // remove element
    if(newReactElement === undefined){
        console.log("Removing element: ", prevReactElement);
        prevReactElement.dom?.remove();
        return ;
    }

    // create element
    if(prevReactElement === undefined){
        if(!newElement) return;

        console.log("Creating new element: ", newReactElement);
        this.mount({ el: newReactElement, container: prevElement!, mode: "append" });
        return ;
    }

    // Prop update
    if (newReactElement.props != prevReactElement.props) {
        if(!newReactElement.props) return;
        Object.keys(newReactElement.props).forEach((prop) => {
            this.setProps({
                dom: prevElement as HTMLElement,
                el: newReactElement,
                prop,
            });
            prevReactElement.props = newReactElement.props;
        });
    }

    if(typeof newReactElement === "boolean"){
        if(newReactElement === false) {
            console.log("removing element: ", prevElement, prevReactElement);
            prevElement!.innerHTML = ""; // TODO: Doesn't actually remove element, just hides it
            return ;
        }

        return ;
    }

    // printable element
    if(typeof newReactElement === "string" || typeof newReactElement === "number"){
        if(newReactElement === 0) {
            console.log("removing element: ", prevElement, prevReactElement);
            prevElement!.innerHTML = ""; // TODO: Doesn't actually remove element, just hides it
            return ;
        }
        if(newReactElement != prevReactElement){
            if(!prevElement) return ;

            prevElement.textContent = newReactElement;
        }
        return ;
    }

    if(typeof newReactElement.tag === "function" && typeof prevReactElement.tag === "function"){
        const prev = prevReactElement.tag({
            ...prevReactElement.props,
        });
        
        const newE = this.components.find((c) => c.name === ((newReactElement as ReactElement).tag as any).name);
        
        // console.log("Function tag: ", newReactElement, prevReactElement);
        // console.log("Prev: ", prev);
        // console.log("New: ", newE);
        // console.log("prev Element", prevElement);
        // console.log("new Element", newElement);

        if(newE){
            this.update({
                newElement: newElement as HTMLElement,
                newReactElement: newE.component,
                prevElement: prevElement as HTMLElement,
                prevReactElement: prev,
            });
        }

        return ;
    }

    // different tag
    if(newReactElement.tag !== prevReactElement.tag || typeof newReactElement != typeof prevReactElement){
        console.log("Different tag: ", prevElement, childIndex, newReactElement, prevReactElement);
        if(!prevElement) return console.log("No previous element");

        this.mount({ el: newReactElement, container: prevElement as HTMLElement, mode: "replace" });
        return ;
    }
    
    const max = Math.max(newReactElement.children.length, prevReactElement.children.length);
    
    for(let i = 0; i < max; i++){
        const newReactChild = newReactElement.children?.[i];
        const newElementChild = newElement?.children?.[i] || newElement;
        let prevReactChild = prevReactElement.children?.[i];
        let prevElementChild = prevElement?.children?.[i] || prevElement;

        this.update({
            newElement: newElementChild as HTMLElement,
            newReactElement: newReactChild,
            prevElement: prevElementChild as HTMLElement,
            prevReactElement: prevReactChild,
            childIndex: i,
        })
    }

    if(newReactElement != null)
        newReactElement.dom = prevReactElement.dom;
};
