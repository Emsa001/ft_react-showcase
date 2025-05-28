import React from "react";
import { CodeBlock } from "../../../components/Code";
import { renderVNode } from "./renderVNode";

const code = `const MyComponent = () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div>
      {visible && <p>Hello World!</p>}
      <button onClick={() => setVisible(!visible)}>Toggle</button>
    </div>
  );
};`;

const vNode = [
`{
  "type": "div",
  "props": { },
  "children": [
    false,
    {
      "type": "button",
      "props": {
        "children": [
          "Toggle"
        ]
      },
      "children": [
        "Toggle"
      ],
      "ref": {},
      "key": null
    }
  ],
  "ref": {},
  "key": null,
  "componentName": "MyComponent"
}`,
    `{
    "type": "div",
    "props": {},
    "children": [
        {
            "type": "p",
            "props": {
                "children": ["Hello World!"]
            },
            "children": ["Hello World!"],
            "ref": {},
            "key": null
        },
        {
            "type": "button",
            "props": {
                "children": ["Toggle"]
            },
            "children": ["Toggle"],
            "ref": {},
            "key": null
        }
    ],
    "ref": {},
    "key": null,
    "componentName": "MyComponent"
}`,
];

export const ConditionalRenderingExample = () => (
    <div>
        <p className="text-xl font-semibold mb-2">Conditional Rendering (Boolean)</p>
        <CodeBlock code={code} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {renderVNode("When visible is <span class='text-red-400'>false</span>", vNode[0])}
            {renderVNode("When visible is <span class='text-green-400'>true</span>", vNode[1])}
        </div>
        <ul className="list-disc list-inside text-gray-200 text-sm my-4">
            <li>
                If the <code>visible</code> state changes, the <code>&lt;p&gt;</code> node may
                appear or disappear. This triggers a type change in the vDOM, which causes a full
                remount of the node.
            </li>
        </ul>
    </div>
);
