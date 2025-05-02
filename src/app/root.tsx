import React, { BrowserRouter, Router } from "react";
import Home from "./home/page";
import "./global.css";
import Profile from "./profile/page";
import NotFound from "./404";
import TodosApp from "../components/useSyncExternalStoreTets";

export default function Root() {

    return (
        <BrowserRouter>
            <Router src="/" component={<Home />} />
            <Router src="/useSyncExternalStore" component={<TodosApp />} />
            <Router src="/profile" component={<Profile />} />
            <Router src="*" component={<NotFound />} />
        </BrowserRouter>
    );
}
