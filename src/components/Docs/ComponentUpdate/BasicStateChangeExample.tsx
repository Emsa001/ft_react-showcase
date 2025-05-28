import React from "react";
import { CodeBlock } from "../../../components/Code";
import { renderVNode } from "./renderVNode";

const code = `const MyComponent = () => {
  const [counter, setCounter] = useState(0);
  
  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Add</button>
    </div>
  );
};`;

const vNode = [
`{
    "type": "div",
    "props": {},
    "children": [
        {
            "type": "p",
            "props": {
                "children": ["Counter: ", 0]
            },
            "children": ["Counter: ", 0],
            "ref": {},
            "key": null
        },
        {
            "type": "button",
            "props": {
                "children": ["Add"]
            },
            "children": ["Add"],
            "ref": {},
            "key": null
        }
    ],
    "ref": {},
    "key": null,
    "componentName": "MyComponent"
}`,
];

export const BasicStateChangeExample = () => (
    <>
        <p className="text-xl font-semibold mb-2">Basic State Change</p>
        <CodeBlock code={code} />
        <div className="mt-4">
            {renderVNode("vNode provided from the component", vNode[0])}
        </div>
        <ul className="list-disc list-inside text-gray-200 text-sm my-4">
            <li>
                Only the <code>textNode</code> inside <code>&lt;p&gt;</code> should update.
            </li>
            <li>
                The <code>onClick</code> handler must be re-bound to get the latest state.
            </li>
        </ul>
    </>
);
