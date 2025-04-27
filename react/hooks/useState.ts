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
        console.log("Scheduling update for component:", component.name);

        component.state.forEach((hook) => {
            processQueue(hook);
            // console.log("Processed hook:", hook);
        });

        component.isUpdating = false;

        // Re-render the component
        React.vDomManager.currentComponent = component;
        component.hookIndex = 0
        const newVNode = component.jsx?.tag(component.jsx.props, ...component.jsx.children);
        React.vDomManager.currentComponent = null; 

        if (newVNode && component.vNode) {
            // component.vNode = newVNode;
            React.vDomManager.update(component.vNode, newVNode, component.vNode.ref!, 0, component.name);
            // component.onUpdate();
        }
    });
}

// useState implementation
export function useStateHook<T>(initialState: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.vDomManager.currentComponent;

    if (!component) {
        throw new Error("useState must be called within a component");
    }

    const hookKey = component.hookIndex;
    let hook = component.state.get(hookKey);

    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
            type: 'state'
        };
        component.state.set(hookKey, hook);
    }

    component.hookIndex++;

    const setState = (newValue: T | ((prevState: T) => T)) => {
        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });

        if (!component.isUpdating) {
            scheduleUpdate(component);
        }
    };

    return [hook.memoizedState, setState];
}
