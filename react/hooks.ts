import { reRender } from "./render";
import { TDependencyList, TEffectCallback } from "./types";

let hookStates: any[] = [];
let hookIndex = 0;

function useState<T>(initialValue: T) {
    const currentIndex = hookIndex;

    if (hookStates[currentIndex] === undefined) {
        hookStates[currentIndex] = initialValue;
    }

    const value = hookStates[currentIndex] as T;

    const setState = (newValue: T | ((prevValue: T) => T)) => {
        const newValueToSet = typeof newValue === "function" ? (newValue as (prevValue: T) => T)(value) : newValue;
        hookStates[currentIndex] = newValueToSet;
        reRender();
    };

    hookIndex++;
    return [value, setState] as [T, typeof setState];
}

function useRef<T>(initialValue: T) {
    return useState({ current: initialValue })[0];
};

const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn("The length of the dependencies array must remain consistent between renders.");
    }

    return deps.some((dep, index) => {
        return !Object.is(dep, prevDeps[index]);
    });
};

const useEffect = async (callback: TEffectCallback, deps?: TDependencyList): Promise<void> => {
    await Promise.resolve();

    const prevDeps = useRef(deps);
    const isFirstRender = useRef(true);
    const cleanupRef = useRef<(() => void) | undefined>(undefined);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        const cleanup = callback();
        if (typeof cleanup === 'function') {
            cleanupRef.current = cleanup;
        }
        return;
    }

    if (!deps) {
        if (cleanupRef.current) {
            cleanupRef.current();
        }
        const cleanup = callback();
        if (typeof cleanup === 'function') {
            cleanupRef.current = cleanup;
        }

        return;
    }

    if (checkDependenciesChanged(prevDeps.current!, deps)) {
        if (cleanupRef.current) {
            cleanupRef.current();
        }
        const cleanup = callback();
        if (typeof cleanup === 'function') {
            cleanupRef.current = cleanup;
        }
    }

    prevDeps.current = deps;
};

const useContext = (context: any) => {
    return context._currentValue;
}

export const resetHooks = () => {
    hookIndex = 0;
};

export { useState, useEffect, useRef, useContext };