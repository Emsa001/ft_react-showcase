import React, { ReactElement, useEffect, useState } from "react";

const App = (): ReactElement => {
    const [number, setNumber] = useState(1);
    const [number2, setNumber2] = useState(1);
    
    useEffect(() => {
        console.log('Component mounted or dependency changed');
        setNumber2(number + 1);
    }, [number]);

    return (
        <div>
            <h2>Hello {number} {number2}!</h2>
            <p>Hi there! !</p>
            <button onClick={() => setNumber(number + 1)}>Increment Number</button>
            <button onClick={() => setNumber2(number2 + 1)}>Increment Number 2</button>
        </div>
    );
}

export default App;