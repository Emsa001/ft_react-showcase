import { ReactElement } from 'react';
import React from 'react';
import TestPage from './test';
import TestProvider from '../context/testContext';

const App = (): ReactElement => {
    const [count, setCount] = React.useState<number>(0);
    const [name, setName] = React.useState<string>("");

    return (
        <TestProvider>
            <h1>Hello, {name}!</h1>
            <p>Number: {count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
            <input onChange={(e) => setName(e.target.value)} />
            <TestPage />
        </TestProvider>
    );
};

export default App;