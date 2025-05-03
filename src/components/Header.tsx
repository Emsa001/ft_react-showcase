import React from "react";

export default function Header({ title }: { title: string }) {
    return (
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
            {title}
        </h1>
    );
}
