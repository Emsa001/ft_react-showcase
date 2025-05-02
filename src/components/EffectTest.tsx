import React, { useEffect, useRef, useState } from "react";

export function EffectTest() {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<number>(0);
    const [height, setHeight] = useState<number>(100); // Start with a fixed height
    const [trigger, setTrigger] = useState<boolean>(false); // Toggle to trigger re-render

    // Using useEffect to read the height and adjust the position after painting
    useEffect(() => {
        if (divRef.current) {
            const divHeight = divRef.current.offsetHeight;
            setPosition(divHeight + 50); // Position element below the div
        }
    }, [height, trigger]); // Re-run when height or trigger changes

    return (
        <div>
            <button onClick={() => setTrigger(!trigger)}>Toggle Height (useEffect)</button>

            {/* First div with a dynamic height */}
            <div ref={divRef} style={{
                height: `${height}px`,
                backgroundColor: trigger ? "lightcoral" : "lightblue", // Toggle color
                transition: "height 1s, background-color 1s", // Add animation to height and background
            }}>
                I'm a div with dynamic height!
            </div>

            {/* Second div that moves based on the first div's height */}
            <div style={{
                marginTop: position + "px",
                backgroundColor: "pink",
                transition: "margin-top 1s", // Smooth transition for margin-top
            }}>
                Positioned based on the height of the first div.
            </div>
        </div>
    );
}