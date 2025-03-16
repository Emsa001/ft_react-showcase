import { ElementProps, ReactComponentTree, ReactNode } from "react/types";
import { matchRoute } from "./match";
import Render from "react/render";
import React from "react/react";

export async function getPage(): Promise<ReactComponentTree | null> {
    const { route, params } = matchRoute(window.location.pathname);
    if (!route) {
        console.error("Page not found");
        return null;
    }

    const rootModule = await import("../../src/app/root");
    const pageModule = await route.module();

    let rootTree: ReactComponentTree = {
        name: rootModule.default.name.toLowerCase(),
        instance: null,
        parent: null,
        state: {
            hookIndex: 0,
            hookStates: [],
        },
        jsx: null,
    };
    Render.addComponent(rootTree.name, rootTree);

    const pageComponent = pageModule.default as (
        data: ElementProps
    ) => React.ReactNode;

    const root: React.ReactNode = rootModule.default({
        children: pageComponent({ params }),
    });

    rootTree.instance = root as unknown as ReactNode;
    rootTree.jsx = React.createElement(pageComponent as any, { params });

    Render.addComponent(rootTree.name, rootTree);

    // TODO: Fix root component, to include pageModule correctly

    return rootTree;
}

// export async function getComponentJSX(component: ReactComponentTree): Promise<ReactNode> {

// }
