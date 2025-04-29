import React, { useEffect } from "react";
import { BooleanSimple, BooleanSimple2 } from "../../components/BooleanSimple";
import { BooleansMadnessLevels } from "../../components/BooleansMadness";
import { StateChaosUltimate } from "../../components/StateChaosUltimate";
import { StateApocalypse } from "../../components/StateApocalypse";
import { ListenerSimple } from "../../components/ListenerSimple";
import { StaticStateTest, StaticStateTest2 } from "../../components/StaticStateTest";
import { ReactToasts } from "../../components/ReactToasts";

const TestComponent = ({ children }: { children: any }) => {
    return (
        <div>
            <h2>Test Component</h2>
            {children}
        </div>
    );
};

export default function Home() {
    return (
        <TestComponent>
            <h1>React 18.3</h1>
            {/* <ReactToasts /> */}
        </TestComponent>
    );
}
