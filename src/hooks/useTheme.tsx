import { useEffect, useStatic } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useStatic("theme", localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const themeLink = document.createElement("link");
        themeLink.rel = "stylesheet";
        themeLink.type = "text/css";
        themeLink.id = "hljs-theme";

        const themeHref =
            theme === "dark" ? 
            "/public/github-dark-dimmed.min.css" : 
            "/public/github.min.css";

        themeLink.href = themeHref;
        document.head.appendChild(themeLink);

        return () => {
            const existing = document.getElementById("hljs-theme");
            if (existing) existing.remove();
        };
    }, [theme]);

    return {
        theme,
        setTheme,
    };
};
