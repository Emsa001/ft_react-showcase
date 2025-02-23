import React from "react"
import { useEffect } from "react";

export default function Test(){
    const [test, setTest] = React.useState(1);
    const [testArray, setTestArray] = React.useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        testArray.push(test);
    },[test])

    return (
        <div>
            {testArray.map((item) => (
                <p key={item}>{item}</p>
            ))}
            <button onClick={() => setTest((prev) => prev + 1)}>Increment</button>
        </div>
    )
}