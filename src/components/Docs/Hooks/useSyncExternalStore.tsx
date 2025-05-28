import React from 'react';
import { DocsSection } from '../../../components/Section/Docs';
import { CodeBlock } from '../../../components/Code';
import { Divider } from '../../../components/Divider';

const useSyncExternalStoreCode = `function useSyncExternalStoreMethod<T>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => T,
): T {
    const [state, setState] = React.useState(getSnapshot());
    const isMounted = React.useRef(false);

    React.useEffect(() => {
        isMounted.current = true;
        const checkForUpdates = () => {
            if (isMounted.current) {
                setState(getSnapshot);
            }
        };
        const unsubscribe = subscribe(checkForUpdates);
        return () => {
            isMounted.current = false;
            unsubscribe();
        };
    }, [subscribe, getSnapshot]);

    return state as T;
}`;

export const UseSyncExternalStoreHookDocs = () => {
    return (
        <DocsSection title="useSyncExternalStore Hook">
             <p className="text-base mb-4">
                This is a custom implementation of the standard React <code>useSyncExternalStore</code> hook for <strong>ft_react</strong>. It follows the core ideas of the official React API, but is simplified.<br />If you're looking for detailed usage patterns, refer to the official docs:
                <a
                    href="https://react.dev/reference/react/useSyncExternalStore"
                    className="text-blue-500 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React useSyncExternalStore Documentation
                </a>.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">How it works</h2>
            <ol className="list-decimal list-inside text-base mb-4">
                <li>Get the initial value from the store using <code>getSnapshot</code>.</li>
                <li>Subscribe to the store's updates using <code>subscribe</code>.</li>
                <li>On change, update the state using <code>setState(getSnapshot)</code>.</li>
                <li>Cleanup on unmount by calling the unsubscribe function.</li>
            </ol>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 1: Initialize internal state with the current snapshot</h2>
            <CodeBlock
                language="ts"
                code={`const [state, setState] = React.useState(getSnapshot());`}
            />
            <p className="my-4">
                When the hook is first called, we get the current value from the external store to render the initial UI.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 2: Track mounted status using a ref</h2>
            <CodeBlock
                language="ts"
                code={`const isMounted = React.useRef(false);`}
            />
            <p className="my-4">
                This ref helps prevent state updates after the component has been unmounted.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 3: Subscribe to changes with useEffect</h2>
            <CodeBlock
                language="ts"
                code={`React.useEffect(() => {
    isMounted.current = true;

    const checkForUpdates = () => {
        if (isMounted.current) {
            setState(getSnapshot);
        }
    };

    const unsubscribe = subscribe(checkForUpdates);

    return () => {
        isMounted.current = false;
        unsubscribe();
    };
}, [subscribe, getSnapshot]);`}
            />
            <p className="my-4">
                We set up a subscription that updates the component whenever the external store changes.
                The cleanup step makes sure we don't cause memory leaks or update an unmounted component.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 4: Return the latest value</h2>
            <CodeBlock
                language="ts"
                code={`return state as T;`}
            />
            <p className="my-4">
                The hook returns the most up-to-date snapshot of the external store.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Full implementation</h2>
            <CodeBlock language="ts" code={useSyncExternalStoreCode} />
        </DocsSection>
    );
};