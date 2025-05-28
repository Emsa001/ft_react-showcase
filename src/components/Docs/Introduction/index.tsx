import React from "react";
import { DocsHeader } from "./Header";
import { DocsTech } from "./Tech";
import { DocsGoals } from "./Goals";
import { DocsSection } from "../../../components/Section/Docs";
import { Divider } from "../../../components/Divider";

export const DocsIntroduction = () => {
    return (
        <DocsSection title="ft_react — My Own React Implementation">
            <div className="grid gap-12">
                <DocsHeader />
                <Divider />
                <DocsTech />
                <Divider />
                <DocsGoals />
            </div>
        </DocsSection>
    );
};