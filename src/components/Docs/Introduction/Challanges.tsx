import React from "react";

export const DocsChallenges = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold">Challenges & Lessons Learned</h2>
            <ul className="list-disc ml-6 text-gray-300">
                <li>
                    Managing state across component trees without a reconciler like React Fiber was
                    tricky. Especially when figuring out what to re-render, and how to manage DOM.
                </li>
                <li>
                    Render JSX to HTML efficiently required building a custom virtual DOM system. I
                    had to implement a diffing algorithm that could handle nested components, lists,
                    and dynamic updates.
                </li>
                <li>
                    Implementing hooks like <code>useEffect</code> and <code>useState</code>{" "}
                    correctly required building a reliable internal dispatcher and component
                    instance model. These hooks are foundational, as many other hooks depend on
                    them.
                </li>
                <li>
                    Debugging was a nightmare at times. Recursive rendering and uncontrolled state
                    updates led to render loops where finding the root cause was often harder than
                    the actual fix.
                </li>
                <li>
                    Writing a minimal router system and managing navigation state without React
                    Router taught me a lot about browser APIs like <code>history.pushState</code>,{" "}
                    <code>popstate</code> events, and URL parsing.
                </li>
                <li>
                    Developing hot module replacement (HMR) support made me realize how difficult it
                    is to maintain internal state and component identity across reloads. This is
                    still a work-in-progress, as currently HMR rerenders full app.
                </li>
            </ul>
        </div>
    );
};
