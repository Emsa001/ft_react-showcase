import React, { IS_DEVELOPMENT } from "react";
import { processQueue, scheduleUpdate, useStateHook } from "./useState";

export function useStaticHook<T>(name: string, initialState: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.vDomManager.currentComponent;

    if (!component) {
        throw new Error("useStatic must be called within a component");
    }
    
    let hook = React.vDomManager.staticStates.get(name);
    
    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
            type: 'state'
        };
        React.vDomManager.staticStates.set(name, hook);
    }

    if (!React.vDomManager.staticComponents.has(name)) {
        React.vDomManager.staticComponents.set(name, []);
    }

    const staticComponents = React.vDomManager.staticComponents.get(name)!;
    if (!staticComponents.includes(component.name)) {
        staticComponents.push(component.name);
        if(IS_DEVELOPMENT) console.log("Adding static component:", component.name, "to staticStates:", name);
    }
    
    const setState = (newValue: T | ((prevState: T) => T)) => {
        if(!staticComponents) {
            throw new Error("No static components found");
        }

        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });
        processQueue(hook);
        
        staticComponents.forEach((comp) => {
            const compInstance = React.vDomManager.components.get(comp);
            if(!compInstance) {
                throw new Error("No component found");
            }
            if (!compInstance.isDirty) {
                compInstance.isDirty = true;
                scheduleUpdate(compInstance, []);
            }
        })    
    };

    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}

