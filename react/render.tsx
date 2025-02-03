import routes from "../src/routes";
import { resetHooks } from "./hooks";
import { ReactElement } from "./types";
import { clearArray, debounce } from "./utils";

let previous: ReactElement = null;
const components = []

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

    if (mode == "replace")
        container.replaceWith(domEl);
    else if(mode == "append")
        container.appendChild(domEl);
    el.dom = domEl;
};

// Update function
const update = (
    newEl: ReactElement | ReactElement[] | string,
    previous: ReactElement | ReactElement[] | string,
): void => {
    if (!container) {
        console.error("Container is undefined or null!");
        return;
    }

    if (Array.isArray(newEl) || Array.isArray(previous)) {
        const flatNewEl = flattenChildren(newEl);
        const flatPrevious = flattenChildren(previous);

        for(let i = 0; i < flatNewEl.length; i++){
            update(flatNewEl[i], flatPrevious[i]);
        }
        
        return;
    }

    if (typeof newEl === "string" || typeof newEl === "number") {
        container.textContent = newEl;
        return;
    }
    
    if (typeof previous === "string" || typeof previous === "number") {
        mount(newEl, container, "replace");
        return;
    }

    
    if (typeof newEl.tag === "function") {
        const name = newEl.tag.name;
        const current = newEl.tag({ ...newEl.props, children: newEl.children, dom: null });
        const component = components.find((component) => component.name === name);
        
        update(current, component.component);
        return;
    }
    
    if (newEl.children.length !== previous.children.length) {
        console.log("Children length mismatch");
        return;
    }


    const updateDom = (newEl: ReactElement, previous: ReactElement, dom: HTMLElement = null, children: number = 0) => {
        
        if(typeof newEl === "string" || typeof newEl === "number") {
            if(JSON.stringify(newEl) != JSON.stringify(previous))
                dom.childNodes[children].nodeValue = newEl;
            return;
        }

        if(typeof newEl.tag === "function"){
            if (typeof previous.tag !== "function") {
                console.log("Previous tag is not a function");
                return;
            }

            const name = newEl.tag.name;
            const component = components.find((component) => component.name === name);
            const current = newEl.tag({ ...newEl.props, children: newEl.children, dom: null });
            
            updateDom(current, component.component);
            return ;
        }
        
        if(newEl.props != null){
            Object.keys(newEl.props).forEach((prop) => {
                setProps(previous.dom, newEl, prop);
            });
        }
        
        if(newEl.children.length > 0){
            for (let i = 0; i < newEl.children.length; i++) {
                const newChild = newEl.children[i];
                const previousChild = previous.children[i];
                updateDom(newChild, previousChild, previous.dom, i);
            }
        }
        
        newEl.dom = previous.dom;
    }

    updateDom(newEl, previous);

}

const flattenChildren = (children: any): any[] => {
    return Array.isArray(children) ? children.flat(Infinity) : [children];
};

const setProps = (domEl: HTMLElement, el: any, prop: string) => {
    switch (prop) {
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

    if (previous === null) {
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
    console.log("reRender-ing :)");

    resetHooks();

    const page = routes.find((route) => route.path === window.location.pathname) || routes.find((route) => route.path === "404");

    const newVDOM = (await page.module()).default();
    render(newVDOM, container);

}, 0);

reRender();

export const isMounted = () => previous !== null;