import React, { ElementProps } from "react";
import "./global.css";

export default function Root({ children, params }: ElementProps) {
    return (
        <body className="bg-gray-100 font-serif text-gray-900">
            {children}
        </body>
    );
}
