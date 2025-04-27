import React, { useState } from "react";

const Test3 = () => {
    return (
        <div id="test3" className="my-4">
            <p>Hello World 3</p>
        </div>
    );
};


const Test = () => {
    return (
        <div id="test1" className="my-4 2">
            <p>Hello World 1</p>
            <Test2 />
        </div>
    );
};

const UnUsed = () => {
    return (
        <div id="unused" className="my-4">
            <p>Hello World 4</p>
        </div>
    );
};

const Test2 = () => {
    const [count, setCount] = useState(0);
    return (
        <div id="test2" className="my-4">
            <p>Hello World {count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
        </div>
    );
};

export default function Home() {
    const [count, setCount] = useState(12);
    const [data, setData] = useState(0);
    const [names, setNames] = useState(["John", "Doe"]);

    const handleClick= async () => {
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    }

    return (
        <div id="home" className="my-4">
            <p>Hello World {count}</p>
            <button onClick={handleClick}>Increment</button>
            <hr />
            <p>Data: {data}</p>
            <button onClick={() => setData((prev) => prev + 1)}>Increment</button>

            <hr />
            {names.map((name, index) => (
                <div key={index} className="my-4">
                    <p>{name}</p>
                    <button onClick={() => setNames((prev) => prev.filter((_, i) => i !== index))}>Remove</button>
                </div>
            ))}
            <button onClick={() => setNames((prev) => [...prev, `Name ${prev.length + 1}`])}>Add Name</button>

            <Test2 />
        </div>
    );
}
