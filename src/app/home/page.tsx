import React, { useEffect, useState, useRef, setTitle } from "react";
import NavButton from "../../components/NavButton";
import Header from "../../components/Header";

export default function Home() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setTitle("Home - Dark Custom React");
        inputRef.current?.focus();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-lg text-center">
                <Header title="🌙 Welcome to ft_react" />

                <p className="text-gray-400 mb-6">Dark theme, clean layout, working navigation & hooks.</p>

                <div className="mb-6">
                    <label className="block text-sm text-gray-300 mb-2">Enter your name:</label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-sm text-indigo-400 mt-2">
                        Hello, <span className="font-semibold">{name || "stranger"}</span>!
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-gray-300 mb-2">Click counter:</label>
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setCount(count + 1)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
                        >
                            +1
                        </button>
                        <span className="text-lg">{count}</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <NavButton to="/profile" label="Profile →" />
                    <NavButton to="/404" label="404 Page" />
                </div>
            </div>
        </div>
    );
}
