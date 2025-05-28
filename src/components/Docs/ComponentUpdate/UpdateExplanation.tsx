import React from "react";

export const UpdateExplanation = () => (
    <div className="mb-6 space-y-3 text-gray-200">
        <p className="font-bold">
            When a hook triggers a change, the component is marked as dirty, and{" "}
            <code>updateSchedule</code> re-renders it. The update process follows these steps:
        </p>
        <ul className="list-decimal list-inside space-y-1">
            <li>Add to render queue.</li>
            <li>Wait until the current call stack clears.</li>
            <li>Re-evaluate the component using JSX.</li>
            <li>
                Reset <code>hookIndex</code>.
            </li>
            <li>Render new vNode.</li>
        </ul>
    </div>
);
