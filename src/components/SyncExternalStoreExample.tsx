import React, { useState, useSyncExternalStore } from "react";
import { Section } from "./Section";

const code = `import { useSyncExternalStore } from 'react';  
// Subscribe function
const subscribe = (callback) => {
    const id = setInterval(callback, 1000);
    return () => clearInterval(id);
};

// Get snapshot
const getSnapshot = () => new Date().toLocaleTimeString();

// In component
const time = useSyncExternalStore(subscribe, getSnapshot);`;

const SyncExternalStoreExample = () => {
    const subscribe = (callback: () => void) => {
        const interval = setInterval(callback, 1000);
        return () => clearInterval(interval);
    };
    const getSnapshot = () => new Date().toLocaleTimeString();
    const time = useSyncExternalStore(subscribe, getSnapshot);

    const [isSubscribed, setIsSubscribed] = useState(true);

    const customSubscribe = (callback: () => void) => {
        if (!isSubscribed) return () => {};
        const interval = setInterval(callback, 1000);
        return () => clearInterval(interval);
    };

    const controlledTime = useSyncExternalStore(customSubscribe, getSnapshot);

    return (
        <div className="space-y-6 text-black dark:text-white">
            <div className="bg-cyan-100 dark:bg-cyan-900/20 p-6 rounded-lg border border-cyan-300 dark:border-cyan-800">
                <p className="text-gray-600 dark:text-gray-400 mb-2">External store time (always subscribed):</p>
                <p className="text-2xl font-mono text-cyan-400">{time}</p>
            </div>

            <div className="bg-gray-300 dark:bg-gray-800/50 p-6 rounded-lg">
                <div className="flex gap-2 items-center justify-between">
                    <p className="text-gray-600 dark:text-gray-400">Controlled subscription:</p>
                    {!isSubscribed && (
                        <span className="text-gray-500 text-xs">Subscription paused</span>
                    )}
                </div>
                <p className="text-2xl font-mono text-green-600 dark:text-green-400 mb-4">{controlledTime}</p>
                <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-6 py-3 rounded-lg transition-colors w-full ${
                        isSubscribed
                            ? "bg-gray-400 hover:bg-gray-500 dark:bg-gray-700 hover:dark:bg-gray-600"
                            : "bg-green-300 hover:bg-green-400  dark:bg-green-600 hover:dark:bg-green-700"
                    }`}
                >
                    {isSubscribed ? "Pause Updates" : "Resume Updates"}
                </button>
            </div>

            <div className="mt-4 p-4 bg-gray-300 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    useSyncExternalStore connects to external data sources. The example shows both
                    automatic and controlled subscriptions.
                </p>
            </div>
        </div>
    );
}

export const SyncExternalStoreSection = ({ reverse }: { reverse?: boolean }) => {
    return (
        <Section
            title="useSyncExternalStore"
            description="A recommended way to read and subscribe from external data sources in React 18+. It handles the edge cases of concurrent rendering and integrates with React's scheduling. Useful for: (1) Browser APIs (like geolocation), (2) Third-party state management, (3) Subscription-based data sources."
            code={code}
            reverse={reverse}
        >
            <SyncExternalStoreExample />
        </Section>
    );
}