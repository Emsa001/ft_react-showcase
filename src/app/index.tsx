import TestProvider from "../context/testContext";
import React, { ReactElement, useEffect, useState } from "react";

const App = (): ReactElement => {
    const [inputValue, setInputValue] = useState("1");
    const [inputValue2, setInputValue2] = useState("2");
    const [inputValue3, setInputValue3] = useState("3");
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCount(213);
        }, 1000);
    }, []);

    return (
        <div>
            <p>Hello</p>
            <div>
                <p>{inputValue}</p>
                <button onClick={() => setCount((prev) => prev + 1)}>Increment {count}</button>
                <button onClick={() => setCount((prev) => prev + 1)}>Increment {count}</button>
            </div>
        </div>
    );
};

export default App;
