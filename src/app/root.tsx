import React from "react";
import "./global.css";

export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <body className="bg-gray-100 font-serif text-gray-900">
            {children}
        </body>
    );
}
