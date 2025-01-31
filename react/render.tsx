import { resetHooks } from "./hooks";
import { debounce } from "./utils";
import { ReactElement } from "./types";
import routes from "../src/routes";

const setProps = (domEl: HTMLElement, el: any, prop: string) => {
    switch (prop) {
        case "ref":
            el.props[prop].current = domEl;
            break;
        case "className":
            domEl.className = el.props[prop];
            break;
        default:
            if (prop.startsWith("on") && typeof el.props[prop] === "function") {
                domEl.addEventListener(prop.substring(2).toLowerCase(), el.props[prop]);
            } else {
                (domEl as any)[prop.toLowerCase()] = el.props[prop];
            }
    }
};

// Recursive render function
export const render = (el: ReactElement | string, container: HTMLElement): void => {
    
    if (Array.isArray(el)) {
        el.forEach(child => render(child, container));
        return;
    }

    let domEl: HTMLElement | Text;
    
    if (typeof el === "string" || typeof el === "number") {
        domEl = document.createTextNode(el.toString());
        container.appendChild(domEl);
        return;
    }
    
    if (typeof el.tag === "function") {
        // Function component, pass the children to the component
        const children = el.children;
        const component = el.tag({ ...el.props, children }, ...children);
        render(component, container);
        return;
    }

    domEl = document.createElement(el.tag as string);

    // Set properties on the element
    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach((prop) => {
            setProps(domEl, el, prop);
        });
    }

    // Render children if any
    if (el.children && el.children.length > 0) {
        el.children.forEach((child: ReactElement | string) => {
            render(child, domEl as HTMLElement);
        });
    }

    container.appendChild(domEl);
};

const container = document.getElementById("root") as HTMLElement;

const reRender = debounce(async () => {
    console.log('reRender-ing :)');
    resetHooks();
    
    container.innerHTML = "";
    
    const page = routes.find((route) => route.path === window.location.pathname) || routes.find((route) => route.path === "404");
    render((await page.module()).default(), container);
}, 1);

reRender();

export { reRender };
