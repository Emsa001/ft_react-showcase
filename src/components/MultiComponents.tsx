import React, { useState } from "react";

const Bob = ({ title }: { title: string }) => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{title}</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

const Alice = () => {
    return (
        <div>
            <p>Alice</p>
        </div>
    );
};

const Charlie = () => {
    return (
        <div>
            <p>Charlie</p>
        </div>
    );
};

const Dave = () => {
    return (
        <div>
            <p>Dave</p>
        </div>
    );
};

const Eve = () => {
    return (
        <div>
            <p>Eve</p>
        </div>
    );
};

export function MultiComponents() {
    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(true);

    return (
        <div>
            {show && <Bob title="bob 1" />}
            {show2 && <Bob title="bob 2" />}
            <p>Hello people!</p>

            <hr />
            <button onClick={() => setShow(!show)}>Toggle Bob</button>
            <button onClick={() => setShow2(!show2)}>Toggle Bob 2</button>

            {/* <Alice />
            <Charlie />
            <Dave />
            <Eve /> */}
        </div>
    );
}
