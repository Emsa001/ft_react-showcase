import React from "react";
import { useState } from "react";

export default function Test(){
    const [num, setNum] = useState(5);

    return (
        <div>
            <div>
                <h1>Testa</h1>
                <p>{num}</p>
            </div>
            <button onClick={() => setNum((prev) => prev + 1)}>Click Me</button>
        </div>
    )
}