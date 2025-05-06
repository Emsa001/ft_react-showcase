import React, { useEffect, useNavigate } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import NavButton from "../../components/NavButton";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/profile");
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <Card>
                <Header title="❌ 404 - Not Found" />
                <p className="text-center text-gray-400 mb-6">
                    The page you're looking for doesn't exist.
                </p>
                <div className="flex justify-center">
                    <NavButton to="/" label="🏠 Return Home" />
                </div>
            </Card>
        </div>
    );
}
