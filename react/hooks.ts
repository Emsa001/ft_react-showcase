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
        if (!Object.is(hookStates[currentIndex], newValueToSet)) {
            hookStates[currentIndex] = newValueToSet;
            reRender();
        }
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

const useEffect = (callback: TEffectCallback, deps?: TDependencyList): void => {
    const prevDeps = useRef(deps);
    const isFirstRender = useRef(true);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        callback();
        return;
    }

    if (!deps) {
        callback();
        return;
    }

    if (checkDependenciesChanged(prevDeps.current!, deps)) {
        callback();
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