import React, { useStatic } from "react";

export function StaticStateSimple() {
    const [test, setTest] = useStatic("simple", 0);

    return (
        <div>
            <p>Simple static test: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Click</button>
        </div>
    );
}
