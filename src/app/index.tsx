import React from "react";

const App = () => {
    const [count, setCount] = React.useState(12);
    const [name, setName] = React.useState("Anonymous");
    const [test, setTest] = React.useState([1, 2]);
    const [test2, setTest2] = React.useState([1, 2,3,4,5]);

    React.useEffect(() => {
        React.setTitle(`Hello, ${name}!`);
    }, [name]);

    const remove = () => {
        test.pop();
        setTest(test);
        test2.pop();
        setTest2(test2);
    };

    const add = () => {
        test.push(test.length + 1);
        setTest(test);

        test2.push(test2.length + 1);
        setTest2(test2);
    };

    return (
        <div>
            <h1 style={{ color: "red" }}>Hello, {name}!</h1>
            <div>
                <p>Number: {count}</p>
                <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <button onClick={add}>Add</button>
            <button onClick={remove}>Remove</button>

            <div style={{ backgroundColor: "red" }}>
                {test.map((e) => {
                    return <div>{e}</div>;
                })}
            </div>

            <div style={{ backgroundColor: "blue" }}>
                {test.map((e) => {
                    return <div>{e}</div>;
                })}
            </div>

            <div>
                <div>
                    <h1>Hello</h1>
                    <div style={{ backgroundColor: "green" }}>
                        {test2.map((e) => {
                            return <div>{e}</div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
