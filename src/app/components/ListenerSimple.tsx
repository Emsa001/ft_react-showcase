import React, { useState, useEffect } from "react";

function ChildComponent() {
    const [test, setTest] = useState(0);

    useEffect(() => {
        console.log("✅ Child mounted");

        return () => {
            console.log("❌ Child unmounted");
        };
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            setTest((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
            console.log("❌ Child unmounted but different function");
        };
    }, []);

    useEffect(() => {
        console.log("Child updated");



    }, [test]);

    return (
        <div>
            👶 I am the Child Component <button onClick={() => setTest((prev) => prev + 1)}>Test {test}</button>
        </div>
    );
}

export function ListenerSimple() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <h1>Parent</h1>
            <button onClick={() => setIsVisible((v) => !v)}>{isVisible ? "Hide Child" : "Show Child"}</button>

            {isVisible && <ChildComponent />}
        </div>
    );
}
