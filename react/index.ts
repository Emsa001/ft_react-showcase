import { IProps, IReactComponent } from "./types";
import { VDomManagerImpl } from "./vdom/manager";

import { useStateHook } from "./hooks/useState";
import { useEffectHook } from "./hooks/useEffect";
import { useStaticHook } from "./hooks/useStatic";
import { useRefHook } from "./hooks/useRef";
import { isValidElementMethod } from "./methods/isValidElement";
import { cloneElementMethod } from "./methods/cloneElement";

class FtReact {
    public vDomManager: VDomManagerImpl;

    constructor() {
        this.vDomManager = new VDomManagerImpl();
    }

    /**
     * Creates a Virtual Node
     */
    createElement(
        tag: string | ((props: IProps, ...children: IReactVNode[]) => IReactVNode),
        props: IProps = {},
        ...children: IReactVNode[]
    ): IReactVNode {
        const { key = null, ...restProps } = props || {};

        return {
            tag,
            props: restProps,
            children,
            ref: null,
            key,
        };
    }

    createComponentInstance(element: IReactVNode): IReactComponent {
        return {
            name: element.tag.name,
            isMounted: false,
            isUpdating: false,

            states: [],
            hookIndex: 0,

            vNode: null,
            jsx: element,

            queueFunctions: new Set<() => void>(),

            onMount() {
                // console.log("Component mounted:", this.name);
                this.isMounted = true;
            },
            onUnMount() {
                // console.log("Component unmounted:", this.name);
                React.vDomManager.components.delete(this.name);
                React.vDomManager.staticComponents.delete(this.name);
                this.queueFunctions.forEach((fn) => fn());
                this.queueFunctions.clear();

                this.isMounted = false;
                this.vNode = null;
                this.jsx = null;
                this.states = [];
                this.hookIndex = 0;
            },
            onUpdate() {
                console.log("Updating component:", this.name);
            },
        };
    }

    renderComponent(element: IReactVNode): IReactComponent {
        const component = this.createComponentInstance(element);
        this.vDomManager.currentComponent = component;

        component.vNode = element.tag(element.props, ...element.children);

        this.vDomManager.currentComponent = null;
        return component;
    }

    /**
     * Render root component into the real DOM
     */
    render(element: IReactVNode, container: HTMLElement) {
        const rootComponent = this.renderComponent(element);
        // this.vDomManager.mount(rootComponent, container);

        this.vDomManager.rootDom = this.vDomManager.mount({
            vnode: rootComponent.vNode,
            parent: container,
            name: rootComponent.name,
        });
        container.appendChild(this.vDomManager.rootDom!);
    }

    /*
     * Hooks
     */
    useState = <T>(initialState: T) => useStateHook(initialState);
    useStatic = <T>(name: string, initialState: T) => useStaticHook(name, initialState);
    useEffect = async (callback: () => void, deps?: any[]): Promise<void> => useEffectHook(callback, deps);
    useRef = <T>(initialValue: T) => useRefHook(initialValue);

    /*
     * Methods
     */
    isValidElement = (object: unknown): object is IReactVNode => isValidElementMethod(object);
    cloneElement = (element: IReactVNode, props: Record<string, unknown>, ...children: IReactVNode[]) =>
        cloneElementMethod(element, props, ...children);
}

const React = new FtReact();

export const useState = React.useState;
export const useEffect = React.useEffect;
export const useStatic = React.useStatic;
export const useRef = React.useRef;
export const isValidElement = React.isValidElement;
export const cloneElement = React.cloneElement;
// export const createContext = React.createContext;
// export const useContext = React.useContext;
// export const setTitle = React.setTitle;

export default React;
