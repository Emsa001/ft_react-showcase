import React, { ReactElement, useState, useEffect, useRef } from "react";

const App = (): ReactElement => {
    const [count, setCount] = useState(1);

    /* 
        TODO: Fix the setInterval issue
        doesnt update the count correctly
    */
    useEffect(() => {
        setInterval(() => {
            console.log(count);
            setCount((prev) => prev + 1);
        },1000);
    },[])

    return (
        <div>
            {count}
        </div>
    );
};

export default App;
