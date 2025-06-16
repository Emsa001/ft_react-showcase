import React from "react";

import { Header } from "../../components/Header";
import { Motivation } from "../../components/Motivation";
import { Features } from "../../components/Features";

export default function Showcase() {
    return (
        <main className="bg-gradient-to-br from-blue-200 via-white to-purple-300 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 w-full">
            <Header />
            <Motivation />
            <Features />
        </main>
    );
}
