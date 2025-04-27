import { IProps, IReactComponent } from "./types";
import { VDomManagerImpl } from "./vdom/manager";

import { useStateHook } from "./hooks/useState";

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
            onMount() {
                console.log("Component mounted:", this.name);
                this.isMounted = true;
            },
            onUnmount() {
                console.log("Component unmounted:", this.name);
                this.isMounted = false;
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
        this.vDomManager.mount(rootComponent, container);
    }

    useState = <T>(initialState: T) => useStateHook(initialState);
    // useEffect: async (callback: () => void, deps?: any[]): Promise<void> =>useEffectHook(callback, deps),
    // useRef: <T>(initialValue: T) => useRefHook(initialValue),
};

const React = new FtReact();

export const useState = React.useState;
// export const useEffect = React.useEffect;
// export const useRef = React.useRef;
// export const createContext = React.createContext;
// export const useContext = React.useContext;
// export const setTitle = React.setTitle;

export default React;
