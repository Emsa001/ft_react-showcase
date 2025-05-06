import React, { useStatic } from "react";
import { Section } from "./Section";

const code = `// In any component:
const [value, setValue] = useStatic("shared-key", initialValue);

// In another component:
const [sameValue] = useStatic("shared-key"); // Gets the same value`;

const StaticExample = () => {
    const [value, setValue] = useStatic("shared-key", 0);
    return (
        <div className="space-y-6 text-black dark:text-white">
            <div className="bg-gray-300 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-400 mb-1">Current shared value:</p>
                <p className="text-3xl font-mono text-blue-900 dark:text-blue-400">{value}</p>
            </div>
            <div className="flex gap-4">
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
            </div>
            <p className="text-gray-500 text-sm mt-4">
                This value persists across all components using the same key.
            </p>
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
        >
            <StaticExample />
        </Section>
    );
};
