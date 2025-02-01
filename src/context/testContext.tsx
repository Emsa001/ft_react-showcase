import React, { FC, useState } from "react";
import { createContext, useContext } from "react";

interface TestContextType {
    number: number;
    setNumber: (number: number) => void;

    name: string;
    setName: (name: string) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

const TestProvider: FC<{ children?: any }> = ({ children }) => {
    const [number, setNumber] = useState<number>(1);
    const [name, setName] = useState<string>("Emanuel");

    return <TestContext.Provider value={{ number, setNumber, name, setName }}>{children}</TestContext.Provider>;
};

export const useTest = () => {
    const context = useContext(TestContext);

    if (TestContext._calledByProvider === false) {
        throw new Error("useTest must be used within a TestProvider");
    }
    
    return context;
};

export { TestContext };
export default TestProvider;
