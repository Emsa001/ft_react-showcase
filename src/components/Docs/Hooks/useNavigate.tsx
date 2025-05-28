import React from "react";
import { DocsSection } from "../../../components/Section/Docs";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

const useNavigateHookCode = `const useNavigateHook = () => {
    const navigate = (path: string, ...states: any) => {
        window.history.pushState(states, "", path);
        window.dispatchEvent(new Event("popstate"));
        setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
    };

    return navigate;
};`;

export const UseNavigateHookDocs = () => {
    return (
        <DocsSection title="useNavigate Hook">
            <p className="text-base mb-4">
                The <code>useNavigateHook</code> is a custom navigation utility for your{" "}
                <strong>ft_react</strong> app. It mimics the behavior of React Router’s{" "}
                <code>useNavigate</code> function by programmatically pushing a new route and
                triggering a re-render.
            </p>
            <p className="text-base mb-4">
                This hook is not part of standard React and is built specifically for the custom
                routing and rendering flow you’ve implemented. It uses the browser's{" "}
                <code>history.pushState</code> API and dispatches a <code>popstate</code> event
                manually to simulate native navigation behavior.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Hook behavior</h2>
            <p className="mb-2">
                Calling the returned <code>navigate</code> function will update the URL path,
                dispatch a <code>popstate</code> event to trigger the route handler, and reset the
                scroll position to the top of the page instantly.
            </p>

            <Divider />

            <h2 className="text-xl font-semibold mt-6 mb-2">Implementation</h2>
            <p className="mb-2">
                Here's the internal implementation of <code>useNavigateHook</code>. It's kept simple
                and synchronous for now, but can be extended with support for query params,
                transition effects, or confirmation dialogs.
            </p>

            <CodeBlock language="ts" code={useNavigateHookCode} />
        </DocsSection>
    );
};
