import { ElementProps, ReactComponentTree, ReactElement, ReactNode } from "react/types";
// import { matchRoute } from "./match";
import Render from "react/render";
import React from "react/react";

export async function getPage(): Promise<ReactComponentTree | null> {
    const rootModule = await import("../../src/app/root");

    let rootTree: ReactComponentTree = {
        name: rootModule.default.name.toLowerCase(),
        instance: null,
        keys: new Map(),
        state: {
            hookIndex: 0,
            hookStates: [],
        },
        jsx: null,
    };
    Render.addComponent(rootTree.name, rootTree);

    const root: React.ReactNode = rootModule.default();
    rootTree.instance = root as unknown as ReactNode;
    rootTree.jsx = React.createElement(root as any, {});

    Render.addComponent(rootTree.name, rootTree);

    return rootTree;
}