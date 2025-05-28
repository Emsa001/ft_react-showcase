import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../Code";
import { Divider } from "../../../components/Divider";

const useEffectIntro = `useEffect is a hook that allows you to perform side effects in function components.

It takes two arguments:
1. A callback function containing the side effect logic.
2. An optional dependencies array that determines when the effect should re-run.

The effect runs after the component renders. If it returns a cleanup function, that function is run before the component unmounts or before the effect runs again.`;

const checkDependenciesChangedCode = `const checkDependenciesChanged = (prevDeps: TDependencyList, deps: TDependencyList): boolean => {
    if (prevDeps.length !== deps.length) {
        console.warn("The length of the dependencies array must remain consistent between renders.");
    }
    return deps.some((dep, index) => !Object.is(dep, prevDeps[index]));
};z`;

const useEffectHookCode = `function useEffectHook(callback: TEffectCallback, deps?: TDependencyList): void {
    const component = React.currentComponent;
    if (!component) {
        throw new Error("useEffect must be called inside a component render function");
    }

    const prevDeps = React.useRef<TDependencyList | undefined>(undefined);
    const cleanupRef = React.useRef<(() => void) | undefined>(undefined);
    const isFirstRender = React.useRef(true);

    const runEffect = () => setTimeout(() => {
        if (typeof cleanupRef.current === "function") {
            try {
                cleanupRef.current();
            } catch (err) {
                console.error("Error running cleanup:", err);
            }
            component.queueFunctions.delete(cleanupRef.current);
        }

        let cleanup: void | (() => void);
        try {
            cleanup = callback();
        } catch (err) {
            console.error("useEffectHook callback threw:", err);
            cleanup = undefined;
        }

        if (typeof cleanup === "function") {
            cleanupRef.current = cleanup;
            component.queueFunctions.add(cleanup);
        } else {
            cleanupRef.current = undefined;
        }
    }, 0);

    if (isFirstRender.current) {
        isFirstRender.current = false;
        runEffect();
    } else if (!deps || !prevDeps.current || checkDependenciesChanged(prevDeps.current, deps)) {
        runEffect();
    }

    prevDeps.current = deps;
}`;

export const UseEffectHookDocs = () => {
    return (
        <DocsSection title="useEffect Hook">
            <p className="text-base mb-4">
                This is a custom implementation of the standard React <code>useEffect</code> hook for <strong>ft_react</strong>. It follows the core ideas of the official React API, but is simplified.<br />If you're looking for detailed usage patterns, refer to the official docs:
                <a
                    href="https://react.dev/reference/react/useEffect"
                    className="text-blue-500 underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    React useEffect Documentation
                </a>
                .
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">How it works</h2>
            <p className="mb-4 whitespace-pre-line">{useEffectIntro}</p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Dependency Comparison</h2>
            <p className="mb-2">
                This helper function checks whether the dependency array has changed between
                renders. If so, the effect is re-run. It also warns if the array length changes,
                which is discouraged.
            </p>
            <CodeBlock language="ts" code={checkDependenciesChangedCode} />

            <h2 className="text-xl font-semibold mt-6 mb-2">useEffectHook Implementation</h2>
            <p className="mb-2">
                The hook tracks dependencies, manages cleanup functions, and ensures effects are
                triggered appropriately after render. Side effects are scheduled using{" "}
                <code>setTimeout</code> to simulate post-render execution.
            </p>
            <CodeBlock language="ts" code={useEffectHookCode} />
        </DocsSection>
    );
};
