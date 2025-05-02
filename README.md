# ft_react

`ft_react` is my own implementation of the React library. This project is a work in progress and aims to replicate some of React’s core functionalities, including hooks, context, and routing.

## Motivation

The idea for this project came from my final project at 42 coding school (`ft_transcendence`), where using React was not allowed. Therefore, I decided to write my own implementation of React.  
> ⚠️ This library is intended for learning purposes only and is **not** recommended for production use.

## Features

- **Routing**: Basic routing capabilities for navigation between different pages.
- **Hooks**: Implemented `useState`, `useStatic`, `useEffect`, `useRef`, `useContext` and `useNavigation`.
- **Context and Providers**: A basic context API for managing global state.

### What is `useStatic`?

`useStatic` is a custom hook I always wanted to have in React, so I implemented it here. It works like `useState`, except it retains its value across the entire application and can be shared between components.

**Example:**

```tsx
import React, { useStatic } from "react";

function AnotherComponent() {
    const [test, setTest] = useStatic("simple", 0);

    return (
        <div>
            <p>Value test in another component: {test}</p>
        </div>
    );
}

export function StaticStateSimple() {
    const [test, setTest] = useStatic("simple", 0);

    return (
        <div>
            <p>Simple static test: {test}</p>
            <AnotherComponent />
            <button onClick={() => setTest((prev) => prev + 1)}>Click</button>
        </div>
    );
}
```

Even after the component unmounts, the static value `"simple"` will persist. It can also be accessed in different components, and the value will be shared with need of using Context providers. 
`useStatic` optimally tracks all subscribed to it components and updates them as needed.

## Known Issues

### Required Parent Element

Each component requires a parent element such as `<div>`. For example:

❌ **This will crash:**

```tsx
export function CustomProvider() {
    return (
        <UserProvider>
            <FirstComponent />
            <SecondComponent />
            <ThirdComponent />
        </UserProvider>
    );
}
```

✅ **This works:**

```tsx
export function CustomProvider() {
    return (
        <div>
            <UserProvider>
                <FirstComponent />
                <SecondComponent />
                <ThirdComponent />
            </UserProvider>
        </div>
    );
}
```

## Installation

To get started with `ft_react`, clone the repository and install the dependencies:

```bash
git clone https://github.com/emsa001/ft_react.git
cd ft_react
npm install
```

## Usage

To start the development server:

```bash
npm run dev
```

## Example

Here’s a basic example of how to use `ft_react`:

```tsx
import React, { useState, useEffect, setTitle } from 'react';

const App = () => {
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>("Anonymous");

    useEffect(() => {
        setTitle(`Hello, ${name}!`);
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
```

### Example Routing

*(Work in progress)*

```tsx
<BrowserRouter>
    <Router src="/" component={<Home />} />
    <Router src="/404" component={<NotFound />} default />
</BrowserRouter>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.