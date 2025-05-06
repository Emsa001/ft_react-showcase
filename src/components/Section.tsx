// Section.tsx

import React, { useEffect, useRef, useStatic } from "react";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);

interface SectionProps {
    title: string;
    description: string;
    code: string;
    children?: ReactNode[];
    reverse?: boolean;
    footer?: string;
}

const glass = "bg-clip-padding backdrop-filter backdrop-blur-md";

export const Section = ({ title, description, code, children, reverse, footer }: SectionProps) => {
    const codeRef = useRef<HTMLElement | null>(null);
    const [theme] = useStatic("theme", "dark");

    useEffect(() => {
        const themeLink = document.createElement("link");
        themeLink.rel = "stylesheet";
        themeLink.type = "text/css";
        themeLink.id = "hljs-theme";

        const themeHref =
            theme === "dark"
                ? "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark-dimmed.min.css"
                : "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css";

        themeLink.href = themeHref;

        document.head.appendChild(themeLink);

        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }

        return () => {
            const existing = document.getElementById("hljs-theme");
            if (existing) existing.remove();
        };
    }, [theme]);

    return (
        <section className={`w-full bg-gray-500/10 ${glass} shadow-lg`}>
            <div
                className={`max-w-[1700px] mx-auto min-h-[800px] flex flex-col lg:flex-row items-center justify-between gap-32 py-20 px-6 sm:px-10 lg:px-20 relative overflow-hidden ${
                    reverse ? "lg:flex-row-reverse" : ""
                }`}
            >
                {/* Text and Code Block */}
                <div className="relative z-10 lg:w-1/2 w-full">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: description }} />
                        <div className="text-sm rounded-lg overflow-x-auto text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 max-w-full">
                            <pre className="whitespace-pre-wrap break-words">
                                <code ref={codeRef}>{code}</code>
                            </pre>
                        </div>
                        {footer && (
                            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-md leading-relaxed mt-6">
                                {footer}
                            </p>
                        )}
                    </div>
                </div>

                {/* Optional Child Content */}
                <div className="relative z-10 lg:w-1/2 w-full">
                    <div
                        className={`${glass} bg-pink-200/10 dark:bg-gray-700/50 p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
