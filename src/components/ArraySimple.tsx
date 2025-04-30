import React, { useState } from "react";

export function ArraySimple() {
    const [array, setArray] = useState([1, 2, 3]);

    const addItem = () => {
        setArray([...array, array.length + 1]);
    };

    const removeItem = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    }

    const shuffleArray = () => {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        setArray(shuffled);
    }

    return (
        <div>
            <h1>Array Simple</h1>
            <button onClick={addItem}>Add Item</button>
            <ul>
                {array.map((item, index) => (
                    <div key={index}>
                        <li>{item}</li>
                        <button
                            onClick={() => removeItem(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </ul>

            <button onClick={shuffleArray}>Shuffle</button>
        </div>
    );
}
