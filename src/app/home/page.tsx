import React from "react";

import { ContextSection, DemoContext } from "../../components/ContextExample";
import { NavigateSection } from "../../components/NavigateExample";
import { RefSection } from "../../components/RefExample";
import { StateEffectSection } from "../../components/StateEffectExample";
import { StaticSection } from "../../components/StaticExample";
import { SyncExternalStoreSection } from "../../components/SyncExternalStoreExample";
import { Header } from "../../components/Header";

export default function Showcase() {
    return (
        <main className="bg-gradient-to-br from-blue-200 via-white to-purple-300 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 py-24 w-full">
            <div className="mx-auto pt-24">
                <Header />

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
        </main>
    );
}
