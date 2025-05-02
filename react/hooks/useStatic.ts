import React, { IS_DEVELOPMENT } from "react";
import { scheduleUpdate } from "./useState";

/*

useStatic causes double rendering when updated with useState
TODO: Fix the issue by optimally marking component as dirty and update only when necessary

*/

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

    // push to staticComponents
    if (!React.vDomManager.staticComponents.has(name)) {
        React.vDomManager.staticComponents.set(name, []);
    }

    const staticComponents = React.vDomManager.staticComponents.get(name)!;
    if (!staticComponents.includes(component.name)) {
        staticComponents.push(component.name);
        if(IS_DEVELOPMENT) console.log("Adding static component:", component.name, "to staticStates:", name);
    }
    
    const setState = (newValue: T | ((prevState: T) => T)) => {
        // Push the new state update to the queue
        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });
        
        if(!staticComponents) {
            throw new Error("No static components found");
        }

        staticComponents.forEach((comp) => {
            const compInstance = React.vDomManager.components.get(comp);
            if(!compInstance) {
                throw new Error("No component found");
            }
            compInstance.isDirty = true;
            scheduleUpdate(compInstance, [hook]);
        })    
    };
    
    // Do not process state updates immediately in the current render cycle!
    // Process state updates in the next render cycle via `scheduleUpdate`.
    
    // Return the current memoized state
    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}
