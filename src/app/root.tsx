import React, { BrowserRouter, Router } from "react";
import "../styles/global.css";

import Home from "./home/page";
import Memes from "./memes/page";
import Docs from "./docs/page";
import NotFound from "./404/page";

import { NavMenu } from "../components/NavMenu";
import { Footer } from "../components/Footer";
import { useTheme } from "../hooks/useTheme";

export default function Root() {
    useTheme();

    return (
        <div className="flex flex-col min-h-screen">
            <NavMenu />

            <main className="flex-grow">
                <BrowserRouter>
                    <Router src="/" component={<Home />} />
                    <Router src="/docs/:page1?/:page2?/:page3?" component={<Docs />} />
                    <Router src="/memes" component={<Memes />} />
                    <Router src="/404" component={<NotFound />} default />
                </BrowserRouter>
            </main>

            {!window.location.pathname.includes("/docs") && <Footer />}
        </div>
    );
}