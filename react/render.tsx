import routes from "../src/routes";
import { resetHooks } from "./hooks";
import { ReactElement } from "./types";
import { debounce } from "./utils";

// Mount function (first-time rendering)
const mount = (el: ReactElement | string, container: HTMLElement, replace: boolean = false): void => {
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
        const component = el.tag({ ...el.props, children: el.children });
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

    if(replace)
        container.replaceWith(domEl);
    else
        container.appendChild(domEl);
};

// Update function
const update = (
    newEl: ReactElement | ReactElement[] | string,
    previous: ReactElement,
    container: HTMLElement
): void => {
    if (!container) {
        console.error("Container is undefined or null!");
        return;
    }
    
    if (Array.isArray(newEl)) {
        newEl.forEach((child) => {
            update(child, previous, container);
        });
        return;
    }
    
    if(Array.isArray(previous)){
        previous.forEach((child) => {
            update(newEl, child, container);
        });
        return;
    }

    
    if (typeof newEl === "string" || typeof newEl === "number") {
        container.textContent = newEl;
        return;
    }

    if(typeof previous === "string" || typeof previous === "number"){
        return;
    }
    
    if (typeof newEl.tag === "function") {
        container.innerHTML = "";
        mount(newEl, container, true);
        return ;
    }
    
    let div = container;
    if(div.hasChildNodes()){
        div = div.childNodes[0] as HTMLElement
    }
    
    const updateChild = (index: number): void => {
        if (index >= newEl.children.length) return;
        let oldChild = previous.children[index] as ReactElement;
        let newChild = newEl.children[index] as ReactElement;

        if (typeof newChild === "string" || typeof newChild === "number") {
            
            if (newEl.props) {
                console.log(newEl.props)
                Object.keys(newEl.props).forEach((prop) => {
                    setProps(div, newEl, prop);
                });
            }

            console.log(newChild, oldChild);

            if(div.childNodes[index])
                (div.childNodes[index] as HTMLElement).textContent = newChild;
            else{
                (div.childNodes[index - 1] as HTMLElement).textContent += newChild;
            }
                
        } else if (JSON.stringify(oldChild) !== JSON.stringify(newChild)) {
            (div.childNodes[index] as HTMLElement).innerHTML = "";
            mount(newChild, div.childNodes[index] as HTMLElement, true);
        }

        if(newEl.children && newEl.children.length > index)
            updateChild(index + 1);
    };

    updateChild(0);
};



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
export const render = (el: ReactElement | ReactElement[] | string, container: HTMLElement): void => {
    if (Array.isArray(el)) {
        el.forEach((child) => render(child, container));
        return;
    }
    if (previous === null) {
        console.log("Mounting...", el);
        mount(el, container);
    } else {
        console.log("Updating...");
        update(el, previous, container);
    }
};

let previous: ReactElement = null;

const container = document.getElementById("root") as HTMLElement;
let currentFocusedElement: HTMLElement | null = null;

export const reRender = debounce(async () => {
    currentFocusedElement = document.activeElement as HTMLElement;
    console.log("reRender-ing :)");

    resetHooks();

    const page = routes.find((route) => route.path === window.location.pathname) || routes.find((route) => route.path === "404");

    const newVDOM = (await page.module()).default();
    render(newVDOM, container);

    previous = newVDOM;

    if (currentFocusedElement) {
        const newFocusedElement = document.getElementById(currentFocusedElement.id);
        if (newFocusedElement)
            newFocusedElement.focus();
    }
}, 0);

reRender();