import React from "react";

export function PropTest({ name, age }: { name: string; age: number }) {
    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl mb-4">Profile Mode</h1>
            <p className="text-xl">Name: {name}</p>
            <p className="text-xl">Age: {age}</p>
        </div>
    );
}
