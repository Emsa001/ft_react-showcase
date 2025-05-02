import React, { useEffect, useState, useStatic } from 'react';
import { EffectTest } from '../../components/EffectTest';

const StaticComponent = () => {
    const [test, setTest] = useStatic("simple", 20);

    return (
        <div>
            <p>Static test: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Click</button>
        </div>
    );
}

const NormalComponent = () => {
    const [test, setTest] = useState(0);

    return (
        <div>
            <p>Normal test: {test}</p>
            <button onClick={() => setTest((prev) => prev + 1)}>Click</button>
        </div>
    );
}

const App = () => {
    const [staticTest, setStaticTest] = useStatic("username", 50);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        console.log("Static test changed:", staticTest);
    }, [staticTest]);

    useEffect(() => {
        console.log("Static test changed:", staticTest);
    }, [staticTest]);

    useEffect(() => {
        console.log("Static test changed:", staticTest);
    }, [staticTest]);

    return (
        <div>
            <EffectTest />
            <button onClick={() => setStaticTest((prev) => prev + 1)}>Click</button>
        </div>
    )

    // return (
    //     <div>

    //         {isVisible && <StaticComponent />}
    //         {isVisible && <NormalComponent />}

    //         <hr />
            
    //         <button onClick={() => setIsVisible((prev) => !prev)}>
    //             Toggle
    //         </button>

    //         <p>Static value: {staticTest}</p>
    //     </div>
    // );

};

export default App;