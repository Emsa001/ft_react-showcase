import React from "react";
import { useState } from "react";
import Test2 from "./Test2";

export default function Test(){
    const [num, setNum] = useState([1,2,3,4]);

    return (
        <div>
            {num.map((e, index) => {
                return (
                    <div className="my-2 bg-blue-100" key={e}>
                        <h1>My element</h1>
                        <p>{e}</p>
                    </div>
                )
            })}
        </div>
    )
}