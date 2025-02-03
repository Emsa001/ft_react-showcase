import React, { useEffect, useRef } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage() {
    // const { number, setNumber } = useTest();

    const [number, setNumber] = React.useState<number>(0);
    const [number2, setNumber2] = React.useState<number>(0);

    return (
        <div>
            Hello World{" "}
            {number}
            <button onClick={() => setNumber(number + 1)}>click me</button>
            <button onClick={() => setNumber(number + 1)}>click me</button>

            <button onClick={() => setNumber2(number2 + 1)}>click me</button>

            <p>Hello from test1: {number}</p>

            {number}
            {number}

            {number2}
        </div>
    );
}