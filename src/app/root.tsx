import React from "react";
import "./global.css";

export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    );
}
