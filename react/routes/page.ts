import { ElementProps, ReactComponentTree, ReactNode } from "react/types";
import { matchRoute } from "./match";

export async function getPage(): Promise<ReactComponentTree | null> {
    const { route, params } = matchRoute(window.location.pathname);
    if (!route) {
        console.error("Page not found");
        return null;
    }

    const rootModule = await import("../../src/app/root");
    const pageModule = await route.module();

    const pageComponent = pageModule.default as (data: ElementProps) => React.ReactNode;

    const root: React.ReactNode = rootModule.default({
        children: pageComponent({ params }),
    });

    const rootTree: ReactComponentTree = {
        name: rootModule.default.name.toLowerCase(),
        instance: root as unknown as ReactNode,
        parent: null,
        state: {
            hookIndex: 0,
            hookStates: []
        }
    };

    return rootTree;
}