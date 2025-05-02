import React from "..";
import { useRefHook } from "./useRef";

interface IEffectCallback {
    (): (() => void) | void;
}

type TEffectCallback = IEffectCallback | (() => void);
type TDependencyList = any[];

const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn(
            "The length of the dependencies array must remain consistent between renders."
        );
    }
    return deps.some((dep, index) => !Object.is(dep, prevDeps[index]));
};

export function useEffectHook(callback: TEffectCallback, deps?: TDependencyList): void {
    const component = React.vDomManager.currentComponent;
    if (!component) {
        throw new Error("useEffect must be called inside a component render function");
    }

    const prevDeps = useRefHook<TDependencyList | undefined>(undefined);
    const cleanupRef = useRefHook<(() => void) | void>(undefined);
    const isFirstRender = useRefHook(true);

    if (isFirstRender.current) {
        isFirstRender.current = false;

        const cleanup = callback();
        cleanupRef.current = cleanup;

        // Register the cleanup function to component's unmount queue
        if (typeof cleanup === "function") {
            component.queueFunctions.add(cleanup);
        }
    } else if (deps && prevDeps.current && !checkDependenciesChanged(prevDeps.current, deps)) {
        return;
    } else {
        if (typeof cleanupRef.current === "function") {
            cleanupRef.current();
            component.queueFunctions.delete(cleanupRef.current);
        }

        const cleanup = callback();
        cleanupRef.current = cleanup;

        if (typeof cleanup === "function") {
            component.queueFunctions.add(cleanup);
        }
    }

    prevDeps.current = deps;
}
