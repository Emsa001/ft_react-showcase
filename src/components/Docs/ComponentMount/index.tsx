import React from "react";
import { DocsSection } from "../../../components/Section/Docs";
import { CodeBlock } from "../../Code";
import { Divider } from "../../../components/Divider";

import { CODE_mountFunction, CODE_mountElementVNode, CODE_addToDom } from "./code";

export const ComponentMount = () => {
    return (
        <DocsSection title="Component Mount">
            <div className="mb-6 space-y-3">
                <p>Mounting is a phase in which the virtual DOM is converted into the real DOM. This is the initial step where the UI is rendered for the first time, and each component begins its lifecycle.</p>
                <p className="font-bold">
                    I've implemented the mounting processes by following following those seven steps:
                </p>
                <ul className="list-decimal list-inside space-y-1">
                    <li>
                        Check if the element is <code>null</code> or <code>undefined</code>.
                    </li>
                    <li>Check if it's an <code>array</code>.</li>
                    <li>
                        Check if it's a primitive value (<code>string</code>, <code>number</code>).
                    </li>
                    <li>
                        Check if it's a <code>boolean</code> (for conditional rendering).
                    </li>
                    <li>
                        Check if it's a <code>function</code> (a component).
                    </li>
                    <li>Recursively apply these steps to children.</li>
                    <li>Add the element to DOM</li>
                </ul>
            </div>

            <div className="mb-3 text-sm text-gray-500 space-y-2">
                <p>
                    The mounting process is initiated by the <code>mount()</code> function, which
                    checks the type of the VNode and calls the appropriate mounting method:
                </p>
            </div>

            <CodeBlock code={CODE_mountFunction} />
            <Divider />

            <div className="mb-3 text-sm text-gray-500 space-y-2">
                <p>
                    When the VNode is a native DOM element (e.g., <code>div</code>, <code>svg</code>
                    , <code>button</code>
                    ), it is handled by <code>mountElementVNode()</code>. This method creates the
                    element, applies its props, mounts its children, and finally inserts it into the
                    DOM:
                </p>
            </div>

            <CodeBlock code={CODE_mountElementVNode} />
            <Divider />

            <div className="mb-3 text-sm text-gray-500 space-y-2">
                <p>
                    All DOM insertions are handled by the utility function <code>addToDom()</code>,
                    which takes into account various mounting modes such as <code>append</code>,{" "}
                    <code>replace</code>,<code>before</code>, and <code>after</code>:
                </p>
            </div>

            <CodeBlock code={CODE_addToDom} />
        </DocsSection>
    );
};
