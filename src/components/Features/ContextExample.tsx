import React, { createContext, useContext } from "react";
import { Section } from "../Section";

export const DemoContext = createContext("default value");

const code = `// 1. Create context
const DemoContext = createContext("default value");

// 2. Provide context value
<DemoContext.Provider value="I rewrote this 3 times">
  <ContextExample1 />
  <ContextExample2 />
</DemoContext.Provider>

// 3. Consume in any child
const value = useContext(DemoContext);`;

const ContextExample1 = () => {
    const value = useContext(DemoContext);

    return (
        <div className="space-y-6 text-black dark:text-white">
            <h3>ContextExample 1</h3>
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Context value accessed from component 1:</p>
                <p className="text-xl font-mono text-indigo-800 dark:text-indigo-400 break-all">{value}</p>
            </div>
        </div>
    );
}

const ContextExample2 = () => {
    const value = useContext(DemoContext);

    return (
        <div className="space-y-6 text-black dark:text-white mt-6">
            <h3>ContextExample 2</h3>
            <div className="bg-indigo-100 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Context value accessed from component:</p>
                <p className="text-xl font-mono text-indigo-800 dark:text-indigo-400 break-all">{value}</p>
            </div>
        </div>
    );
}


export const ContextSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useContext"
            description="Provides access to context values without prop drilling. Context is designed to share data that can be considered 'global' for a tree of components. The example contrasts context (read-only shared value)."
            code={code}
            reverse={reverse}
        >
            <ContextExample1 />
            <ContextExample2 />
            <p className="text-gray-400 mt-6 text-sm">Yes, I  did rewrite this project 3 times, each with new approach and hope.</p>
        </Section>
    );
}
