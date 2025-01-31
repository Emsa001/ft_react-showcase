import TestProvider from "../context/testContext";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import TestPage from "./test";
import TestPage2 from "./test2";

const App = (): ReactElement => {
    return (
        <TestProvider>
            <b>hello</b>
            <TestPage />
            <TestPage2 />
        </TestProvider>
    );
};

export default App;