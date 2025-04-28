import { IHook, IReactComponent } from "react/types";
import React from "../";

// Process all queued state updates for the hook
function processQueue(hook: IHook) {
    let state = hook.memoizedState;

    for (const update of hook.queue) {
        state = update(state);
    }

    hook.memoizedState = state;
    hook.queue = [];
}

// Schedule the component update asynchronously
function scheduleUpdate(component: IReactComponent) {
    if (component.isUpdating) return;
    component.isUpdating = true;

    Promise.resolve().then(() => {
        // console.log("Scheduling update for component:", component.name);

        // Process the queued state updates
        component.states.forEach((hook) => {
            processQueue(hook);
        });

        component.isUpdating = false;

        // Re-render the component with the updated state
        React.vDomManager.currentComponent = component;
        component.hookIndex = 0;
        const newVNode = component.jsx?.tag(component.jsx.props, ...component.jsx.children);
        React.vDomManager.currentComponent = null;
        // console.log("New VNode:", newVNode);
        // console.log("Old VNode:", component.vNode);
        if (newVNode && component.vNode) {
            React.vDomManager.update({
                oldNode: component.vNode,
                newVNode,
                ref: component.vNode.ref!,
                parent: component.vNode.ref!.parentElement,
                index: 0,
                name: component.name
            });
            component.vNode = newVNode;
        }
        
    });

}

// useState implementation
export function useStateHook<T>(initialState: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.vDomManager.currentComponent;

    if (!component) {
        throw new Error("useState must be called within a component");
    }
    
    let hook = component.states[component.hookIndex];
    
    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
            type: 'state'
        };
        
        component.states.push(hook);
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
            scheduleUpdate(component); // This triggers the re-render and state processing
        }        
    };
    
    // Do not process state updates immediately in the current render cycle!
    // Process state updates in the next render cycle via `scheduleUpdate`.
    
    // Return the current memoized state
    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}
