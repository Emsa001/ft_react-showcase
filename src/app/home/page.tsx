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
    const [data, setData] = useState(1);

    const handleClick = async () => {
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    };

    const addData = () => {;
        setData((prev) => prev + 1);
        console.log("data: ",data);
    }

    return (
        <div className="p-2">
            <p>Data: {data}</p>
            <button onClick={addData}>Increment</button>
        </div>
    );
}
