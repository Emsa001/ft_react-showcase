import React, { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";

import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);


export const CodeBlock = ({
    children,
    code,
    language = "typescript",
}: {
    children?: ReactNode[];
    code?: string;
    language?: string;
}) => {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            hljs.highlightElement(ref.current);
        }
    }, [code, language]);


    return (
        <div
            className={`relative text-sm md:text-base rounded-xl overflow-x-auto max-w-full shadow-lg`}
        >
            {/* Language label */}
            <div className="absolute top-0 right-0 text-[10px] font-semibold uppercase bg-black/30 text-gray-300 px-2 py-1 rounded-bl-lg">
                {language}
            </div>

            <pre className="!m-0">
                <code ref={ref} className={`hljs language-${language}`}>
                    {code || children}
                </code>
            </pre>
        </div>
    );
};
