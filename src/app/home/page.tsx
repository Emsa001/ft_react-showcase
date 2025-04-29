import React, { useEffect, useState, useStatic } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";

export default function Home() {

    const [test, setTest] = useStatic("test", "World");
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Hello {test}</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Set World</button>
        </div>
    );
}
