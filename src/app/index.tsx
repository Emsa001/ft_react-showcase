import React, { useEffect } from 'react';

const App = () => {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState("Anonymous");

    useEffect(() => {
        React.setTitle(`Hello, ${name}!`);
    },[name]);

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Number: {count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
            <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    );
};

export default App;