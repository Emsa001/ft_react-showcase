import React, { useEffect, useState } from "react";
import { BooleanSimple, BooleanSimple2, BooleanSimple3 } from "../../components/BooleanSimple";
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

export default function Home() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div>
            {showMore && (
                <h1>Hello asd</h1>
            )}
            <button onClick={() => setShowMore(!showMore)}>
                {showMore ? "Hide" : "Show"} more
            </button>
            {showMore && (
                <h1>Hello World 1</h1>
            )}
            {showMore && (
                <h1>Hello World 2</h1>
            )}
            {showMore && (
                <h1>Hello World 3</h1>
            )}

        </div>
    );
}
