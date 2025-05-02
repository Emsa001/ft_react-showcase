import React, { useEffect, useState, useStatic } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";
import { MultiComponents } from "../../components/MultiComponents";
import { ArraySimple } from "../../components/ArraySimple";
import { ArrayComponents } from "../../components/ArrayComponents";
import { CustomHooks } from "../../components/CustomHooks";
import { CustomProvider } from "../../components/CustomProvider";
import { StaticStateSimple } from "../../components/StaticStateSimple";

export default function Home() {

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            {/* <StaticStateTest /> */}
            {isVisible && <StaticStateSimple />}
            <button onClick={() => setIsVisible((prev) => !prev)}>Toggle</button>
        </div>
    );
}
