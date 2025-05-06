import React, { useNavigate, useState } from "react";
import { Section } from "./Section";

const code = `import { useNavigate } from 'react-router-dom';
function Component() {
    const navigate = useNavigate();
    
    // Absolute path
    navigate('/users');
    
    // Relative path
    navigate('../parent');
    
    // With state
    navigate('/user', { state: { id: 123 } });
}`;

const NavigateExample = () => {
    const navigate = useNavigate();
    const [route, setRoute] = useState("/memes");

    return (
        <div className="space-y-6 text-black dark:text-white">
            <div className="bg-gray-300 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Enter route to navigate:</p>
                <input
                    value={route}
                    onChange={(e: any) => setRoute(e.target.value)}
                    className="bg-gray-500 dark:bg-gray-700 text-white p-2 rounded w-full mb-2"
                    placeholder="/some-route"
                />
            </div>
            <button
                onClick={() => navigate(route)}
                className="bg-orange-300 hover:bg-orange-400 dark:bg-orange-600 hover:dark:bg-orange-700 px-6 py-3 rounded-lg transition-colors w-full"
            >
                Navigate to {route || "..."}
            </button>

            <div className="mt-4 p-4 bg-gray-300 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    useNavigate enables programmatic navigation in React Router. Try entering
                    different routes like "/users" or "/settings".
                </p>
            </div>
        </div>
    );
};

export const NavigateSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useNavigate"
            description="Enables programmatic navigation in React Router applications. Returns a function that lets you navigate programmatically, with support for relative navigation, state, and other routing features. The example lets you test different routes."
            code={code}
            reverse={reverse}
        >
            <NavigateExample />
        </Section>
    );
};
