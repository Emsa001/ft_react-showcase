import { reRender } from "./render";
import { Props, ReactElement } from "./types";

const React = {
    createElement: (tag: string | ((props: Props, ...children: any[]) => ReactElement), props: Props, ...children: any[]): ReactElement => {
        if (typeof tag === "function") {
            return tag(props, ...children);
        }
        const el: ReactElement = {
            tag,
            props,
            children,
        };

        return el;
    },
};

let hookStates = [];
let hookIndex = 0;

function useState(initialValue) {
    const currentIndex = hookIndex;

    if(!hookStates[currentIndex])  
        hookStates[currentIndex] = initialValue;

    const value = hookStates[currentIndex];
    
    const setState = (newValue: any) => {
        if (value === newValue) return;
        
        if(typeof newValue === "function")
            hookStates[currentIndex] = newValue(value);
        else 
            hookStates[currentIndex] = newValue;
    
        reRender();
    };
    
    hookIndex++;
    return [value, setState];
}

function useEffect(callback, dependencies) {
    const currentIndex = hookIndex;
    const previousDependencies = hookStates[currentIndex];

    let hasChanged = true;
    if (previousDependencies) {
        hasChanged = dependencies.some((dep, i) => dep !== previousDependencies[i]);
    }

    if (hasChanged) {
        callback();
        hookStates[currentIndex] = dependencies;
    }

    hookIndex++;
}


export const resetHooks = () => {
    hookIndex = 0;
};

export default React;
export { useState, useEffect };
