import React from "react";
import { DocsSection } from "../../Section/Docs";
import { CodeBlock } from "../../Code";
import { Divider } from "../../../components/Divider";

import { CODE_createComponentInstanceMethod, CODE_ReactComponentInstance } from "./code";
import { ComponentLifecycle } from "./lifecycle";

export const ComponentStructure = () => {
    return (
        <DocsSection title="Component Structure">
            <div className="mb-6 space-y-3">
                <h3 className="font-bold text-xl">Component Structure</h3>
                <p className="max-w-4xl">
                    At the core of ft_react is a system that creates and manages components based on
                    a virtual DOM structure generated from JSX. Each mounted component is stored
                    inside the <code>ft_react</code> class, making it accessible globally.
                </p>
                <p>Each component is represented by an object with the following interface:</p>
            </div>
            <CodeBlock code={CODE_ReactComponentInstance} />
            <div className="my-6">
                <h2 className="text-xl font-bold">Key Flags</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <code>isMounted</code>: Used to check if the component is active.
                    </li>
                    <li>
                        <code>isDirty</code>: Indicates whether a component needs to be re-rendered.
                        This helps avoid redundant renders.
                    </li>
                </ul>
            </div>
            <div className="my-3">
                <h2 className="text-xl font-bold">Virtual DOM vs JSX</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>
                        <code>vNode</code>: The current virtual DOM tree of the component.
                    </li>
                    <li>
                        <code>jsx</code>: The original JSX function used to generate the virtual DOM
                    </li>
                </ul>
                <span className="text-gray-400">Both are of type <code>VNode</code>, but only <code>jsx</code> is always a function.</span>
            </div>
            <Divider />

            <h2 className="text-xl font-bold">Component Instance Creation</h2>

            <div className="space-y-2 my-3">
                <p>
                    The <code>createComponentInstanceMethod</code> function is responsible for
                    creating these instances when a component is rendered. It ensures that each
                    component has a unique name and initializes its state.
                </p>
                <p>
                    This method is crucial for managing the lifecycle of components, especially that components can be mounted, updated, and unmounted dynamically.
                </p>
            </div>
            <Divider />
            <CodeBlock code={CODE_createComponentInstanceMethod} />
            <Divider />
            <ComponentLifecycle />
        </DocsSection>
    );
};
