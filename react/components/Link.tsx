import React from "react";
import { useNavigate } from "./Navigate";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        props.onClick && props.onClick(event);

        if (!href.startsWith("http") && !href.startsWith("https")) {
            event.preventDefault();
            const navigator = useNavigate();
            navigator(href);
        }
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
