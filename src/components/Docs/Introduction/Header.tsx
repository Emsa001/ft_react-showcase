import React from "react";

export const DocsHeader = () => {
    return (
        <section className="space-y-6">
            <div className="space-y-4 text-gray-300">
                <p>
                    Welcome to the documentation for <code>ft_react</code>, a custom React-like library I built from scratch to understand how modern UI frameworks really work. <span className="text-gray-400">(In reality, I created this to avoid using vanilla website development at my 42 school last project, but that's a different story.)</span>.
                </p>
                <p>
                    This project definitly does not aim to be an alternative for React or any other library. It can contain bugs, missing features, and is definitly less optimized than React. It is created only for school project, educational purposes, and to have fun with it. Feel free to experiment with it, change add your own extra features. Basically <span className="font-bold text-indigo-400">have fun</span>
                </p>


                <p className="text-gray-500 italic border-l-4 pl-4 border-indigo-500">
                    To sum up, whether you're a 42 student starting <span className="text-indigo-400">ft_transcendence</span> or just another curious nerd with a stupid idea of writing your own React, this documentation is here to guide you.
                </p>
            </div>

            <div className="flex items-center justify-center">
                <img src="/public/memes/meme8.jpg" alt="Meme" className="max-w-full max-h-full object-cover rounded-lg" />
            </div>
        </section>
    );
};