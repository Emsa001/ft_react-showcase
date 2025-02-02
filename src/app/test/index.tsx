import React, { useEffect, useRef } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage() {
    const { number, setNumber } = useTest();

    return (
        <div>
            <button onClick={() => setNumber(number + 1)}>click me</button>
            <p>Hello from test1: {number}</p>
        </div>
    );
}