import React from "react";

interface SectionProps {
    title: string;
    description: string;
    code: string;
    children?: ReactNode[];
    reverse?: boolean;
}

export const Section = ({ title, description, code, children, reverse }: SectionProps) => (
    <section
        className={`h-[800px] flex flex-col lg:flex-row items-center justify-between gap-12 py-20 px-6 sm:px-10 lg:px-20 relative overflow-hidden shadow-lg ${
            reverse && "lg:flex-row-reverse"
        }`}
    >
        <div className="relative z-10 lg:w-1/2 w-full flex flex-col justify-center">
            <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                    {description}
                </p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 text-sm rounded-lg overflow-x-auto text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
        <div className="relative z-10 lg:w-1/2 w-full flex flex-col justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 w-full max-w-2xl mx-auto">
                {children}
            </div>
        </div>
    </section>
);
