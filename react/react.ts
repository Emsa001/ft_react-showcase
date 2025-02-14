import { Props, ReactElement } from "./other/types";
import Renderer, { ReactRender } from "./render";
import { useStateHook } from "./hooks/useState";
import { useEffectHook } from "./hooks/useEffect";
import { useRefHook } from "./hooks/useRef";

const React = {
    contexts: new Map(),
    render: Renderer,
    reRender: () => ReactRender.reRender(),

    createElement: (
        tag: string | ((props: Props | null, ...children: any[]) => ReactElement),
        props: Props,
        ...children: any[]
    ): ReactElement => {
        
        const el: ReactElement = {
            tag,
            props,
            children,
            dom: null,
        };

        return el;
    },

    createContext<T>(defaultValue: T) {
        const context = {
            _currentValue: defaultValue,
            _defaultValue: defaultValue,
            _calledByProvider: false,
            Provider: ({ value, children }: { value?: T; children?: any }) => {
                context._currentValue = value !== undefined ? value : context._defaultValue;
                context._calledByProvider = true;
                return children;
            },
        };
        return context;
    },

    useContext<T>(context: { _currentValue: T }): T {
        return context._currentValue;
    },

    setTitle: (newTitle: string) => {
        document.title = newTitle;
    },

    useState: <T>(initialState: T) => useStateHook(initialState),
    useEffect: async (callback: () => void, deps?: any[]): Promise<void> =>useEffectHook(callback, deps),
    useRef: <T>(initialValue: T) => useRefHook(initialValue),
};

export const createContext = React.createContext;
export const useContext = React.useContext;

export * from "./hooks";
export default React;
