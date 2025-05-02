import React, { BrowserRouter, Router } from "react";
import Home from "./home/page";
import "./global.css";

export default function Root() {

    return (
        <BrowserRouter>
            <Router src="/" component={<Home />} />
            {/* <Router src="/useSyncExternalStore" component={<TodosApp />} />
            <Router src="/profile" component={<Profile />} />
            <Router src="*" component={<NotFound />} /> */}
        </BrowserRouter>
    );
}
