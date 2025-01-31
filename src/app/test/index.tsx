import React, { useEffect } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage() {
    const {number, setNumber, setName} = useTest();

    useEffect(() => {
        setNumber(2);
        setName("Beqa");
    },[])

    return (
        <div>
            <button onClick={() => setNumber(number + 1)}>cliek me</button>
    <p>Hello from test1: {number}</p>
        </div>
    );
}
