import React, { useEffect } from 'react';

const App = () => {
    const [count, setCount] = React.useState<number>(0);
    const [name, setName] = React.useState<string>("Anonymous");

    useEffect(() => {
        React.setTitle(`Hello, ${name}!`);
    }, [name]);

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Number: {count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
            <input value={name} onChange={(e: any) => setName(e.target.value)} />
        </div>
    );
};

export default App;