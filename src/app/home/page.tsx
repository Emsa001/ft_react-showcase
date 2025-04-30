import React, { useEffect, useState, useStatic } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";
import MultiComponents from "../../components/MultiComponents";

export default function Home() {
    return (
        <div>
            <MultiComponents />
        </div>
    );
}
