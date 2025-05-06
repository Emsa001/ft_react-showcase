import React, { createContext, useContext, useState } from "react";
import { Section } from "./Section";

export const DemoContext = createContext("default value");

const code = `// 1. Create context
const MyContext = createContext(defaultValue);

// 2. Provide context value
<MyContext.Provider value={someValue}>
  <ChildComponent />
</MyContext.Provider>

// 3. Consume in any child
const value = useContext(MyContext);`;

const ContextExample = () => {
    const value = useContext(DemoContext);
    const [localValue, setLocalValue] = useState("Try editing me!");

    return (
        <div className="space-y-6 text-black dark:text-white">
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Context value (read-only):</p>
                <p className="text-xl font-mono text-indigo-800 dark:text-indigo-400 break-all">{value}</p>
            </div>

            <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Local state (editable):</p>
                <input
                    value={localValue}
                    onChange={(e: any) => setLocalValue(e.target.value)}
                    className="bg-gray-500 dark:bg-gray-700 text-white p-2 rounded w-full mb-2"
                />
                <p className="text-gray-500 text-sm">
                    This demonstrates the difference between context (global) and state (local)
                </p>
            </div>
        </div>
    );
}

export const ContextSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useContext"
            description="Provides access to context values without prop drilling. Context is designed to share data that can be considered 'global' for a tree of React components. The example contrasts context (read-only shared value) with local state (editable within component)."
            code={code}
            reverse={reverse}
        >
            <ContextExample />
        </Section>
    );
}
