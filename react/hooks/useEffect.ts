import { TDependencyList, TEffectCallback } from "react/types";
import { useRefHook } from "./useRef";


const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn("The length of the dependencies array must remain consistent between renders.");
    }
    return deps.some((dep, index) => !Object.is(dep, prevDeps[index]));
};

export function useEffectHook(callback: TEffectCallback, deps?: TDependencyList): void {
    const prevDeps = useRefHook<TDependencyList | undefined>(undefined);
    const isFirstRender = useRefHook(true);
    const cleanupRef = useRefHook<(() => void) | undefined>(undefined);

    if (isFirstRender.current) {
        isFirstRender.current = false;
    } else if (deps && prevDeps.current && !checkDependenciesChanged(prevDeps.current, deps)) {
        return;
    }

    if (cleanupRef.current) {
        cleanupRef.current();
    }

    const cleanup = callback();
    if (typeof cleanup === "function") {
        cleanupRef.current = cleanup;
    }

    prevDeps.current = deps;
}
