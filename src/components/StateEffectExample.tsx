import React, { useEffect, useState } from "react";
import { Section } from "./Section";

const code = `// State declaration
const [count, setCount] = useState(0);
const [darkMode, setDarkMode] = useState(false);

// Effect that runs when darkMode changes
useEffect(() => {
  document.body.classList.toggle('dark', darkMode);
  return () => document.body.classList.remove('dark');
}, [darkMode]);`;

const StateEffectExample = () => {
    const [count, setCount] = useState(0);
    const [isDark, setIsDark] = useState<boolean>(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("isDark");
        if (savedTheme) {
            setIsDark(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        // Set attribute data-theme="dark" or "light"
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        // Save the current theme to localStorage
        localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);

    return (
        <div className="space-y-6 text-black dark:text-white">
            <div className="bg-gray-300 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-400 mb-1">Current count:</p>
                <p className="text-3xl font-mono text-purple-900 dark:text-purple-400">{count}</p>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="bg-purple-300 hover:bg-purple-400 dark:bg-purple-600 hover:dark:bg-purple-700 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Increment
                </button>
                <button
                    onClick={() => setCount(0)}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-600 px-6 py-3 rounded-lg transition-colors flex-1"
                >
                    Reset
                </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={isDark}
                            onChange={() => setIsDark(!isDark)}
                        />
                        <div
                            className={`w-10 h-4 rounded-full shadow-inner transition-colors ${
                                isDark ? "bg-gray-600" : "bg-gray-400"
                            }`}
                        ></div>
                        <div
                            className={`absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition-all ${
                                isDark ? "bg-blue-500 transform translate-x-6" : "bg-gray-300"
                            }`}
                        ></div>
                    </div>
                    <span className="dark:text-gray-300">Toggle dark mode effect</span>
                </label>
                <p className="text-gray-500 text-sm mt-2">
                    useEffect handles the side effect of changing document classes
                </p>
            </div>
        </div>
    );
};

export const StateEffectSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useState & useEffect"
            description="The most common hooks for managing state and side effects in React. useState allows you to declare state variables, while useEffect lets you perform side effects in function components."
            code={code}
            reverse={reverse}
        >
            <StateEffectExample />
        </Section>
    );
};
