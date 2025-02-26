import React from "react";
import { useState } from "react";
import Test2 from "./Test2";

export default function Test(){
    const [num, setNum] = useState([1,2,3,4]);

    const handleClick = () => {
        const newNum = num[num.length - 1] + 1;
        console.log("adding", newNum);
        num.push(newNum);
        setNum(num);
        console.log(num);
    }

    return (
        <div>

            <div>{num.length}</div>

            {num.map((e, index) => {
                return (
                    <div className="my-2 bg-blue-100" key={e}>
                        <h1>My element</h1>
                        <p>{e}</p>
                    </div>
                )
            })}

            <button onClick={handleClick}>Click me</button>
        </div>
    )
}