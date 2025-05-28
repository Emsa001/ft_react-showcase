import React, { useLocalStorage, useState } from "react";
import { ShowSection } from "../Section/Showcase";

const code = `
const [count, setCount] = useState(0);
const [theme, setTheme] = useLocalStorage("theme");

// useTheme.ts hook
export const useTheme = () => {
  // Get theme from localStorage or default to "dark"
  const [theme] = useLocalStorage("theme", "dark");
    
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // other theme-related logic
  }, [theme]);

  return null;
};

// use of counter
const increment = () => setCount((c) => c + 1);
const reset = () => setCount(0);

// use of theme toggle
const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
}
`;

const StatesExample = () => {
    const [count, setCount] = useState(0);
    const [theme, setTheme] = useLocalStorage("theme");

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
                            checked={theme === "dark"}
                            onChange={() =>
                                setTheme((prev: string) => (prev === "dark" ? "light" : "dark"))
                            }
                        />
                        <div
                            className={`w-10 h-4 rounded-full shadow-inner transition-colors ${
                                theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                            }`}
                        />
                        <div
                            className={`absolute w-6 h-6 rounded-full shadow -left-1 -top-1 transition-all ${
                                theme === "dark"
                                    ? "bg-blue-500 transform translate-x-6"
                                    : "bg-gray-300"
                            }`}
                        ></div>
                    </div>
                    <span className="dark:text-gray-300">Toggle dark mode effect</span>
                </label>
            </div>
        </div>
    );
};

export const StateEffectSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <ShowSection
            title="useState, useEffect & useLocalStorage"
            description="The most common hooks for managing state and side effects in React. useState allows you to declare state variables, while useEffect lets you perform side effects in function components."
            code={code}
            reverse={reverse}
        >
            <StatesExample />
            <div className="flex flex-col gap-4 text-sm mt-2 text-gray-500 dark:text-gray-400 mt-6">
                <p>
                    <span className="text-purple-500">useEffect</span> handles the side effect of
                    changing document classes
                </p>
                <p>
                    <span className="text-blue-500">useLocalStorage</span> is a custom hook that
                    simplifies working with localStorage, providing a way to persist state across
                    sessions. <br />
                    <span className="text-blue-500">useLocalStorage</span> works on top of{" "}
                    <span className="text-green-700 dark:text-green-400">useStatic</span>.
                </p>
            </div>
        </ShowSection>
    );
};
