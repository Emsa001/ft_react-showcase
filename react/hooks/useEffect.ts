import { TDependencyList, TEffectCallback } from "react/types";
import { useRefHook } from "./useRef";

const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn(
            "The length of the dependencies array must remain consistent between renders."
        );
    }

    return deps.some((dep, index) => {
        return !Object.is(dep, prevDeps[index]);
    });
};

export async function useEffectHook(
    callback: TEffectCallback,
    deps?: TDependencyList
): Promise<void> {
    await Promise.resolve();

    const prevDeps = useRefHook(deps);
    const isFirstRender = useRefHook(true);
    const cleanupRef = useRefHook<(() => void) | undefined>(undefined);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        const cleanup = callback();
        if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
        }
        return;
    }

    if (!deps) {
        if (cleanupRef.current) {
            cleanupRef.current();
        }
        const cleanup = callback();
        if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
        }

        return;
    }

    if (checkDependenciesChanged(prevDeps.current!, deps)) {
        if (cleanupRef.current) {
            cleanupRef.current();
        }
        const cleanup = callback();
        if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
        }
    }

    prevDeps.current = deps;
}
