import React, { useState } from "react";

export function StateChaosTester() {
    const modes = ["counter", "text", "list", "profile", "nothing"];
    const [modeIndex, setModeIndex] = useState(0); // Start at first mode

    // Different state holders depending on mode
    const [counter, setCounter] = useState(0);
    const [text, setText] = useState("hello");
    const [items, setItems] = useState(["🍎"]);
    const [profile, setProfile] = useState({ name: "Alice", age: 20 });

    const nextMode = () => {
        setModeIndex((i) => (i + 1) % modes.length); // cycle through modes
    };

    const mode = modes[modeIndex];

    // Different returns based on `mode`
    if (mode === "counter") {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl mb-4">Counter Mode</h1>
                <p className="text-xl">{counter}</p>
                <button onClick={() => setCounter((c) => c + 1)} className="bg-blue-500 text-white p-2 rounded m-2">
                    Increment
                </button>
                <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded">
                    Next Mode
                </button>
            </div>
        );
    }

    if (mode === "text") {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl mb-4">Text Mode</h1>
                <p className="text-xl">{text}</p>
                <button
                    onClick={() => setText((t) => t.split("").reverse().join(""))}
                    className="bg-green-500 text-white p-2 rounded m-2"
                >
                    Reverse Text
                </button>
                <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded">
                    Next Mode
                </button>
            </div>
        );
    }

    if (mode === "list") {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl mb-4">List Mode</h1>
                <ul className="list-disc list-inside">
                    {items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
                <button
                    onClick={() => setItems((arr) => [...arr, `🍉 ${arr.length}`])}
                    className="bg-purple-500 text-white p-2 rounded m-2"
                >
                    Add Item
                </button>
                <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded">
                    Next Mode
                </button>
            </div>
        );
    }

    if (mode === "profile") {
        return (
            <div className="p-4 text-center">
                <h1 className="text-2xl mb-4">Profile Mode</h1>
                <p>Name: {profile.name}</p>
                <p>Age: {profile.age}</p>
                <button
                    onClick={() => setProfile((p) => ({ ...p, age: p.age + 1, name: p.name + "!" }))}
                    className="bg-yellow-500 text-white p-2 rounded m-2"
                >
                    Level Up
                </button>
                <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded">
                    Next Mode
                </button>
            </div>
        );
    }

    if (mode === "nothing") {
        return (
            <div className="p-4 text-center">
                <h1 className="text-4xl">✨ Nothing Mode ✨</h1>
                <p>There's literally nothing to do.</p>
                <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded mt-4">
                    Next Mode
                </button>
            </div>
        );
    }

    if (mode === "weird") {
        return (
            <div className="p-8 text-center bg-black text-white min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-6xl animate-pulse">👻 Weird Mode 👻</h1>
                <button
                    onClick={() => {
                        // reset everything and cycle back to start
                        setCounter(0);
                        setText("hello");
                        setItems(["🍎"]);
                        setProfile({ name: "Alice", age: 20 });
                        setModeIndex(0);
                    }}
                    className="bg-pink-500 text-black font-bold p-4 rounded mt-8"
                >
                    Reset All
                </button>
            </div>
        );
    }

    // fallback
    return (
        <div className="p-4 text-center">
            <h1 className="text-4xl text-red-500">❌ Unknown Mode ❌</h1>
            <button onClick={nextMode} className="bg-red-500 text-white p-2 rounded mt-4">
                Try Again
            </button>
        </div>
    );
}
