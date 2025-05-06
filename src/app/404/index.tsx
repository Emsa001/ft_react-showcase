import React, { useEffect, useNavigate } from "react";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/profile");
    }, []);

    return <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4"></div>;
}
