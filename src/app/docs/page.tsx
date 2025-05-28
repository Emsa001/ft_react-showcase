import React, { useState } from "react";

import { ComponentStructure } from "../../components/Docs/ComponentStructure";
import { SideBar } from "../../components/SideBar";
import { Footer } from "../../components/Footer";
import { sideBarItems } from "./data";

import { DocsIntroduction } from "../../components/Docs/Introduction";
import { UseStateHookDocs } from "../../components/Docs/Hooks/useState";
import { UseStaticHookDocs } from "../../components/Docs/Hooks/useStatic";
import { UseEffectHookDocs } from "../../components/Docs/Hooks/useEffect";
import { UseLocalStorageHookDocs } from "../../components/Docs/Hooks/useLocalStorage";
import { ComponentMount } from "../../components/Docs/ComponentMount";
import { ComponentUpdate } from "../../components/Docs/ComponentUpdate";
import { UseNavigateHookDocs } from "../../components/Docs/Hooks/useNavigate";
import { UseSyncExternalStoreHookDocs } from "../../components/Docs/Hooks/useSyncExternalStore";
import { UseRefHookDocs } from "../../components/Docs/Hooks/useRef";
import { UseContextHookDocs } from "../../components/Docs/Hooks/useContext";

export default function Docs({
    page1,
    page2,
    page3,
}: {
    page1?: string;
    page2?: string;
    page3?: string;
}) {
    const [isSideBarOpen, setSideBarOpen] = useState(true);

    let page = null;

    if (page1 === "hooks") {
        if (page2 === "use-context") page = <UseContextHookDocs />;
        else if (page2 === "use-effect") page = <UseEffectHookDocs />;
        else if (page2 === "use-local-storage") page = <UseLocalStorageHookDocs />;
        else if (page2 === "use-navigate") page = <UseNavigateHookDocs />;
        else if (page2 === "use-ref") page = <UseRefHookDocs />;
        else if (page2 === "use-state") page = <UseStateHookDocs />;
        else if (page2 === "use-static") page = <UseStaticHookDocs />;
        else if (page2 === "use-sync-external-store") page = <UseSyncExternalStoreHookDocs />;
        else
            page = (
                <div className="text-center text-2xl">Select a hook to view its documentation.</div>
            );
    } else if (page1 === "component-structure") page = <ComponentStructure />;
    else if (page1 === "component-mount") page = <ComponentMount />;
    else if (page1 === "component-update") page = <ComponentUpdate page={page2} />;
    else {
        page = <DocsIntroduction />;
    }

    const handleToggle = () => {
        setSideBarOpen((prev) => !prev);
    };

    return (
        <div className="pt-16 text-gray-300 overflow-x-hidden">
            <SideBar items={sideBarItems} isOpen={isSideBarOpen} toggle={handleToggle} />

            <div
                className={`w-[93vw] mx-auto flex flex-col items-center justify-center gap-8 min-h-[96vh] px-6 pt-6 transition-all duration-300 ease-in-out ${
                    isSideBarOpen ? 'ml-64' : 'ml-12 px-0 mr-12'
                } lg:ml-64`}
            >
                {page}
                <Footer />
            </div>
        </div>
    );
}
