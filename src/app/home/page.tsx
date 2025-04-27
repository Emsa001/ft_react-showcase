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
    const [names, setNames] = useState(["John", "Doe", "Jane"]);

    const handleClick = async () => {
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    };

    const readData = () => {
        console.log(data);
    };

    const addData = () => {
        setData((prev) => prev + 1);
    };

    const addNames = () => {
        setNames((prev) => [...prev, "Emanuel", "Beqa"]);
    };

    const shuffleNames = () => {
        setNames((prev) => {
            const shuffled = [...prev].sort(() => Math.random() - 0.5);
            return shuffled;
        });
    }

    const removeName = (index: number) => {
        setNames((prev) => {
            const newNames = [...prev];
            newNames.splice(index, 1);
            return newNames;
        });
    }


    return (
        <div className="p-2">
            <p>Data: {data}</p>
            {data > 5 && <p>Hello World</p>}
            <button onClick={addData}>Increment</button>
            <button onClick={readData}>Read Data</button>

            <hr />
            <div>
                {names.map((name, index) => (
                    <div key={index} className="my-4">
                        <p>{name}</p>
                        <button onClick={() => removeName(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <hr />
            <button onClick={addNames}>Add Name</button>
            <br />
            <button onClick={shuffleNames}>Shuffle Names</button>
        </div>
    );
}
