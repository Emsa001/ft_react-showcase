import routes from "../../src/routes";

export function matchRoute(path: string) {
    const pathParts = path.split("/").filter(Boolean);

    for (let route of routes) {
        const routeParts = route.path.split("/").filter(Boolean);

        const paramNames = routeParts
            .filter((e) => e.startsWith(":"))
            .map((e) => ({
                name: e.replace("?", "").slice(1),
                optional: e.endsWith("?"),
            }));
    
        if (pathParts.length > routeParts.length) continue;

        let params: Record<string, string | undefined> = {};
        let match = true;

        for (let i = 0; i < routeParts.length; i++) {
            const routeSegment = routeParts[i];
            const pathSegment = pathParts[i];

            if (routeSegment.startsWith(":")) {
                const { name, optional } = paramNames.find(p => p.name === routeSegment.replace(":", "").replace("?", ""))!;

                if (!pathSegment && !optional) {
                    match = false;
                    break;
                }

                params[name] = pathSegment || undefined;
            } else if (routeSegment !== pathSegment) {
                match = false;
                break;
            }
        }

        if (match)
            return { route, params };
    }

    return { route: routes.find((r) => r.path === "/404"), params: {} };
}