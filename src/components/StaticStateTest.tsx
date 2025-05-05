import React, { useState, useStatic } from "react";

const AnotherComponent = () => {
    const [test, setTest] = useStatic("testValue1", 0);

    return (
        <div>
            <p>TestValue1 in AnotherComponent: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Update testValue1</button>
        </div>
    );
};

export function StaticStateTest2() {
    const [test, setTest] = useStatic("testValue2", 0);

    return (
        <div>
            <p>TestValue2 in StaticStateTest2: {test}</p>
            <AnotherComponent />
        </div>
    );
}

export function StaticStateTest() {
    const [test, setTest] = useStatic("testValue1", 20);
    const [test2, setTest2] = useStatic("testValue2", 5);

    const [normal, setNormal] = useState(0);

    const handleClick = () => {
        setTest((prev) => prev + 1);
        setTest2((prev) => prev + 1);
    };

    return (
        <div>
            <p>TestValue1 in StaticStateTest: {test}</p>
            <button onClick={handleClick}>Update statics</button>
            <p>Normal in StaticStateTest: {normal}</p>
            <button onClick={() => setNormal((prev) => prev + 1)}>Click normal</button>
            <StaticStateTest2 />
        </div>
    );
}
