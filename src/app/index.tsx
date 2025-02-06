import React from "react";

const App = () => {
    const [count, setCount] = React.useState(12);
    const [name, setName] = React.useState("Anonymous");

    React.useEffect(() => {
        React.setTitle(`Hello, ${name}!`);
    }, [name]);

    return (
        <div>
            <h1 style={{ color: "red" }}>
                Hello, {name}!
            </h1>
            <div>
                <p>Number: {count}</p>
                <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </div>
    );
};

export default App;
