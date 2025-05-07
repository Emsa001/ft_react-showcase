import React from "react";

interface GlowingTextProps {
    text: string;
    from?: string;
    to?: string;
    via?: string;
    wrapper?: string;
    className?: string;
}

export const GlowingText = ({
    text,
    from = "from-blue-500",
    to = "to-pink-500",
    via = "via-teal-500",
    wrapper = "",
    className = "text-6xl",
}: GlowingTextProps) => {
    return (
        <div className={wrapper}>
            <span
                className={`absolute mx-auto flex border w-fit bg-gradient-to-r blur-xl ${from} ${via} ${to} bg-clip-text box-content font-extrabold text-transparent text-center select-none ${className}`}
            >
                {text}
            </span>
            <span
                className={`relative top-0 w-fit h-auto justify-center flex bg-gradient-to-r items-center ${from} ${via} ${to} bg-clip-text font-extrabold text-transparent text-center select-auto ${className}`}
            >
                {text}
            </span>
        </div>
    );
};
