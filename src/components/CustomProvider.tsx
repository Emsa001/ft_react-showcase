import { UserProvider, useUser } from "../providers/CustomUserProvider";
import React from "react";

const FirstComponent = () => {
    const { user } = useUser();

    return (
        <div>
            <h1>First Component</h1>
            <p>User: {user}</p>
        </div>
    );
};

const SecondComponent = () => {
    const { user, setUser } = useUser();

    return (
        <div>
            <h1>Second Component</h1>
            <p>User: {user}</p>
            <button onClick={() => setUser("New User")}>Set User</button>
        </div>
    );
};

const ThirdComponent = () => {
    return (
        <div>
            <h1>Third Component</h1>
        </div>
    );
};

export function CustomProvider() {
    return (
        <div>
            <UserProvider>
                <FirstComponent />
                <SecondComponent />
                <ThirdComponent />
            </UserProvider>
        </div>
    );
}
