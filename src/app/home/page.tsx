import React from "react";

import { ContextSection, DemoContext } from "../../components/ContextExample";
import { NavigateSection } from "../../components/NavigateExample";
import { NavMenu } from "../../components/NavMenu";
import { RefSection } from "../../components/RefExample";
import { StateEffectSection } from "../../components/StateEffectExample";
import { StaticSection } from "../../components/StaticExample";
import { SyncExternalStoreSection } from "../../components/SyncExternalStoreExample";
import { Header } from "../../components/Header";

export default function Showcase() {
    return (
        <div className="bg-white dark:bg-gray-950 text-gray-100 min-h-screen">
            <NavMenu />

            <main className="bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto pt-64">
                    <Header />

                    <DemoContext.Provider value="Hello from Context (try changing this in the provider)!">
                        <div className="flex flex-col items-center justify-between">
                            <StaticSection />
                            <StateEffectSection reverse />
                            <RefSection />
                            <ContextSection reverse/>
                            <NavigateSection />
                            <SyncExternalStoreSection reverse />
                        </div>
                    </DemoContext.Provider>
                </div>
            </main>

            <footer className="py-12 border-t border-gray-800 mt-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-500 mb-4">
                        ft_react Hook Library · MIT Licensed · v1.0.0
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Documentation
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            Examples
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            NPM
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
