import React, { useEffect, useState } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";

const TestComponent = ({ children }: { children?: any }) => {

    const [data, setData] = useState(0);

    return (
        <div>
            <h2>Test Component</h2>
            {data}
            <button onClick={() => setData(data + 1)}>Click</button>
            <div>
                {children}
            </div>
        </div>
    );
};

const Component = () => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div>
            {isVisible && (<h1>Hello World</h1>)}
            <button onClick={handleClick}>Toggle</button>
        </div>
    )
}

export default function Home() {

    const [show, setShow] = useState(true);

    return (
        <TestComponent>
            <h1>This is from home</h1>
            <Component />
            <hr />
            <h1>BooleanSimple</h1>
            {show && <BooleanSimple />}
        </TestComponent>
    );
}
