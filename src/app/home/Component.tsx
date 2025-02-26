import React from "react";
import { useState } from "react";
import Test2 from "./Test2";

export default function Test(){
    const [num, setNum] = useState([1,2,3,4]);

    const handleClick = () => {
        const newNum = num[num.length - 1] + 1;
        num.push(newNum);
        setNum(num);
    }

    return (
        <div>
            <div>{num.length}</div>

            <div>
                {num.map((e, index) => {
                    return (
                        <div className="my-2 bg-blue-100" key={"element" + e}>
                            <h1>My element</h1>
                            <p>{e}</p>
                        </div>
                    )
                })}
            </div>

            <button onClick={handleClick}>Click me</button>
        </div>
    )
}