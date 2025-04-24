import { useUser } from "../../providers/user";
import React, { useState } from "react";
import { Test } from "./test";
import { useEffect } from "react";

export default function Home(){

    const { user } = useUser();
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     setCount((prev) => prev + 1);
    // }, [])

    return (
        <div className="my-4">
            <p>{user}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Add</button>
            <Test count={count} />
        </div>
    )
}