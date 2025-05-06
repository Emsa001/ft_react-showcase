import React, { BrowserRouter, Router } from "react";
import "./global.css";

import Home from "./home/page";
import Memes from "./memes/page";
import NotFound from "./404";
import { NavMenu } from "../components/NavMenu";
import { Footer } from "../components/Footer";

export default function Root() {
    return (
        <div>
            <NavMenu />

            <BrowserRouter>
                <Router src="/" component={<Home />} />
                <Router src="/memes" component={<Memes />} />
                <Router src="/404" component={<NotFound />} default />
            </BrowserRouter>

            <Footer />
        </div>
    );
}
