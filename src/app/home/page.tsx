import React, { useState, useEffect } from "react";
import Test from "./Component";

export default function Home() {
    const [test, setTest] = React.useState(1);
    const [testArray, setTestArray] = React.useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        testArray.push(test);
    }, [test]);

    return (
        <div>
            {test}
            <Test />
        </div>
    );
}
