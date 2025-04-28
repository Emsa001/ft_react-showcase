import React, {useState} from "react";

export function BooleanSimple() {
   const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                />
                {isChecked ? "Checked" : "Unchecked"}
            </label>
        </div>
    );
}

export function BooleanSimple2(){
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            {count % 2 ? (<h5>is Odd</h5>) : (<h6>is Even</h6>)}
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
            <p>Count: {count}</p>
        </div>
    );
}