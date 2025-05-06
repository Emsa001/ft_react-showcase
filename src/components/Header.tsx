import React from "react";

export const Header = () => {
    return (
        <header className="text-black text-center px-6 py-32 mb-32">
            <h1 className="text-5xl md:text-6xl font-bold dark:text-white">
                <span className="text-green-400">ft_react</span> Showcase
            </h1>
            <div className="my-8 h-[1px] w-2xl bg-indigo-500/20 mx-auto" />
            <p className="text-gray-400 text-[18px] max-w-3xl mx-auto leading-relaxed font-light">
                My very own implementation of the <span className="text-white ">React</span>{" "}
                library, built with <span className="text-white">TypeScript</span>.
                <br />
                <span className="text-md">
                    The idea for this project came from my final project at{" "}
                    <span className="text-green-400 font-black">42</span> coding school{" "}
                    <span className="text-green-400 font-bold">ft_transcendence</span>, where using
                    React was not allowed. Therefore, I decided to write my own implementation of
                    it.
                </span>
            </p>
        </header>
    );
};
