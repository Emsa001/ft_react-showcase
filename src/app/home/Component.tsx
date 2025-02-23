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
            <h1>Test Component</h1>
            <p>Hello</p>
            {/* <div>
                {testArray.map((item) => (
                    <p key={item}>{item}</p>
                ))}
            </div>
            <p>Hello {test} World</p>
            <a></a>
            <button onClick={() => setTest((prev) => prev + 1)}>Increment</button> */}
        </div>
    )
}