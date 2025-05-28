import React from "react";
import { CodeBlock } from "../../../components/Code";
import { renderVNode } from "./renderVNode";

const code = `const MyComponent = () => {
  const [isLogged, setLogged] = useState(false);
  
  if (isLogged) {
    return (
      <div>
        <h1>Hello to user Profile!</h1>
      </div>
    );
  }

  return (
    <div>
      <input type="text" placeholder="Your name" />
      <button onClick={() => setLogged(true)}>Sign In</button>
    </div>
  );
};`;

const vNode = [
    `{
    "type": "div",
    "props": {},
    "children": [
        {
            "type": "input",
            "props": {
                "type": "text",
                "placeholder": "Your name",
                "children": []
            },
            "children": [],
            "ref": {},
            "key": null
        },
        {
            "type": "button",
            "props": {
                "children": ["Sign In"]
            },
            "children": ["Sign In"],
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
            "type": "h1",
            "props": {
                "children": ["Hello to user Profile!"]
            },
            "children": ["Hello to user Profile!"],
            "ref": {},
            "key": null
        }
    ],
    "ref": {},
    "key": null,
    "componentName": "MyComponent"
}`,
];

export const DifferentTreesExample = () => (
    <div>
        <p className="text-xl font-semibold mb-2">Completely Different JSX Trees</p>
        <CodeBlock code={code} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {renderVNode(
                "Before login (isLogged is <span class='text-red-400'>false</span>)",
                vNode[0]
            )}
            {renderVNode(
                "After login (isLogged is <span class='text-green-400'>true</span>)",
                vNode[1]
            )}
        </div>
        <ul className="list-disc list-inside text-gray-200 text-sm my-4">
            <li>
                Switching between two completely different trees causes significant DOM updates,
                including mounting/unmounting of elements.
            </li>
        </ul>
    </div>
);
