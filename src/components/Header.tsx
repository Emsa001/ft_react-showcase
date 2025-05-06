import React from "react";

export const Header = () => {
    return (
        <header className="text-black text-center px-6 py-32 mb-32">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 dark:text-white">React Hook Showcase</h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                Explore the essential React hooks through interactive examples. Each section
                demonstrates practical usage with real code you can try.
            </p>
        </header>
    );
};
