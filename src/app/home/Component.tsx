import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Test() {
    const [num, setNum] = useState([1, 2, 3, 4]);
    const [count, setCount] = useState(0);
    const [onlyOnce, setOnlyOnce] = useState(0);

    const handleClick = () => {
        const newNum = 1;
        setNum((prev) => [...prev, newNum]);
        setCount((prev) => prev + 1);
    };

    useEffect(() => {
        setOnlyOnce((prev) => prev + 1);
        console.log("setOnlyOnce", count);
    }, []);

    return (
        <div>
            <hr />
            <p>count {count}</p>
            <p>only once {onlyOnce}</p>
            <h1>This is test Component</h1>
            <div>{num.length}</div>
            <button onClick={handleClick}>Click me</button>
            <hr />
        </div>
    );
}


