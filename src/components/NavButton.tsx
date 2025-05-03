import React, { useNavigate } from "react";

export default function NavButton({ to, label }: { to: string; label: string }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(to)}
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
            {label}
        </button>
    );
}
