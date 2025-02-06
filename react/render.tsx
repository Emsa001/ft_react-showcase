import routes from "../src/routes";
import { resetHooks } from "./hooks";
import { ReactElement } from "./types";
import { clearArray, debounce, flattenChildren } from "./utils";

let previous: ReactElement;
const components: { name: string; component: ReactElement }[] = [];

/*

THIS IS DEFINITELY NOT THE FINAL VERSION OF THE RENDER FUNCTIONALITY
THIS WILL BE REFACTORED AND IMPROVED IN THE FUTURE

*/

// Mount function (first-time rendering)
const mount = (el: ReactElement | string, container: HTMLElement, mode: string = "append"): void => {
    if (Array.isArray(el)) {
        el.forEach((child) => mount(child, container));
        return;
    }

    let domEl: HTMLElement | Text;

    if (typeof el === "string" || typeof el === "number") {
        domEl = document.createTextNode(el.toString());
        container.appendChild(domEl);
        return;
    }

    if (typeof el.tag === "function") {
        const component = el.tag({ ...el.props, children: el.children, dom: el.dom });

        components.push({
            name: el.tag.name,
            component,
        });

        mount(component, container);
        return;
    }

    domEl = document.createElement(el.tag as string);

    if (el.props) {
        Object.keys(el.props).forEach((prop) => {
            setProps(domEl, el, prop);
        });
    }

    if (el.children && el.children.length > 0) {
        flattenChildren(el.children).forEach((child) => {
            mount(child, domEl as HTMLElement);
        });
    }

    if (mode == "replace") container.replaceWith(domEl);
    else if (mode == "append") container.appendChild(domEl);
    el.dom = domEl;
};

// Update function
const update = (
    newEl: ReactElement | ReactElement[] | string,
    previous: ReactElement | ReactElement[] | string,
    dom: HTMLElement | null = container,
    childIndex: number = 0
): void => {
    if (!container) {
        console.error("Root container is undefined or null!");
        return;
    }

    if (Array.isArray(newEl) || Array.isArray(previous)) {
        const flatNewEl = flattenChildren(newEl);
        const flatPrevious = flattenChildren(previous);

        for (let i = 0; i < flatNewEl.length; i++) update(flatNewEl[i], flatPrevious[i]);

        return;
    }

    if (typeof newEl != typeof previous) {
        console.error("Type mismatch");
        return;
    }

    if (typeof newEl === "string" || typeof newEl === "number") {
        if (JSON.stringify(newEl) != JSON.stringify(previous)) {
            if (!dom || !dom.childNodes[childIndex]) return; // TODO: remount the element;
            dom.childNodes[childIndex].nodeValue = newEl;
        }
        return;
    }

    previous = previous as ReactElement;

    if (typeof newEl.tag === "function") {
        const name = newEl.tag.name;
        const current = newEl.tag({ ...newEl.props, children: newEl.children, dom: null });
        const component = components.find((component) => component.name === name);

        if (!component) return console.error("Component not found");

        update(current, component.component);
        return;
    }

    if (newEl.children.length !== previous.children.length) {
        console.log("Children length mismatch");
        return;
    }

    if (newEl.props != null) {
        Object.keys(newEl.props).forEach((prop) => {
            if (!previous.dom) return;
            setProps(previous.dom, newEl, prop);
        });
    }

    if (newEl.children.length > 0) {
        for (let i = 0; i < newEl.children.length; i++) {
            const newChild = newEl.children[i];
            const previousChild = previous.children[i];
            update(newChild, previousChild, previous.dom, i);
        }
    }

    newEl.dom = previous.dom;
};

const setProps = (domEl: HTMLElement, el: any, prop: string) => {
    switch (prop) {
        case "style":
            Object.keys(el.props[prop]).forEach((style) => {
                (domEl.style as any)[style] = el.props[prop][style];
            });
            break;
        case "ref":
            el.props[prop].current = domEl;
            break;
        case "className":
            domEl.className = el.props[prop];
            break;
        case "onChange":
            domEl.addEventListener("input", el.props[prop]);
            break;
        default:
            (domEl as any)[prop.toLowerCase()] = el.props[prop];
    }
};

// Render mounts and updates
export const render = (el: ReactElement, container: HTMLElement): void => {
    if (Array.isArray(el)) {
        el.forEach((child) => render(child, container));
        return;
    }

    if (!previous) {
        clearArray(components);
        console.log("Mounting...", el);
        mount(el, container);
    } else {
        console.log("Updating...");
        update(el, previous);
    }

    previous = el;
};

const container = document.getElementById("root") as HTMLElement;

export const reRender = debounce(async () => {
    resetHooks();

    const page = routes.find((route) => route.path === window.location.pathname) || routes.find((route) => route.path === "404");

    if (!page) return console.error("Page not found");

    const newVDOM = (await page.module()).default() as unknown as ReactElement;
    render(newVDOM, container);
}, 0);

reRender();

export const isMounted = () => previous !== null;
