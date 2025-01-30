import React, { ReactElement, useState, useEffect, useRef } from "react";

const App = (): ReactElement => {
    const [number, setNumber] = useState(1);
    const [number2, setNumber2] = useState(1);

    let ref = useRef(null);

    function handleClick() {
        console.dir(ref);
    }

    useEffect(() => {
        setNumber2((prev) => prev * 2);
        console.log("Number 2 has been reset to 0");
    }, [number]);

    return (
        <div>
            <h2>
                Hello {number} {number2}!
            </h2>
            <p>Hi there! !</p>
            <button onClick={() => setNumber(number + 1)}>Increment Number</button>
            <button onClick={() => setNumber2(number2 + 1)}>Increment Number 2</button>
            <button ref={ref} onClick={handleClick}>Click me!</button>
        </div>
    );
};

export default App;
