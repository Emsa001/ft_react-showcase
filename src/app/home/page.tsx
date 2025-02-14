import React, { useState } from "react";

export default function Home() {
    const [id] = useState(Math.floor(Math.random() * 4) + 1);

    return (
        <div className="flex flex-col gap-8 items-center justify-center w-screen h-screen bg-gray-900 text-white">
            <h1 className="text-6xl font-bold mb-4">
                Welcome to <span className="text-green-500">ft_react</span>
            </h1>
            <img src={`public/meme${id}.jpg`} alt="ft_react meme" />

            <a href="https://bit.ly/3BlS71b" target="_blank" className="mt-12 hover:underline">
                Read Documentation
            </a>
        </div>
    );
}
