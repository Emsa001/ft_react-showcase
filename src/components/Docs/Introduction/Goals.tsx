import React from "react";

export const DocsGoals = () => {
    const goals = [
        "Understand what's really happening under the hood in React",
        "Find my own original approach to rebuilding React concepts",
        "Learn how popular hooks like useState and useEffect actually work",
        "Create own custom built-in hooks",
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Project Goals</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-gray-300">
                        {goal}
                    </div>
                ))}
            </div>

            <p className="text-sm text-gray-500 mt-6 italic">
                While I aimed to implement features similary to React, I intentionally made several significant changes. My primary motivation was to discover solutions independently. Whether these choices were optimal is debatable—but I'm proud of the results. Most importantly, I learned a lot and significantly improved my problem solving skills.
            </p>
        </section>
    );
};