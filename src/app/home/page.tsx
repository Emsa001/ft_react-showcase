import React from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { MultiComponents } from "../../components/MultiComponents";
import { ArraySimple } from "../../components/ArraySimple";
import { ArrayComponents } from "../../components/ArrayComponents";
import { CustomHooks } from "../../components/CustomHooks";
import { CustomProvider } from "../../components/CustomProvider";
import { StaticStateSimple } from "../../components/StaticStateSimple";
import { Icon } from "../../components/Icons";
import { PropTest } from "../../components/PropTest";
import { ThreejsTest } from "../../components/ThreeJsTest";

export default function Home() {

    const [show, setShow] = React.useState(false);

    return (
        <div>
            Hello world!
            {/* <PropTest name="Person 1" age={22} />
            <PropTest name="Person 2" age={22} />
            <PropTest name="Person 3" age={25} /> */}
            {show && <ThreejsTest />}
            <button onClick={() => setShow(!show)}>Toggle</button>
        </div>
    );
}