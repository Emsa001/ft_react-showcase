import React, { useEffect, useState, useStatic } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";

export const NewComponent = () => {

    const [state, setState] = useState(0);

    return (
        <div>
            <h1>New Component</h1>
            <p>it works!</p>
            <p>State: {state}</p>
            <button onClick={() => (setState((prev) => prev + 1))}>Click</button>
        </div>
    )

}

export default function Home() {
    return (
        <div>
            <StaticStateTest />
            <StaticStateTest2 />
        </div>
    );
}
