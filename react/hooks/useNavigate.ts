import React from "..";

export const useNavigateHook = () => {
    const navigate = (path: string) => {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new Event("popstate"));
    };

    return navigate;
}