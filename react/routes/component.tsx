import React from "react";

interface RouterProps {
    src: string;
    component: React.ReactNode;
    default?: boolean;
}

export function Router(props: RouterProps) {
    const { src, component } = props;
    const path = window.location.pathname;

    if (path !== src) return null;

    return <div>{component}</div>;
}

export function BrowserRouter(props: { children: React.ReactNode }) {
    const { children } = props;

    let defaultRoute = null;

    for (const child of children as any) {
        if (child && child.props && child.props.component) {
            if (window.location.pathname === child.props.src) {
                return child.props.component;
            }

            if (child.props.default) {
                defaultRoute = <div>{child.props.component}</div>;
            }
        }
    }

    if (defaultRoute) {
        return defaultRoute;
    }

    return null;
}
