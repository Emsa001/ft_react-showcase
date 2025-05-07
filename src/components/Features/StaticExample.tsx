import React, { useState, useStatic } from "react";
import { Section } from "../Section";

const code = `// In any component:
const [value, setValue] = useStatic("shared-key", initialValue);

// In another component:
const [sameValue, setValue] = useStatic("shared-key"); // Gets the same value`;

const TestComponent1 = () => {
    const [value] = useStatic("shared-key");

    return (
        <div>
            <h1>Test Component 1: </h1>
            <div className="bg-gray-300 dark:bg-gray-800/50 p-4 rounded-lg mt-2">
                <p className="text-gray-700 dark:text-gray-400 mb-1">Current shared value:</p>
                <p className="text-3xl font-mono text-blue-900 dark:text-blue-400">{value}</p>
            </div>
        </div>
    );
};

const TestComponent2 = () => {
    const [value] = useStatic("shared-key");

    return (
        <div>
            <h1>Test Component 2: </h1>
            <div className="bg-gray-300 dark:bg-gray-800/50 p-4 rounded-lg mt-2">
                <p className="text-gray-700 dark:text-gray-400 mb-1">Current shared value:</p>
                <p className="text-3xl font-mono text-blue-900 dark:text-blue-400">{value}</p>
            </div>
        </div>
    );
};

const StaticExample = () => {
    const [value, setValue] = useStatic("shared-key", 0);
    const [mount, setMount] = useState(true);

    return (
        <div className="space-y-6 text-black dark:text-white">
            {mount && (
                <>
                    <TestComponent1 />
                    <TestComponent2 />
                </>
            )}

            <p className="text-gray-500 text-sm mt-4">
                This value persists across all components using the same key.
            </p>

            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => setValue((v) => v + 1)}
                    className="bg-blue-300 hover:bg-blue-400 dark:bg-blue-600 hover:dark:bg-blue-700 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Increment
                </button>
                <button
                    onClick={() => setValue(0)}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Reset
                </button>
                <button
                    onClick={() => setMount((m) => !m)}
                    className="bg-red-300 hover:bg-red-400 dark:bg-red-500 hover:dark:bg-red-600 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    {mount ? "Unmount" : "Mount"}
                </button>
            </div>
        </div>
    );
};

export const StaticSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useStatic"
            description="Provides a way to share state across components without context. The state persists between components and updates all instances when changed. Useful for global settings, feature flags, or any shared mutable state that doesn't need the overhead of context providers."
            code={code}
            reverse={reverse}
            footer="useStatic keeps the state in memory, it will persist across component unmounts and remounts."
        >
            <StaticExample />
        </Section>
    );
};
