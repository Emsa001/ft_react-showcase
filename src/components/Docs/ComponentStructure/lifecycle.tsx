import React from "react";

export const ComponentLifecycle = () => {
    return (
        <div>
            <h2 className="text-xl font-bold pb-2">Component Lifecycle</h2>
            <div className="mb-6 space-y-3">
                <p className="font-[500]">
                    Each component has a lifecycle that consists of three main phases: mounting,
                    updating, and unmounting.
                </p>
                <ul className="list-decimal list-inside space-y-1">
                    <li>
                        <code>onMount</code>: Called when the component is first mounted to the DOM.
                    </li>
                    <li>
                        <code>onUpdate</code>: Called when the component is updated (re-rendered).
                    </li>
                    <li>
                        <code>onUnmount</code>: Called when the component is removed from the DOM.
                    </li>
                </ul>
                <p>
                    These hooks are defined in the component's instance and are executed at the
                    appropriate times during the component's lifecycle. The most important lifecycle
                    method is <code>onUnmount</code>, which is called when the component is no
                    longer used. <code>ft_react</code> will automatically calls this method and perform everry necessary action
                    related to the component, including removing it from the DOM and executing it's side effect functions.
                </p>
            </div>
        </div>
    );
};
