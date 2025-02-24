import React from "react";
import { useState } from "react";

export default function Test(){
    const [num, setNum] = useState([1,2,3,4]);

    return (
        <div>
            <div>
                {num.map((e) => {
                    return (
                        <div key={e}>
                            {e}
                        </div>
                    )
                })}
            </div>
            <button onClick={() => setNum((prev) => [...prev, prev[prev.length - 1] + 1])}>Click Me</button>
        </div>
    )
}