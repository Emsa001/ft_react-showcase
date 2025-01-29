import { ReactElement } from "./types";
import React, { resetHooks } from "./index";
import App from "../src/app";

export const render = (el: ReactElement | string, container: HTMLElement): void => {
    let domEl: HTMLElement | Text;

    if (typeof el === "string" || typeof el === "number") {
        domEl = document.createTextNode(el);
        container.appendChild(domEl);
        return;
    }

    // 1. First create the document node corresponding el
    domEl = document.createElement(el.tag as string);
    // 2. Set the props on domEl
    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach((prop) => {
            (domEl as any)[prop.toLowerCase()] = el.props[prop];
        });
    }
    // 3. Handle creating the Children.
    if (el.children && el.children.length > 0) {
        // When child is rendered, the container will be
        // the domEl we created here.
        el.children.forEach((node: ReactElement | string) => render(node, domEl as HTMLElement));
    }
    // 4. append the DOM node to the container.
    container.appendChild(domEl);
}

const container = document.getElementById("root") as HTMLElement;


const reRender = () => {
    console.log('reRender-ing :)');
    
    resetHooks();
    
    container.innerHTML = "";
    render(<App />, container);
};


reRender();

export { reRender };