import React from "react";

import { ContextSection, DemoContext } from "./ContextExample";
import { NavigateSection } from "./NavigateExample";
import { RefSection } from "./RefExample";
import { StateEffectSection } from "./StateEffectExample";
import { StaticSection } from "./StaticExample";
import { SyncExternalStoreSection } from "./SyncExternalStoreExample";

export const Features = () => {
    return (
        <div className="mt-64">
            <h1 className="text-center text-5xl uppercase font-black tracking-widest text-gray-800 dark:text-white mb-32">
                Features
            </h1>
            <DemoContext.Provider value="Hello from Context (try changing this in the provider)!">
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
