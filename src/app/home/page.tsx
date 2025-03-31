import React, { useState } from "react";
import Test from "./Component";
import Test2 from "./Test2";

export default function Home(){

    const [test, setTest] = useState(1);

    return (
        <div className="my-4">
            <p>Hello Worldaaaa</p>
            <p>{test}</p>
            <button onClick={() => setTest(test + 1)}>Add</button>
            <button onClick={() => setTest(test - 1)} className="ml-2">Subtract</button>

            <Test />
            <Test2 />
        </div>
    )
}