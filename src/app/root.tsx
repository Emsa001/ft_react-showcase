import React, { useEffect, useState, useStatic } from "react";
import Home from "./home/page";
import "./global.css";

const Test = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        return () => {
            console.log("Unmounting Test component");
        }
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world! {count}
            </h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    )
}

export default function Root() {
    return (
        <div>
            <Home>
                <hr />
                <h1>Hello World</h1>
                <p>This is children</p>
                <hr />
            </Home>
        </div>
    );
}
