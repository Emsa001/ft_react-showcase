import React, { useState } from "react";

interface ItemProps {
    removeItem: (item: number) => void;
    item: number;
}

const Item = ({item, removeItem}: ItemProps) => {
    
    return (
        <div>
            <p>Item {item}</p>
            <button onClick={() => removeItem(item)}>Remove</button>
        </div>
    );
}

export function ArrayComponents() {
    const [array, setArray] = useState([1, 2, 3]);

    const addItem = () => {
        setArray([...array, array.length + 1]);
    };

    const removeItem = (item: number) => {
        const newArray = array.filter((_, i) => _ != item);
        setArray(newArray);
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
                    <Item key={index} removeItem={removeItem} item={item}/>
                ))}
            </ul>

            <button onClick={shuffleArray}>Shuffle</button>
        </div>
    );
}
