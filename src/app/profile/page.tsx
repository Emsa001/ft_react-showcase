import React, { useEffect, useRef, setTitle } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import NavButton from "../../components/NavButton";

export default function Profile() {
    const mountedRef = useRef(false);

    useEffect(() => {
        setTitle("Profile - Dark Themed");
        if (!mountedRef.current) {
            console.log("Profile mounted");
            mountedRef.current = true;
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <Card>
                <Header title="👤 Your Profile" />
                <p className="text-gray-400 mb-4 text-center">
                    This profile page logs a message once on mount (check console).
                </p>
                <div className="flex justify-center">
                    <NavButton to="/" label="← Back Home" />
                </div>
            </Card>
        </div>
    );
}
