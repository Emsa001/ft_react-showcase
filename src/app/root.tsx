import React from "react";
import Home from "./home/page";
import "./global.css";

export default function Root() {
    return (
        <div>
            <div>
                <Home />
            </div>
        </div>
    );
}

React.render(<Root />, document.getElementById("root") as HTMLElement);
