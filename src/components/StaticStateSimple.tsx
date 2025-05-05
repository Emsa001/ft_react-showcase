import React, { useState, useStatic } from "react";

export function StaticStateSimple() {
    const [test, setTest] = useStatic("simple", 0);

    return (
        <div>
            <p>Simple static test: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Click</button>
        </div>
    );
}


export function StaticStateNormalState(){
    const [staticState, setStaticState] = useStatic("simple", 0);
    const [normalState, setNormalState] = useState(0);

    const handleUpdateAll = () => {
        setNormalState((prev) => prev + 1);
        setStaticState((prev) => prev + 1);
    }

    return (
        <div>
            <p>Static State: {staticState}</p>
            <p>Normal State: {normalState}</p>
            <button onClick={handleUpdateAll}>Update All</button>
            <button onClick={() => setStaticState((prev) => prev + 1)}>Update Static State</button>
            <button onClick={() => setNormalState((prev) => prev + 1)}>Update Normal State</button>
        </div>
    );
}