import React from "react";

interface DividerProps {
    my?: number;
    color?: string;
    className?: string;
}

export const Divider = ({ my = 5, color = "text-gray-800", className = "" }: DividerProps) => {
    return (
        <hr
            className={`${color} ${className}`}
            style={{
                margin: `calc(var(--spacing) * ${my}) 0`,
            }}
        />
    );
};
