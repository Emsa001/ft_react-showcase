import { ReactComponentInstance } from "./types/types";
import { VDomManagerImpl } from "./render/manager";

import { useStateHook } from "./hooks/useState";
import { useEffectHook } from "./hooks/useEffect";
import { useStaticHook } from "./hooks/useStatic";
import { useRefHook } from "./hooks/useRef";
import { isValidElementMethod } from "./methods/isValidElement";
import { cloneElementMethod } from "./methods/cloneElement";
import "./render/hot";
import { useContextHook } from "./hooks/useContext";
import { Context } from "vm";
import { createContextMethod } from "./methods/createContext";
import { createComponentInstanceMethod } from "./methods/createComponentInstance";
import { renderComponentMethod } from "./methods/renderComponent";
import { renderMethod } from "./methods/render";
import { createElementMethod } from "./methods/createElement";

class FtReact {
    public vDomManager: VDomManagerImpl;

    constructor() {
        this.vDomManager = new VDomManagerImpl();
    }

    /**
     * Creates a Virtual Node
     */
    createElement = (
        type: string | ComponentType,
        props: Props = {},
        ...children: VNode[]
    ): VNode => createElementMethod(type, props, ...children);
    createContext = <T>(defaultValue: T): Context => createContextMethod(defaultValue);
    createComponentInstance = (element: ReactElement): ReactComponentInstance =>
        createComponentInstanceMethod(element);
    renderComponent = (element: ReactElement): ReactComponentInstance =>
        renderComponentMethod(element);
    render = async (element: ReactElement, container: HTMLElement): Promise<void> =>
        renderMethod(element, container);

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
    useContext = (context: any) => useContextHook(context);

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

export const useContext = React.useContext;
export const createContext = React.createContext;

export const isValidElement = React.isValidElement;
export const cloneElement = React.cloneElement;
export const createElement = React.createElement;
// export const createContext = React.createContext;
// export const useContext = React.useContext;
// export const setTitle = React.setTitle;

export * from "./types/types";

export default React;
