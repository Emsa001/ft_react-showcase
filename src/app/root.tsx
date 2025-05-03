import React, { BrowserRouter, Router } from "react";
import "./global.css";

import Home from "./home/page";
import Profile from "./profile/page";
import NotFound from "./404";

export default function Root() {

    return (
        <BrowserRouter>
            <Router src="/" component={<Home />} />
            <Router src="/profile" component={<Profile />} />
            <Router src="/404" component={<NotFound />} default />
        </BrowserRouter>
    );
}
