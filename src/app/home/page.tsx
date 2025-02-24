import React from "react";
import { useState } from "react";
import Test from "./Component";

export default function Home(){
    const [num, setNum] = useState([1,2,3,4]);

    return (
        <div>
            <Test />
        </div>
    )
}