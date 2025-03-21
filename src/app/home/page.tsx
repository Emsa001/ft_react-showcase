import React, { useState } from "react";
import Test from "./Component";
import Test2 from "./Test2";

export default function Home(){

    const [test, setTest] = useState(1);

    return (
        <div className="my-4">
            <p>Hello World</p>

            <Test />
            {/* <Test2 /> */}

        </div>
    )
}