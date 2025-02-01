import React, { useEffect, useRef } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage() {
    const { number, setNumber, setName } = useTest();
    const ref = useRef(null);

    return (
        <div>
            <div ref={ref}/>
            {/* <button onClick={() => setNumber(number + 1)}>cliek me</button>
            <p>Hello from test1: {number}</p> */}
        </div>
    );
}