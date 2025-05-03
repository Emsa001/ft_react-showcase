import { ReactComponentInstance, RouterProps } from "./types/types";
import { VDomManagerImpl } from "./render/manager";

import { isValidElementMethod } from "./methods/isValidElement";
import { cloneElementMethod } from "./methods/cloneElement";
import { createContextMethod } from "./methods/createContext";
import { createComponentInstanceMethod } from "./methods/createComponentInstance";
import { renderComponentMethod, renderMethod } from "./render/render";
import { createElementMethod } from "./methods/createElement";
import { BrowserRouterMethod, RouterMethod } from "./methods/BrowserRouter";

import { useStateHook } from "./hooks/useState";
import { useEffectHook } from "./hooks/useEffect";
import { useStaticHook } from "./hooks/useStatic";
import { useRefHook } from "./hooks/useRef";
import { useContextHook } from "./hooks/useContext";
import { useNavigationHook } from "./hooks/useNavigation";

import "./render/hot";
import { useSyncExternalStoreMethod } from "./hooks/useSyncExternalStore";

class FtReact {
    public vDomManager: VDomManagerImpl;

    constructor() {
        this.vDomManager = new VDomManagerImpl();
    }

    /*
     * Methods
     */

    createElement = (type: string | ComponentType, props: Props = {}, ...children: VNode[]): VNode =>
        createElementMethod(type, props, ...children);
    cloneElement = (element: ReactElement, props: Record<string, unknown>, ...children: ReactElement[]) =>
        cloneElementMethod(element, props, ...children);
    isValidElement = (object: unknown): object is ReactElement => isValidElementMethod(object);

    createContext = <T>(defaultValue: T) => createContextMethod(defaultValue);
    createComponentInstance = (element: ReactElement): ReactComponentInstance => createComponentInstanceMethod(element);

    renderComponent = (element: ReactElement): ReactComponentInstance => renderComponentMethod(element);
    render = async (element: ReactElement, container: HTMLElement): Promise<void> => renderMethod(element, container);

    BrowserRouter = (props: { children?: ReactElement[] }) => BrowserRouterMethod(props);
    RouterMethod = (props: RouterProps) => RouterMethod(props);

    /*
     * Hooks
     */

    useState = <T>(initialState: T) => useStateHook(initialState);
    useStatic = <T>(name: string, initialState: T) => useStaticHook(name, initialState);
    useEffect = (callback: () => void, deps?: any[]) => useEffectHook(callback, deps);
    useRef = <T>(initialValue: T) => useRefHook(initialValue);
    useContext = (context: any) => useContextHook(context);
    useNavigation = () => useNavigationHook();
    useSyncExternalStore = <T>(
        subscribe: (onStoreChange: () => void) => () => void,
        getSnapshot: () => T,
    ) => useSyncExternalStoreMethod(subscribe, getSnapshot);

    /*
     * Custom Methods
     */

    setTitle = (title: string) => {
        document.title = title;
    };
}

const React = new FtReact();

/*
 * Methods
 */

export const createElement = React.createElement;
export const cloneElement = React.cloneElement;
export const isValidElement = React.isValidElement;
export const createContext = React.createContext;
export const BrowserRouter = React.BrowserRouter;
export const Router = React.RouterMethod;

/*
 * Hooks
 */

export const useState = React.useState;
export const useEffect = React.useEffect;
export const useStatic = React.useStatic;
export const useRef = React.useRef;
export const useContext = React.useContext;
export const useNavigation = React.useNavigation;
export const useSyncExternalStore = React.useSyncExternalStore;

/*
 * Custom Methods
 */

export const setTitle = React.setTitle;
/* ========================================================== */

export * from "./types/types";
export const IS_DEVELOPMENT = true;
export default React;
