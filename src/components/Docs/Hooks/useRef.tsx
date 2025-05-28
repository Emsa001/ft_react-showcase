import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

const useRefHookCode = `function useRefHook<T>(initialValue: T) {
    return React.useState({ current: initialValue })[0];
};`;

export const UseRefHookDocs = () => {
    return (
        <DocsSection title="useRef Hook">
            <p className="text-base mb-4">
                This is a simple custom implementation of the <code>useRef</code> hook for{" "}
                <strong>ft_react</strong>. It returns a mutable object with a <code>current</code>{" "}
                property that persists across renders.
            </p>
            <p className="text-base mb-4">
                Internally, it is built on top of the custom <code>useState</code>, by storing an
                object with a <code>current</code> property as state and returning that object.
            </p>
            <p className="text-base">
                If you're looking for detailed usage patterns, refer to the official docs:
                <a
                    href="https://react.dev/reference/react/useRef"
                    className="text-blue-500 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React useRef Documentation
                </a>
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">useRefHook implementation</h2>
            <p className="mb-2">
                The hook simply wraps <code>useStateHook</code> to provide a persistent reference
                object.
            </p>
            <CodeBlock language="ts" code={useRefHookCode} />
        </DocsSection>
    );
};
