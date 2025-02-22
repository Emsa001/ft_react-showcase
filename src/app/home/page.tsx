import React, { useState } from "react";
import Test from "./Component";

export default function Home() {
    const [id] = useState(Math.floor(Math.random() * 4) + 1);
    const [test, setTest] = useState(1);

    return (
        <div>
            <Test />
        </div>
    );
}
