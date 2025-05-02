import React, { useEffect, useState } from "react";

const useMe = () => {
    const [state, setState] = useState(0);
    const [state2, setState2] = useState(0);
    const [state3, setState3] = useState(0);

    useEffect(() => {
        console.log("useMe effect");
        return () => {
            console.log("useMe cleanup");
        };
    }, []);

    return { state, setState, state2, setState2, state3, setState3 };
};

const AnotherComponent = ({
    state,
    setState,
}: {
    state: number;
    setState: (number: number) => void;
}) => {
    useEffect(() => {
        console.log("AnotherComponent effect");
        return () => {
            console.log("AnotherComponent cleanup");
        };
    }, []);

    return (
        <div>
            <h1>Another Component</h1>
            <p>State: {state}</p>
            <button onClick={() => setState(state + 1)}>Increment State</button>
        </div>
    );
};

export function CustomHooks() {
    const { state, setState, state2, setState2, state3, setState3 } = useMe();

    useEffect(() => {
        console.log("CustomHooks effect");
        return () => {
            console.log("CustomHooks cleanup");
        };
    }, []);

    return (
        <div>
            <h1>Custom Hooks</h1>
            <p>State: {state}</p>
            <button onClick={() => setState(state + 1)}>Increment State</button>
            <p>State2: {state2}</p>
            <button onClick={() => setState2(state2 + 1)}>Increment State2</button>
            <p>State3: {state3}</p>
            <button onClick={() => setState3(state3 + 1)}>Increment State3</button>
            <hr />
            <AnotherComponent state={state} setState={setState} />
        </div>
    );
}
