import TestProvider from "../context/testContext";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import TestPage from "./test";
import TestPage2 from "./test2";

const App = (): ReactElement => {
    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const handleChange = (event) => {
        React.setTitle(event.target.value);
        setInputValue(event.target.value);
    };

    return (
        <TestProvider>
            <p>{inputValue}</p>
            <p>{inputValue2}</p>

            <input id="1" type="text" value={inputValue} onChange={handleChange} />
            <input id="2" type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />

            <select id="3">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </TestProvider>
    );
};

export default App;
