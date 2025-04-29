import React from "react";
import { BooleanSimple, BooleanSimple2 } from "../components/BooleanSimple";
import { BooleansMadnessLevels } from "../components/BooleansMadness";
import { StateChaosUltimate } from "../components/StateChaosUltimate";
import { StateApocalypse } from "../components/StateApocalypse";
import { ListenerSimple } from "../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../components/StaticStateTest";

export default function Home() {
    return (
        <div>
            <StateApocalypse />
            {/* <StaticStateTest />
            <StaticStateTest2 /> */}
        </div>
    );
}
