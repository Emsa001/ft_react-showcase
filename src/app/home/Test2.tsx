import React from "react";
import { useState } from "react";
import Test from "./Component";

export default function Test2(){
    const [num, setNum] = useState(5);
    const [test, setTest] = useState("Test");

    return (
        <div className="bg-red-200">
            <hr />
            <div>
                <h1>Test 2 (map)</h1>
                <p>{num}</p>
                {num % 2 === 0 ? <p>Even</p> : <p>Odd</p>}
                {Array.from({ length: num }).map((_, i) => (
                    // <div>{i} = {num}</div>
                    <div key={i}>
                        <Test key={i}/>
                        hallo
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-start gap-2 mt-4">
                <button onClick={() => setNum((prev) => prev + 1)}>Click Me</button>
                <button onClick={() => setNum((prev) => prev - 1)}>Remove</button>
            </div>
            <hr />
        </div>
    )
}