import React, { useEffect } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage2() {
    const {name, setNumber} = useTest();

    return <p>Hello from test2:  {name}</p>;
}
