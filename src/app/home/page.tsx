import React, { useState } from "react";
import Test from "./Component";
import Test2 from "./Test2";


export default function Home(){
    const [num, setNum] = useState(1);

    return (
        <div className="my-4">
            {/* <Test /> */}
            
            <p>{num % 3 === 0 && "Num is % 3"}</p>

            <p>{num}</p>
            <button onClick={() => setNum((prev) => prev + 1)}>Click Me</button>
        </div>
    )
}