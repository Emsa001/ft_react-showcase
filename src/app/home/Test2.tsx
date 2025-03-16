import React from "react";
import { useState } from "react";

export default function Test2(){
    const [num, setNum] = useState(5);

    return (
        <div className="bg-red-200">
            <hr />
            <div>
                <h1>Test 2 (map)</h1>
                <p>{num}</p>
                {num % 2 === 0 ? <p>Even</p> : <p>Odd</p>}
                {Array.from({ length: num }).map((_, i) => (
                    <p key={i}>Number: {i}</p>
                ))}
            </div>
            <button onClick={() => setNum((prev) => prev + 1)}>Click Me</button>
            <hr />
        </div>
    )
}