import React from "react";

interface SectionProps {
    title: string;
    children?: ReactNode[];
    className?: string;
}

export const DocsSection = (props: SectionProps) => {
    return (
        <section className={`w-full max-w-7xl mx-auto ${props.className || ''}`}>
            <h1 className="text-2xl md:text-5xl font-bold mb-6 pb-2">{props.title}</h1>
            <hr className="text-gray-800 my-5" />

            {props.children}
        </section>
    );
};