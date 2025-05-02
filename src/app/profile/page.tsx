import React, { useNavigation } from "react";

export default function Profile() {
    const navigate = useNavigation();

    const goToHome = () => {
        navigate("/");
    };

    return (
        <div>
            <p>User profile</p>
            <button onClick={goToHome}>Go to Home</button>
        </div>
    );
}
