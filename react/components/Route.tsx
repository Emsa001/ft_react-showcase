import React from "react"

interface RouteProps {
    path: string;
    component: React.ReactNode;
}

export function Route({ path, component }: RouteProps): React.ReactElement | null {
    const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

    React.useEffect(() => {
        const handleRouteChange = () => setCurrentPath(window.location.pathname);
        window.addEventListener("popstate", handleRouteChange);
        return () => window.removeEventListener("popstate", handleRouteChange);
    }, []);

    return currentPath === path ? <>{component}</> : null;
}
