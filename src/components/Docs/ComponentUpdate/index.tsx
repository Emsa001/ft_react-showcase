import React from "react";

import { Divider } from "../../../components/Divider";

import { DocsSection } from "../../../components/Section/Docs";
import { UpdateExplanation } from "./UpdateExplanation";
import { BasicStateChangeExample } from "./BasicStateChangeExample";
import { ConditionalRenderingExample } from "./ConditionalRenderingExample";
import { DifferentTreesExample } from "./DifferentTreesExample";
import { FunctionComponentExample } from "./FunctionComponentExample";
import { UpdateImplementation } from "./Implementation";

export const ComponentUpdate = ({ page }: { page?: string }) => {

    if(page === "implementation") {
        return <UpdateImplementation />
    }

    return (
        <DocsSection title="Component Update">
            <UpdateExplanation />
            <Divider />
            <BasicStateChangeExample />
            <Divider />
            <ConditionalRenderingExample />
            <Divider />
            <DifferentTreesExample />
            <Divider />
            <FunctionComponentExample />
        </DocsSection>
    );
};
