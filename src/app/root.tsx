import React from "react";
import Home from "./home/page";
import "./global.css";

export default function Root() {
    return (
        <Home />
    );
}

React.render(<Root />, document.getElementById("root") as HTMLElement);
