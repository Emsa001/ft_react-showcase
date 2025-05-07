import React from "react";

const motivationData = [
    {
        id: 1,
        title: "The Challenge",
        text: `ft_react was born during my final project at 42 coding school, where people suffer and were forbidden to use React. I am not coding a website in plain html and css, so I decided to create my own React implementation.`
    },
    {
        id: 2,
        title: "Learning React's Core",
        text: `My goal was to dive into React's core concepts—like hooks, context, and routing—by implementing them from scratch.`
    },
    {
        id: 3,
        title: "Custom Solutions",
        text: `While ft_react mimics many React features, I also implemented unique solutions, especially in areas like component management and state persistence. It's not just about recreation; it's about finding your own solutions to problems.`
    },
    {
        id: 4,
        title: "Personal Growth",
        text: `This project pushed me to understand React at a deeper level and gave me a chance to apply my own insights, turning challenges into learning opportunities.`
    },
    {
        id: 5,
        title: "Building Something Unique",
        text: `Creating ft_react was about learning and growth, not perfection. I focused on making progress, improving my problem-solving abilities, and understanding React better. Didn't know how much I didn't know about React!`
    },
    {
        id: 6,
        title: "Experimentation and Discovery",
        text: `By experimenting with different approaches and redoing the project multiple times, I gained new perspectives on React. The final version represents the culmination of hours of research and learning.`
    }
];

const MotivationCard = ({ title, text }: {title: string, text: string}) => {
    return (
        <div
            className="bg-clip-padding backdrop-filter backdrop-blur-md w-full shadow-lg rounded-lg p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ease-out cursor-pointer bg-gradient-to-br from-blue-200/20 to-indigo-300/20 dark:from-indigo-600/20 dark:to-gray-800/20"
        >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
            <p className="text-lg text-gray-100/80">{text}</p>
        </div>
    );
};

export const Motivation = () => {
    return (
        <div className="text-center my-32 max-w-7xl mx-auto px-4">
            <h1 className="text-5xl uppercase font-black tracking-widest text-gray-800 dark:text-white mb-32">
                Motivation
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {motivationData.map((item) => (
                    <MotivationCard key={item.id} title={item.title} text={item.text} />
                ))}
            </div>
        </div>
    );
};
