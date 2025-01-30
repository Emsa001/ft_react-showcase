import React from "./index";

import { resetHooks } from "./hooks"
import { debounce } from "./utils";

import { ReactElement } from "./types";
import routes from "../src/routes";

const setProps = (domEl: HTMLElement, el: any, prop: string) => {
    
    switch(prop){
        case "ref":
            el.props[prop].current = domEl;
            break;
        default:
            (domEl as any)[prop.toLowerCase()] = el.props[prop];
    }

}

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
            setProps(domEl, el, prop);
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


const reRender = debounce(async () => {
    console.log('reRender-ing :)');
    resetHooks();
    
    container.innerHTML = "";
    

    const page = routes.find((route) => route.path === window.location.pathname);
    render((await page.module()).default(), container);
}, 1);

reRender();


export { reRender };