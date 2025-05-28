import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

export const UseStateHookDocs = () => {
    return (
        <DocsSection title="useState Hook">
            <p className="text-base mb-4">
                This is a custom implementation of the standard React <code>useState</code> hook for <strong>ft_react</strong>. It follows the core ideas of the official React API, but is simplified.<br />If you're looking for detailed usage patterns, refer to the official docs:
                <a
                    href="https://react.dev/reference/react/useState"
                    className="text-blue-500 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React useState Documentation
                </a>.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">How it works</h2>
            <ol className="list-decimal list-inside text-base mb-4">
                <li>Get the currently rendering component instance.</li>
                <li>Look up the hook at the current index or create it if missing.</li>
                <li>Advance the hook index for the next call.</li>
                <li>Create the <code>setState</code> function that queues updates and marks the component as dirty.</li>
                <li>Return the current state and the setter.</li>
            </ol>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 1: Retrieve the current component context</h2>
            <CodeBlock
                language="ts"
                code={`const component = React.currentComponent;

if (!component) {
    throw new Error("useState must be called within a component");
}`}
            />
            <p className="my-4">
                Hooks can only run during a component's render. We ensure the context is valid, or throw an error otherwise.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 2: Get or create the hook state</h2>
            <CodeBlock
                language="ts"
                code={`let hook = component.hooks[component.hookIndex];

if (!hook) {
    hook = {
        memoizedState: initialState,
        queue: [],
    };
    
    component.hooks.push(hook);
}

component.hookIndex++;`}
            />
            <p className="my-4">
                We use the hook index to retrieve or initialize state. The index is then incremented for the next hook.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 3: Define the setter function</h2>
            <CodeBlock
                language="ts"
                code={`const setState = (newValue: T | ((prevState: T) => T)) => {
    hook!.queue.push((prevState: T) => {
        if (typeof newValue === 'function') {
            return (newValue as (prev: T) => T)(prevState);
        }
        return newValue;
    });

    if (!component.isDirty) {
        component.isDirty = true;
        updateSchedule(component, component.hooks);
    }
};`}
            />
            <p className="my-4">
                The setter queues an update and schedules an update if needed. It supports both values and updater functions.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 4: Return the state and setter</h2>
            <CodeBlock
                language="ts"
                code={`return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];`}
            />
            <p className="my-4">
                We return the current state and its setter.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Full implementation</h2>
            <CodeBlock
                language="ts"
                code={`function useStateHook<T>(initialState: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.currentComponent;

    if (!component) {
        throw new Error("useState must be called within a component");
    }
    
    let hook = component.hooks[component.hookIndex];
    
    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
        };
        
        component.hooks.push(hook);
    }
    
    component.hookIndex++;

    const setState = (newValue: T | ((prevState: T) => T)) => {
        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });
        
        if (!component.isDirty) {
            component.isDirty = true;
            updateSchedule(component, component.hooks);
        }
    };
    
    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}`}
            />
        </DocsSection>
    );
};