import { Hook, IS_DEVELOPMENT, ReactComponentInstance } from "react";
import React from "../";

// Process all queued state updates for the hook
export function processQueue(hook: Hook) {
    let state = hook.memoizedState;

    for (const update of hook.queue) {
        state = update(state);
    }

    hook.memoizedState = state;
    hook.queue = [];
}

// Schedule the component update asynchronously
export async function scheduleUpdate(component: ReactComponentInstance, states: Hook[]) {
    component.isUpdating = true;

    await Promise.resolve().then(async () => {
        // Process the queued state updates
        states.forEach((hook) => {
            processQueue(hook);
        });
        
        component.isUpdating = false;
        
        React.vDomManager.currentComponent = component;
        component.hookIndex = 0;
        
        if (typeof component.jsx?.type !== "function") {
            throw new Error("Invalid component type");
        }
        
        const newVNode = component.jsx?.type(component.jsx.props, ...component.jsx.children);
        newVNode.componentName = component.name;
        if(IS_DEVELOPMENT){
            console.log("New VNode:", newVNode);
            console.log("Old VNode:", component.vNode);
        }

        if(!component.vNode?.ref){
            throw new Error("Component ref is null, are you sure the component has a parent?");
        }
        
        if (newVNode && component.vNode) {
            React.vDomManager.update({
                oldNode: component.vNode,
                newVNode,
                ref: component.vNode.ref,
                parent: component.vNode.ref!.parentElement,
                index: 0,
                name: component.name
            });
            component.vNode = newVNode;
        }
        if(IS_DEVELOPMENT) console.log(React.vDomManager.components);
    });
    
}

// useState implementation
export function useStateHook<T>(initialState: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.vDomManager.currentComponent;

    if (!component) {
        throw new Error("useState must be called within a component");
    }
    
    let hook = component.hooks[component.hookIndex];
    
    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
            type: 'state'
        };
        
        component.hooks.push(hook);
    }
    
    component.hookIndex++;

    const setState = (newValue: T | ((prevState: T) => T)) => {
        // Push the new state update to the queue
        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });
        
        // Only schedule the update once
        if (!component.isUpdating) {
            scheduleUpdate(component, component.hooks);
        }        
    };
    
    // Do not process state updates immediately in the current render cycle!
    // Process state updates in the next render cycle via `scheduleUpdate`.
    
    // Return the current memoized state
    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}
