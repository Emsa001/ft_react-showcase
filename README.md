# ft_react

`ft_react` is my own implementation of the React library. This project is a work in progress and aims to replicate some of the core functionalities of React, including hooks, context, and routing.

## Motivation

The idea for this project came from my last project in my 42 coding school (ft_transcendence), where we were not allowed to use React. Therefore, I decided to write my own implementation of React. Please note that I do not recommend using this instead of React.

## Features

- **Routing**: Basic routing capabilities to navigate between different pages.
- **Hooks**: Implemented `useState`, `useEffect`, `useRef`, and `useContext` hooks.
- **Context and Providers**: Basic context API to manage global state.

## Current Issues

- **Rendering**: 
  - `useEffect` has issues, such as `setInterval` inside `useEffect` not working correctly.

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

Here is a basic example of how to use `ft_react`:

```tsx
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
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License.
