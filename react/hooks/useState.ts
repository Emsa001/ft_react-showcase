import React from "../";
import Render from "react/render";

export function useStateHook<T>(initialValue: T) {
    const component = Render.getLastComponent();
    if(!component) throw new Error("Component not found");

    const currentIndex = component.state.hookIndex;
    const hookStates = component.state.hookStates;

    if (hookStates[currentIndex] === undefined) {
        hookStates[currentIndex] = initialValue;
    }

    const value = hookStates[currentIndex] as T;

    const setState = (newValue: T | ((prevValue: T) => T)) => {
        const newValueToSet = typeof newValue === "function" ? (newValue as (prevValue: T) => T)(value) : newValue;
        hookStates[currentIndex] = newValueToSet;
        React.reRender(component);
    };

    component.state.hookIndex = currentIndex + 1;
    Render.addComponent(component.name, component);
    return [value, setState] as [T, typeof setState];
}