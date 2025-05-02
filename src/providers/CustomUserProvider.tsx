import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

// Define the context type
interface UserContextType {
    user: string;
    setUser: (user: string) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to access the user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// UserProvider component
export const UserProvider = ({ children }: { children?: any }) => {
    const [user, setUser] = useState("Ellen");

    // useEffect(() => {
    //     setUser("Emanuel");
    // }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </div>
    );
};
