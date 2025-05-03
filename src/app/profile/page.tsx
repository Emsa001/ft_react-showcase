import React, { useNavigate } from "react";

export default function Profile() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    return (
        <div>
            <p>User profile</p>
            <button onClick={goToHome}>Go to Home</button>
            <button onClick={() => navigate("/404")}>Go to 404</button>
        </div>
    );
}
