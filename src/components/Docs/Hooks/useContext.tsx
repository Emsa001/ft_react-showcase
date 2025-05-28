import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

const ContextInterface = `interface Context {
    _currentValue: any;
    _defaultValue: any;
    _calledByProvider: boolean;
    subscriptions: Set<ReactComponentInstance>;
    _currentProvider: ReactComponentInstance | null;

    Provider: (props: { value?: any; children?: any }) => any;
}`;

const CreateContextFunction = `function createContextMethod<T>(defaultValue: T) {
    const context: Context = {
        _currentValue: defaultValue,
        _defaultValue: defaultValue,
        _calledByProvider: false,
        subscriptions: new Set<ReactComponentInstance>(),
        _currentProvider: null,
        Provider: ({ value, children }: { value?: T; children?: any }) => {
            context._currentValue = value !== undefined ? value : context._defaultValue;
            context._calledByProvider = true;
           
            context.subscriptions.forEach((instance: ReactComponentInstance) => {
                if (instance.isMounted) {
                    instance.isDirty = true;
                }
            });

            return children;
        },
    };
    return context;
}`;

const useContextHook = `function useContextHook(context: Context) {
    context.subscriptions.add(React.currentComponent!);

    return context._currentValue;
}`;

export const UseContextHookDocs = () => {
    return (
        <DocsSection title="useContext Hook">
            <p className="text-base mb-4">
                This is a custom implementation of the standard React <code>useContext</code> hook for <strong>ft_react</strong>. It follows the core ideas of the official React API, but is simplified.<br />If you're looking for detailed usage patterns, refer to the official docs:
                <a
                    href="https://react.dev/reference/react/useContext"
                    className="text-blue-500 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React useContext Documentation
                </a>
                .
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Context Interface</h2>
            <p className="mb-2">
                The context object stores the current value, a default fallback, and the list of
                components subscribed to this context. It also defines the <code>Provider</code>{" "}
                function that components can use to provide values to descendants.
            </p>
            <CodeBlock language="ts" code={ContextInterface} />

            <h2 className="text-xl font-semibold mt-6 mb-2">createContext implementation</h2>
            <p className="mb-2">
                This function initializes the context with a default value. The custom{" "}
                <code>Provider</code> updates the current value and marks subscribed components as
                dirty when the context changes.
            </p>
            <CodeBlock language="ts" code={CreateContextFunction} />

            <h2 className="text-xl font-semibold mt-6 mb-2">useContextHook implementation</h2>
            <p className="mb-2">
                When a component uses this hook, it registers itself as a subscriber to the context.
                It then accesses the current value from the context. On context updates, subscribers
                will re-render because they're marked as dirty.
            </p>
            <CodeBlock language="ts" code={useContextHook} />
        </DocsSection>
    );
};
