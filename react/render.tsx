import routes from "../src/routes";
import { resetHooks } from "./hooks";
import { ReactElement } from "./types";
import { clearArray, debounce, flattenChildren } from "./utils";

let previousEl: ReactElement;
const components: { name: string; component: ReactElement }[] = [];

/*

THIS IS DEFINITELY NOT THE FINAL VERSION OF THE RENDER FUNCTIONALITY
THIS WILL BE REFACTORED AND IMPROVED IN THE FUTURE

*/

// Mount function (first-time rendering)

interface IMount {
    el: ReactElement | ReactElement[] | string;
    container: HTMLElement;
    mode?: string;
}

const mount = ({ el, container, mode = "append" }: IMount & { mode?: "replace" | "append" }): void => {
    if (Array.isArray(el)) {
        el.forEach((child) => mount({ el: child, container }));
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

        mount({ el: component, container });
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
            mount({ el: child, container: domEl as HTMLElement });
        });
    }

    if (mode == "replace") container.replaceWith(domEl);
    else if (mode == "append") container.appendChild(domEl);
    el.dom = domEl;
};

// Update function

interface IUpdate {
    newEl: ReactElement | ReactElement[] | string;
    previous: ReactElement | ReactElement[] | string;
    dom?: HTMLElement | null;
    childIndex?: number;
}

const update = ({ newEl, previous, dom = null, childIndex = 0 }: IUpdate): void => {
    if (!container) {
        console.error("Root container is undefined or null!");
        return;
    }

    if (Array.isArray(newEl) || Array.isArray(previous)) {
        const flatNewEl = flattenChildren(newEl);
        const flatPrevious = flattenChildren(previous);

        const bigger: number = flatNewEl.length > flatPrevious.length ? flatNewEl.length : flatPrevious.length;
        let domEl = flatPrevious[0]?.dom?.parentElement || dom;

        for (let i = 0; i < bigger; i++){
            update({ newEl: flatNewEl[i], previous: flatPrevious[i], dom: domEl });
        }
        return;
    }

    if (!newEl && (typeof previous != "string" && typeof previous != "number")) {
        previous?.dom?.remove();
        return;
    }

    if (!previous && (typeof newEl != "string" && typeof newEl != "number")) {
        if (!dom) return;
        mount({ el: newEl, container: dom, mode: "append" });
        return;
    }

    if (typeof newEl != typeof previous) {
        console.error("Type mismatch");
        return;
    }

    if (typeof newEl === "string" || typeof newEl === "number") {
        if (!dom) return;
        if (JSON.stringify(newEl) != JSON.stringify(previous)) {
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

        update({ newEl: current, previous: component.component });
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
            update({ newEl: newChild, previous: previousChild, dom: previous.dom, childIndex: i });
        }
    }

    newEl.dom = previous.dom;
};

const setProps = (domEl: HTMLElement, el: any, prop: string) => {
    if (prop === "children") return; // Ignore children since they are handled separately

    if (prop === "style" && typeof el.props[prop] === "object") {
        Object.assign(domEl.style, el.props[prop]);
        return;
    }

    if (prop === "ref") {
        el.props[prop].current = domEl;
        return;
    }

    if (prop === "onChange" && domEl instanceof HTMLInputElement) {
        domEl.removeEventListener("input", (domEl as any)._onChangeListener);
        domEl.addEventListener("input", el.props[prop]);
        (domEl as any)._onChangeListener = el.props[prop];
        return;
    }

    if (prop.startsWith("on") && typeof el.props[prop] === "function") {
        const eventName = prop.slice(2).toLowerCase();
        domEl.removeEventListener(eventName, (domEl as any)[prop]);
        domEl.addEventListener(eventName, el.props[prop]);
        (domEl as any)[prop]
    }

    (domEl as any)[prop] = el.props[prop];
}

// Render mounts and updates
export const render = (el: ReactElement, container: HTMLElement): void => {
    if (Array.isArray(el)) {
        el.forEach((child) => render(child, container));
        return;
    }

    if (!previousEl) {
        clearArray(components);
        console.log("Mounting...");
        mount({ el, container });
    } else {
        console.log("Updating...");
        update({ newEl: el, previous: previousEl });
    }

    previousEl = el;
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

export const isMounted = () => previousEl !== null;
