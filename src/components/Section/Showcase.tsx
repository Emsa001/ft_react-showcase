import React, { useEffect, useRef, useState } from "react";
import { CodeBlock } from "../Code";


interface SectionProps {
    title: string;
    description: string;
    code: string;
    children?: ReactNode[];
    reverse?: boolean;
    footer?: string;
}

export const ShowSection = ({ title, description, code, children, reverse, footer }: SectionProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            threshold: 0.1,
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const baseTransition = "transition-all duration-700 ease-out";
    const visibleMain = "opacity-100 translate-x-0";
    const hiddenMain = reverse ? "opacity-0 translate-x-30" : "opacity-0 -translate-x-30";

    const visibleChild = "opacity-100 translate-x-0";
    const hiddenChild = reverse ? "opacity-0 -translate-x-30" : "opacity-0 translate-x-30";

    return (
        <section ref={sectionRef} className={`w-full bg-gray-500/10 glass shadow-lg`}>
            <div
                className={`max-w-[1700px] mx-auto min-h-[800px] flex flex-col lg:flex-row items-center justify-between gap-32 py-20 px-6 sm:px-10 lg:px-20 relative overflow-hidden ${
                    reverse ? "lg:flex-row-reverse" : ""
                }`}
            >
                {/* Text and Code Block */}
                <div
                    className={`relative z-10 lg:w-1/2 w-full transform ${baseTransition} ${
                        isVisible ? visibleMain : hiddenMain
                    }`}
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            {title}
                        </h2>
                        <p
                            className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />

                        <CodeBlock code={code} />

                        {footer && (
                            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-md leading-relaxed mt-6">
                                {footer}
                            </p>
                        )}
                    </div>
                </div>

                {/* Child Content */}
                <div
                    className={`relative z-10 lg:w-1/2 w-full transform ${baseTransition} ${
                        isVisible ? visibleChild : hiddenChild
                    }`}
                >
                    <div
                        className={`glass bg-pink-200/10 dark:bg-gray-700/50 p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
