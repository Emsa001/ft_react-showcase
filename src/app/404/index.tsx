import React, { useEffect, useNavigate } from "react";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/profile");
    }, [])

    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
}