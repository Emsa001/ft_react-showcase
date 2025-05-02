import React from "..";

export const useNavigationHook = () => {
    const navigate = (path: string) => {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new Event("popstate"));
    };

    return navigate;
}