import React, { useEffect, useNavigate } from "react";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        // Optional: Redirect to the home page after a delay
        const timer = setTimeout(() => navigate("/"), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
                Go Back Home
            </button>
            <p className="text-gray-500 text-sm mt-4">
                You will be redirected to the homepage in 5 seconds.
            </p>
        </div>
    );
}