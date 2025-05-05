import React, { useEffect, useState } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { MultiComponents } from "../../components/MultiComponents";
import { ArraySimple } from "../../components/ArraySimple";
import { ArrayComponents } from "../../components/ArrayComponents";
import { CustomHooks } from "../../components/CustomHooks";
import { CustomProvider } from "../../components/CustomProvider";
import { StaticStateNormalState, StaticStateSimple } from "../../components/StaticStateSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { Icon } from "../../components/Icons";
import { PropTest } from "../../components/PropTest";
import { ThreejsTest } from "../../components/ThreeJsTest";

export default function Home() {
    const [toggle, setToggle] = useState(true);
    const [state, setState] = useState(0);

    useEffect(() => {
        console.log("State changed", state);

        return () => {
            console.log("Cleanup");
        }
    }, [state])

    return (
        <div>
            {toggle && <StaticStateNormalState />}
            <button onClick={() => setToggle((prev) => !prev)}>Toggle</button>
            <hr />

            <StaticStateSimple />
            <StaticStateTest />

            <button onClick={() => setState((prev) => prev + 1)}>State: {state}</button>
            <ArraySimple />
        </div>
    );
}
