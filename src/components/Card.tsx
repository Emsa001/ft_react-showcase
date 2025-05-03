import React from "react";

export default function Card({ children }: { children?: ReactElement[] }) {
    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
            {children}
        </div>
    );
}
