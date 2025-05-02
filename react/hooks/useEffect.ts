import React from "..";
import { useRefHook } from "./useRef";

const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn("The length of the dependencies array must remain consistent between renders.");
    }
    return deps.some((dep, index) => !Object.is(dep, prevDeps[index]));
};

export function useEffectHook(callback: TEffectCallback, deps?: TDependencyList): void {
    const component = React.vDomManager.currentComponent;
    if (!component) {
        throw new Error("useEffect must be called inside a component render function");
    }

    const prevDeps = useRefHook<TDependencyList | undefined>(undefined);
    const cleanupRef = useRefHook<(() => void) | undefined>(undefined);
    const isFirstRender = useRefHook(true);

    const runEffect = () => setTimeout(() => {
        if (typeof cleanupRef.current === "function") {
            try {
                cleanupRef.current();
            } catch (err) {
                console.error("Error running cleanup:", err);
            }
            component.queueFunctions.delete(cleanupRef.current);
        }

        let cleanup: void | (() => void);
        try {
            cleanup = callback();
        } catch (err) {
            console.error("useEffectHook callback threw:", err);
            cleanup = undefined;
        }

        if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
            component.queueFunctions.add(cleanup);
        } else {
            cleanupRef.current = undefined;
        }
    }, 0);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        runEffect();
    } else if (!deps || !prevDeps.current || checkDependenciesChanged(prevDeps.current, deps)) {
        runEffect();
    }

    prevDeps.current = deps;
}
