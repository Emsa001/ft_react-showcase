import React, { BrowserRouter, Router } from "react";
import Home from "./home/page";
import NotFound from "./404";
import "./global.css";
import { UserProvider } from "../providers/user";

export default function Root() {
    return (
        <body className="bg-gray-100 font-serif text-gray-900">
            <UserProvider>
                <BrowserRouter>
                    <Router src="/" component={<Home />} />
                    <Router src="/404" component={<NotFound />} default />
                </BrowserRouter>
            </UserProvider>
        </body>
    );
}