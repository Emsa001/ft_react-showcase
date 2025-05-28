import React from "react";
import { DocsSection } from "../../../components/Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

export const UseLocalStorageHookDocs = () => {
    return (
        <DocsSection title="useLocalStorage Hook">
            <p className="text-base mb-4">
                This is a custom hook in <strong>ft_react</strong> for synchronizing state with the
                browser's <code>localStorage</code>. It allows components to persist values between
                page reloads, making it ideal for user preferences, form drafts, or caching
                lightweight data.
            </p>
            <p className="text-base mb-4">
                It is built on top of the <code>useStatic</code> hook, which preserves state across
                component unmounts and remounts. You can think of this as a minimal alternative to
                something like Zustand or Redux when you only need to persist shared state in
                localStorage.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">
                Step 1: Read the value from localStorage
            </h2>
            <CodeBlock
                language="ts"
                code={`function getStoredValue(): T {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.error(\`Error reading localStorage key "\${key}":\`, error);
        return initialValue;
    }
}`}
            />
            <p className="my-4">
                On first render, we try to read the value from <code>localStorage</code>. If the key
                doesn't exist or the parsing fails, we fall back to the provided{" "}
                <code>initialValue</code>.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">
                Step 2: Store the value using useStatic
            </h2>
            <CodeBlock
                language="ts"
                code={`const [storedValue, setStoredValue] = useStatic<T>(key, getStoredValue());`}
            />
            <p className="my-4">
                We use <code>useStatic</code> to create a shared state under the provided key. This
                ensures that multiple components using the same key can stay in sync. Unlike{" "}
                <code>useState</code>, this persists across unmounts.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Step 3: Wrap a custom setter</h2>
            <CodeBlock
                language="ts"
                code={`const setValue = (value: T) => {
    try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
        console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
};`}
            />
            <p className="my-4">
                The custom setter allows both direct values and updater functions (just like React’s{" "}
                <code>useState</code>). It updates the internal state <em>and</em> serializes the
                value to <code>localStorage</code>.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Final hook structure</h2>
            <CodeBlock
                language="ts"
                code={`function useLocalStorageHook<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useStatic<T>(key, getStoredValue());

    function getStoredValue(): T {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(\`Error reading localStorage key "\${key}":\`, error);
            return initialValue;
        }
    }

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(\`Error setting localStorage key "\${key}":\`, error);
        }
    };

    return [storedValue, setValue];
}`}
            />

            <p className="mt-4">
                The final hook returns the persisted value and a setter, just like{" "}
                <code>useState</code>, but it automatically syncs with <code>localStorage</code>{" "}
                under the given key.
            </p>
        </DocsSection>
    );
};
