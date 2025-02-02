import TestProvider from "../context/testContext";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import TestPage from "./test";
import TestPage2 from "./test2";

const App = (): ReactElement => {
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [count, setCount] = useState(1);

    const handleChange = (event) => {
        React.setTitle(event.target.value);
        setInputValue(event.target.value);
    };

    return (
        <TestProvider>
            {/* <h1>Together {inputValue} {inputValue2} {count}</h1>
            <div>
                <p id="1">{inputValue}</p>
                <input id="1" type="text" value={inputValue} onChange={handleChange} />
            </div>
            <div>
                <p id="2">{inputValue2}</p>
                <input id="2" type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />
            </div>

            <button onClick={() => setCount((prev) => prev + 1)}>{count}</button> */}
            <TestPage />
        </TestProvider>
    );
};

export default App;
