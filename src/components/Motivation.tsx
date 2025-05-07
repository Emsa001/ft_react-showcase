import React from "react";

const motivationData = [
    {
        id: 1,
        title: "I was forced",
        text: `My amazing ft_transcendence team (mostly Ellen), forced me to do this, threating with not eating pizza with me.`
    },
    {
        id: 2,
        title: "I like challenges",
        text: `42 forbid using react in ft_transendence. I like challenges and writing own framework sounded like a fun one. <br />(I was wrong)`
    },
    {
        id: 3,
        title: "I hate vanilla",
        text: `No, not doing a website in vanilla. I really believe it is less crazy to write a framework than to do a website in vanilla.`
    },
];

const MotivationCard = ({ title, text }: {title: string, text: string}) => {
    return (
        <div
            className="bg-clip-padding backdrop-filter backdrop-blur-md w-full shadow-lg rounded-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out cursor-pointer bg-gradient-to-br from-blue-200/20 to-indigo-300/20 dark:from-indigo-600/20 dark:to-gray-800/20"
        >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
            <p className="text-lg text-gray-100/80" dangerouslySetInnerHTML={{__html: text }}/>
        </div>
    );
};

export const Motivation = () => {
    return (
        <div className="text-center my-32 max-w-7xl mx-auto px-4">
            <h1 className="text-5xl uppercase font-black tracking-widest text-gray-800 dark:text-white mb-32">
                Motivation
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {motivationData.map((item) => (
                    <MotivationCard key={item.id} title={item.title} text={item.text} />
                ))}
            </div>
        </div>
    );
};
