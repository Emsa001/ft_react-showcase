import { ReactComponentInstance } from "./types/types";
import { VDomManagerImpl } from "./render/manager";

import { useStateHook } from "./hooks/useState";
import { useEffectHook } from "./hooks/useEffect";
import { useStaticHook } from "./hooks/useStatic";
import { useRefHook } from "./hooks/useRef";
import { isValidElementMethod } from "./methods/isValidElement";
import { cloneElementMethod } from "./methods/cloneElement";
import "./render/hot";

class FtReact {
    public vDomManager: VDomManagerImpl;

    constructor() {
        this.vDomManager = new VDomManagerImpl();
    }

    /**
     * Creates a Virtual Node
     */
    createElement(type: string | ComponentType, props: Props = {}, ...children: VNode[]): VNode {
        const { key = null, ...restProps } = props || {};

        const finalProps = {
            ...restProps,
            children, // Inject children into props
        };

        return {
            type,
            props: finalProps,
            children, // This is mostly for rendering, not for components
            ref: null,
            key,
        };
    }

    createComponentInstance(element: ReactElement): ReactComponentInstance {
        if (typeof element.type !== "function") {
            throw new Error("Invalid component type");
        }

        const name = !React.vDomManager.components.has(element.type.name)
            ? element.type.name
            : element.type.name + Math.random().toString(36).substring(2, 15);
        return {
            name: name,
            isMounted: false,
            isUpdating: false,

            hooks: [],
            hookIndex: 0,

            vNode: null,
            jsx: element,

            queueFunctions: new Set<() => void>(),

            onMount() {
                console.log("Component mounted:", this.name);
                this.isMounted = true;
            },
            onUnmount() {
                console.log("Component unmounted:", this.name);
                React.vDomManager.components.delete(this.name);
                React.vDomManager.staticComponents.delete(this.name);
                this.queueFunctions.forEach((fn) => fn());
                this.queueFunctions.clear();

                this.isMounted = false;
                this.vNode = null;
                this.jsx = null;
                this.hooks = [];
                this.hookIndex = 0;

                console.log(React.vDomManager.components);
            },
            onUpdate() {
                console.log("Updating component:", this.name);
            },
        };
    }

    renderComponent(element: ReactElement): ReactComponentInstance {
        const component = this.createComponentInstance(element);
        this.vDomManager.currentComponent = component;

        if (!this.isValidElement(element)) {
            this.vDomManager.currentComponent = null;
            throw new Error("Invalid element type");
        }

        if (typeof element.type === "string") {
            component.vNode = this.createElement(element.type, element.props, ...element.children);
            this.vDomManager.currentComponent = null;
            return component;
        }

        component.vNode = element.type(element.props, ...element.children);

        this.vDomManager.currentComponent = null;
        return component;
    }

    /**
     * Render root component into the real DOM
     */
    async render(element: ReactElement, container: HTMLElement) {
        const rootComponent = this.renderComponent(element);

        this.vDomManager.rootDom = await this.vDomManager.mount({
            vnode: rootComponent.vNode!,
            parent: container,
            name: rootComponent.name,
        });

        console.log(this.vDomManager.components);
        container.appendChild(this.vDomManager.rootDom!);
    }

    /*
     * Hooks
     */
    useState = <T>(initialState: T) => useStateHook(initialState);
    useStatic = <T>(name: string, initialState: T) => useStaticHook(name, initialState);
    useEffect = async (callback: () => void, deps?: any[]): Promise<void> =>
        useEffectHook(callback, deps);
    useLayoutEffect = async (callback: () => void, deps?: any[]): Promise<void> =>
        useEffectHook(callback, deps);
    useRef = <T>(initialValue: T) => useRefHook(initialValue);

    /*
     * Methods
     */
    isValidElement = (object: unknown): object is ReactElement => isValidElementMethod(object);
    cloneElement = (
        element: ReactElement,
        props: Record<string, unknown>,
        ...children: ReactElement[]
    ) => cloneElementMethod(element, props, ...children);
}

const React = new FtReact();

export const useState = React.useState;
export const useEffect = React.useEffect;
export const useLayoutEffect = React.useLayoutEffect;
export const useStatic = React.useStatic;
export const useRef = React.useRef;

export const isValidElement = React.isValidElement;
export const cloneElement = React.cloneElement;
export const createElement = React.createElement;
// export const createContext = React.createContext;
// export const useContext = React.useContext;
// export const setTitle = React.setTitle;

export * from "./types/types";

export default React;
