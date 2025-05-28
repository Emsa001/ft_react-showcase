import React from "react";
import { DocsSection } from "../../../components/Section/Docs";
import { CodeBlock } from "../../Code";
import { Divider } from "../../../components/Divider";

const CODE_updateSchedule = `async function updateSchedule(component: ReactComponentInstance, states: Hook[]) {
    await Promise.resolve().then(async () => {
        states.forEach((hook) => processQueue(hook));

        React.currentComponent = component;
        component.hookIndex = 0;

        if (typeof component.jsx?.type !== "function")
            throw new Error("Invalid component type");

        if (!component.vNode?.ref)
            throw new Error("Component ref is null, something is very wrong here :|");

        const newNode = component.jsx?.type(component.jsx.props, ...component.jsx.children);
        newNode.componentName = component.name;

        if (newNode && component.vNode) {
            update({
                oldNode: component.vNode,
                newNode,
                ref: component.vNode.ref,
                parent: component.vNode.ref!.parentElement,
                index: 0,
                name: component.name,
            });
            component.vNode = newNode;
            component.onUpdate();
        }
    });
}
`;

const CODE_updateFunction = `async function update({ oldNode, newNode, ref, parent, index, name }) {
    // 1. If both nodes are arrays, delegate to array diffing logic.
    if (Array.isArray(oldNode) && Array.isArray(newNode)) return updateArray(...);

    // 2. Handle cases where nodes are undefined or null (mounting or removal).
    if (updateUndefined(...)) return;

    // 3. Handle boolean nodes (show/hide logic).
    if (await updateBoolean(...)) return;

    // 4. Handle primitive value changes (text, numbers).
    if (updatePrimitive(...)) return;

    // 5. If node types differ (e.g., <div> vs <span>), replace the node.
    if (updateDifferentTypes(...)) return;

    // 6. Recursively update function components.
    if (await updateFunctionComponent(...)) return;

    // 7. If object types differ (e.g., DOM element vs component), replace node.
    if (updateDifferentObjectTypes(...)) return;

    // 8. For DOM elements, diff props and recursively update children.
    await updateElement(...);
}`;

const CODE_updateElement = `const updateElement = async (
    oldNode: ReactElement,
    newNode: ReactElement,
    ref: Element | null,
    name: string
) => {
    const oldProps = oldNode.props || {};
    const newProps = newNode.props || {};

    for (const [key, value] of Object.entries(newProps)) {
        if(oldProps[key] === value) continue;
        setProps({ ref: ref!, key, value });
    }

    for (const key of Object.keys(oldProps)) {
        if (!(key in newProps)) {
            removeProp({ ref: ref!, key });
        }
    }

    newNode.ref = ref;

    let realIndex = 0;
    if (Array.isArray(oldNode.children) && Array.isArray(newNode.children)) {
        for (let i = 0; i < Math.max(oldNode.children.length, newNode.children.length); i++) {
            const newChild = newNode.children[i];
            const oldChild = oldNode.children[i];
            
            const childRef =
                oldChild?.ref ||
                newChild?.ref ||
                (oldNode.ref?.childNodes[realIndex] as HTMLElement | null);

            if (newChild && oldChild) {
                realIndex++;
                prevNodeRef = childRef;
            }

            await update({
                oldNode: oldChild,
                newNode: newChild,
                ref: childRef,
                parent: ref,
                index: realIndex,
                name,
            });
        }
    }

    return true;
};`;

export const UpdateImplementation = () => {
    return (
        <DocsSection title="Component Update">
            <div className="mb-6 space-y-3">
                <p className="font-bold">
                    Component updates are first going through the <code>updateSchedule()</code>{" "}
                    function, which recalculates the component’s VNode and diffs it against the
                    previous one.
                </p>
                <ul className="list-decimal list-inside space-y-1">
                    <li>Resolve and apply state updates via the hook queue.</li>
                    <li>Recompute the component JSX tree.</li>
                    <li>Perform a VNode diff between the old and new trees.</li>
                    <li>
                        Apply DOM updates through <code>update()</code>.
                    </li>
                    <li>
                        Invoke <code>onUpdate()</code> lifecycle.
                    </li>
                </ul>
            </div>

            <div className="mb-3 text-sm text-gray-400 space-y-2">
                <p>
                    The update process begins with the <code>updateSchedule()</code> function. This
                    function sets the current component context and recalculates the VNode:
                </p>
            </div>

            <CodeBlock code={CODE_updateSchedule} />
            <Divider />

            <div className="mb-3 text-gray-400 space-y-2">
                The core DOM diffing and patching logic is handled by the <code>update()</code>{" "}
                function. It handles everything from primitives and booleans to full component
                trees:
            </div>
            <div className="mb-3 space-y-2 font-bold text-lg">
                The update steps follow a top-down recursive diffing strategy, organized as follows:
            </div>

            <ul className="list-decimal list-inside space-y-1">
                <li>Handle array vs array updates</li>
                <li>Handle null/undefined removal or mounting</li>
                <li>Handle boolean values</li>
                <li>Handle primitive changes</li>
                <li>Check for type mismatches</li>
                <li>Recursively update function components</li>
                <li>Replace if object types differ</li>
                <li>Apply DOM prop diffs and recursively update children</li>
            </ul>
            <Divider />
            <CodeBlock code={CODE_updateFunction} />
            <Divider />

            <div className="mb-3 text-sm text-gray-400 space-y-2">
                <h3 className="font-semibold text-xl text-gray-200">
                    What is <code>updateElement</code> and how does it work
                </h3>
                <p>
                    <code>updateElement</code> is getting executed whtn the VNode is a DOM element,
                    just like in <code>mount()</code>. it takes care of following things:
                </p>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        <span className="font-semibold">Props Diffing and Patching:</span> Compares
                        old and new props. For each changed or new prop, <code>setProps</code> is
                        called. Removed props are handled by <code>removeProp</code>.
                    </li>
                    <li>
                        <span className="font-semibold">Ref Assignment:</span> The new VNode’s{" "}
                        <code>ref</code> is set to the actual DOM element.
                    </li>
                    <li>
                        <span className="font-semibold">Children Diffing and Recursion:</span> If
                        both old and new VNodes have children arrays, it loops through them,
                        determines the correct DOM reference for each child, and recursively calls{" "}
                        <code>update</code> for each child. This ensures only changed children are
                        updated.
                    </li>
                </ul>
            </div>

            <CodeBlock code={CODE_updateElement} />
        </DocsSection>
    );
};
