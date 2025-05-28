import React from "react";
import { CodeBlock } from "../../../components/Code";
import { renderVNode } from "./renderVNode";

const code = `const Test = () => {
    return <span>I'm a Test Component!</span>;
};

const Parent = () => {
    return (
        <div>
            <h1>I'm a Parent Component!</h1>
            <Test />
        </div>
    );
};`;

const vNode = `{
"type": "div",
"props": {},
"children": [
        {
                "type": "h1",
                "props": {
                        "children": ["I'm a Parent Component!"]
                },
                "children": ["I'm a Parent Component!"],
                "ref": {},
                "key": null
        },
        {
                "props": {},
                "children": [],
                "ref": null,
                "key": null,
                "componentName": "Test"
        }
],
"ref": {},
"key": null,
"componentName": "Parent"
}
`;

export const FunctionComponentExample = () => (
        <div>
                <p className="text-xl font-semibold mb-2">Function Components</p>
                <CodeBlock code={code} />
                <div className="mt-4">
                        {renderVNode("vNode of Parent component", vNode)}
                </div>
                <ul className="list-disc list-inside text-gray-200 text-sm my-4">
                        <li>
                                The <code>Test</code> component renders only if marked as dirty. Stateless
                                components that don't change are ignored in updates.
                        </li>
                </ul>
        </div>
);
