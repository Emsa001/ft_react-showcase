import React, { useRef, useState } from "react";
import { Section } from "../Section";

const code = `// Create ref
const inputRef = useRef<HTMLInputElement>(null);

// Attach to DOM element
<input ref={inputRef} />

// Use in event handler
const handleClick = () => {
  inputRef.current?.focus();
};`;

const RefExample = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [value, setValue] = useState("");

    return (
        <div className="space-y-6 text-black dark:text-white">
            <div>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    className="bg-gray-300 dark:bg-gray-800 p-3 rounded-lg w-full border border-gray-400 dark:border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Type something..."
                />
                <p className="text-gray-500 text-sm mt-2">Character count: {value.length}</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => inputRef.current?.focus()}
                    className="bg-green-300 hover:bg-green-400 dark:bg-green-600 hover:dark:bg-green-700 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Focus
                </button>
                <button
                    onClick={() => setValue("")}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Reset
                </button>
            </div>
            <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    useRef gives direct access to DOM elements without re-renders when the ref
                    changes.
                </p>
            </div>
        </div>
    );
}


export const RefSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useRef"
            description="Creates a mutable ref object that persists for the lifetime of the component. The .current property can hold any value. Commonly used to:<br />1. Access DOM elements directly.<br />2. Store mutable values that don't trigger re-renders when changed.<br />3. Keep track of previous values. The example shows DOM access and demonstrates that changing refs doesn't cause re-renders."
            code={code}
            reverse={reverse}
        >
            <RefExample />
        </Section>
    );
};