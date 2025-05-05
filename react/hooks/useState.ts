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
    await Promise.resolve().then(async () => {
        states.forEach((hook) => {
            processQueue(hook);
        });
        
        component.isDirty = false;
        
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
            throw new Error("Component ref is null, something is very wrong here :|");
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
            component.isDirty = false;
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
        if (!component.isDirty) {
            if(IS_DEVELOPMENT) console.log("Component is dirty:", component.name);
            component.isDirty = true;
            scheduleUpdate(component, component.hooks);
        }
    };
    
    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}
