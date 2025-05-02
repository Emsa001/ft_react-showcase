import React, { useState, useStatic } from "react";

const AnotherComponent = () => {
    const [test, setTest] = useStatic("testValue", 0);

    return (
        <div>
            <p>Test in 2: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Click from 2</button>
        </div>
    );
};

export function StaticStateTest2() {
    const [test, setTest] = useStatic("testValue2", 0);

    return (
        <div>
            <p>Beqa: {test}</p>
            <AnotherComponent />
        </div>
    );
}

export function StaticStateTest() {
    const [test, setTest] = useStatic("testValue", 20);
    const [test2, setTest2] = useStatic("testValue2", 5);

    const [normal, setNormal] = useState(0);

    const handleClick = () => {
        setTest((prev) => prev + 1);
        setTest2((prev) => prev + 1);
    };

    return (
        <div>
            <p>Test in 1: {test}</p>
            <button onClick={handleClick}>Click from 1</button>
            <p>Normal: {normal}</p>
            <button onClick={() => setNormal((prev) => prev + 1)}>Click normal</button>
            <StaticStateTest2 />
        </div>
    );
}
