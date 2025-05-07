import React from "react";

import { ContextSection, DemoContext } from "./Features/ContextExample";
import { NavigateSection } from "./Features/NavigateExample";
import { RefSection } from "./Features/RefExample";
import { StateEffectSection } from "./Features/StateEffectExample";
import { StaticSection } from "./Features/StaticExample";
import { SyncExternalStoreSection } from "./Features/SyncExternalStoreExample";

export const Features = () => {
    return (
        <div className="mt-64">
            <h1 className="text-center text-5xl uppercase font-black tracking-widest text-gray-800 dark:text-white mb-32">
                Features
            </h1>
            <DemoContext.Provider value="I rewrote this 3 times">
                <div className="flex flex-col gap-48 items-center justify-between4 w-screen">
                    <StaticSection />
                    <StateEffectSection reverse />
                    <RefSection />

                    <ContextSection reverse />
                    <NavigateSection />
                    <SyncExternalStoreSection reverse />
                </div>
            </DemoContext.Provider>
        </div>
    );
};
