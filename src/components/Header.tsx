import React, { useEffect, useState } from "react";
import { GlowingText } from "./Glow";

export const Header = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 100); // slight delay for effect
        return () => clearTimeout(timeout);
    }, []);

    return (
        <header
            className={`text-black text-center px-6 h-[90vh] pt-48 md:pt-96 transition-all duration-1000 ease-out transform ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
            <div className="uppercase text-white flex flex-col items-center justify-center text-[clamp(2.5rem,5vw,5rem)] font-black">
                <span>Welcome to</span>
                <GlowingText
                    text="ft react"
                    from="from-blue-500"
                    via="via-indigo-500"
                    to="to-purple-500"
                    wrapper="flex items-center justify-center"
                    className="font-extrabold text-[clamp(4rem,12vw,10rem)]"
                />
            </div>

            <div className="my-8 h-[1px] max-w-2xl bg-indigo-500/20 mx-auto" />
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
