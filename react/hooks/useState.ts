import React from "../";
import { hookIndex, hookStates, setHookIndex } from ".";

export function useStateHook<T>(initialValue: T) {
    const currentIndex = hookIndex;

    if (hookStates[currentIndex] === undefined) {
        hookStates[currentIndex] = initialValue;
    }

    const value = hookStates[currentIndex] as T;

    const setState = (newValue: T | ((prevValue: T) => T)) => {
        const newValueToSet = typeof newValue === "function" ? (newValue as (prevValue: T) => T)(value) : newValue;
        hookStates[currentIndex] = newValueToSet;
        React.reRender();
    };

    setHookIndex(currentIndex + 1);
    return [value, setState] as [T, typeof setState];
}