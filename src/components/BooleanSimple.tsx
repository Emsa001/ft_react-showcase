import React, { useState } from "react";

export function BooleanSimple() {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                {isChecked ? "Checked" : "Unchecked"}
            </label>
        </div>
    );
}

export function BooleanSimple2() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            {count % 2 ? <h5>is Odd</h5> : <h6>is Even</h6>}
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <p>Count: {count}</p>
        </div>
    );
}

export function BooleanSimple3() {
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);

    const setAllVisible = () => {
        setIsVisible1(true);
        setIsVisible2(true);
        setIsVisible3(true);
        setIsVisible4(true);
    };

    return (
        <div>
            {isVisible1 && <p>This is the first paragraph.</p>}
            <hr />
            {isVisible2 && <p>This is the second paragraph.</p>}
            <hr />
            {isVisible3 && <p>This is the third paragraph.</p>}
            <hr />
            {isVisible4 && <p>This is the fourth paragraph.</p>}
            <hr />

            <button onClick={setAllVisible}>Set All Visible</button>
        </div>
    );
}
