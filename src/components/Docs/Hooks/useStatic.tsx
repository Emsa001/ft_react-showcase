import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

const useStaticHookCode = `function useStaticHook<T>(name: string, initialState?: T): [T, (value: T | ((prevState: T) => T)) => void] {
    const component = React.currentComponent;

    if (!component) {
        throw new Error("useStatic must be called within a component");
    }
    
    let hook = React.staticStates.get(name);
    
    if (!hook) {
        hook = {
            memoizedState: initialState,
            queue: [],
            type: 'state'
        };
        React.staticStates.set(name, hook);
    }

    if (!React.staticComponents.has(name)) {
        React.staticComponents.set(name, []);
    }

    const staticComponents = React.staticComponents.get(name)!;
    if (!staticComponents.includes(component.name)) {
        staticComponents.push(component.name);
    }
    
    const setState = (newValue: T | ((prevState: T) => T)) => {
        if (!staticComponents) {
            console.warn("Tried to set state on a static component that doesn't exist");
            return;
        }

        hook!.queue.push((prevState: T) => {
            if (typeof newValue === 'function') {
                return (newValue as (prev: T) => T)(prevState);
            }
            return newValue;
        });
        processQueue(hook);
        
        staticComponents.forEach((comp) => {
            const compInstance = React.components.get(comp);
            if (!compInstance) {
                console.warn("Tried to set state on a static component that doesn't exist, probably component was unmounted and not unsubscribed from the static state. After this message, the component will be removed from the staticStates");
                React.staticComponents.delete(comp);
            } else {
                if (!compInstance.isDirty) {
                    compInstance.isDirty = true;
                    updateSchedule(compInstance, []);
                }
            }
        })    
    };

    return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];
}`;

export const UseStaticHookDocs = () => {
    return (
        <DocsSection title="useStatic Hook">
            <p className="text-base mb-4">
                <strong>useStatic</strong> is a custom hook in <strong>ft_react</strong> for managing persistent, shared state across components—
                without needing context providers. It behaves like a scoped global store, ideal for syncing state between multiple components. It's implementation is very similar to <strong>useState's</strong> implementation.
            </p>

            <p className="text-base mb-4">
                Unlike <code>useState</code>, <code>useStatic</code> holds its values globally inside the React runtime, 
                so state remains available even if a component is unmounted and later re-mounted.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">How it works</h2>
            <ol className="list-decimal list-inside text-base mb-4">
                <li>Access the current rendering component.</li>
                <li>Retrieve or create the named static state.</li>
                <li>Register the component to that static state group.</li>
                <li>Define a setter that updates state and re-renders all subscribed components.</li>
                <li>Return the current value and setter as a tuple.</li>
            </ol>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 1: Access the current component</h2>
            <CodeBlock
                language="ts"
                code={`const component = React.currentComponent;

if (!component) {
    throw new Error("useStatic must be called within a component");
}`}
            />
            <p className="my-4">
                Like other hooks, <code>useStatic</code> must be used inside a component render. If not, we throw an error.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 2: Get or create the static state</h2>
            <CodeBlock
                language="ts"
                code={`let hook = React.staticStates.get(name);

if (!hook) {
    hook = {
        memoizedState: initialState,
        queue: [],
        type: 'state'
    };
    React.staticStates.set(name, hook);
}`}
            />
            <p className="my-4">
                The static state is stored by name. If it doesn't exist yet, we initialize it with the provided <code>initialState</code>.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 3: Register the component to the static group</h2>
            <CodeBlock
                language="ts"
                code={`if (!React.staticComponents.has(name)) {
    React.staticComponents.set(name, []);
}

const staticComponents = React.staticComponents.get(name)!;
if (!staticComponents.includes(component.name)) {
    staticComponents.push(component.name);
}`}
            />
            <p className="my-4">
                Components using the same static state name are tracked in a list so they can all re-render when the shared state changes.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 4: Define the setter function</h2>
            <CodeBlock
                language="ts"
                code={`const setState = (newValue: T | ((prevState: T) => T)) => {
    if (!staticComponents) return;

    hook!.queue.push((prevState: T) => {
        return typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(prevState)
            : newValue;
    });
    
    processQueue(hook);

    staticComponents.forEach((comp) => {
        const compInstance = React.components.get(comp);
        if (!compInstance) {
            React.staticComponents.delete(comp);
        } else if (!compInstance.isDirty) {
            compInstance.isDirty = true;
            updateSchedule(compInstance, []);
        }
    });
};`}
            />
            <p className="my-4">
                The setter updates the shared state and schedules all subscribed components to re-render.
                It also cleans up entries if a component was unmounted.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 5: Return state and setter</h2>
            <CodeBlock
                language="ts"
                code={`return [hook.memoizedState, setState] as [T, (value: T | ((prevState: T) => T)) => void];`}
            />
            <p className="mb-4">
                The hook returns the persistent shared state and its updater function.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Full implementation</h2>
            <CodeBlock language="ts" code={useStaticHookCode} />
        </DocsSection>
    );
};