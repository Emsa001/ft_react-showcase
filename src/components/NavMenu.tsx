import React, { Link, LinkTarget, useNavigate } from "react";

import { Icon } from "./Icon";
import { FaGithub, FaBook } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { BUY_ME_A_COFFEE, GITHUB_FTREACT } from "../links";
import { IconType } from "react-icons";

interface NavLink {
    label: string;
    className: string;
    href?: string;
    target?: LinkTarget;
    icon: IconType;
}

export const NavMenu = () => {
    const isMobile = window.innerWidth < 640;
    const navigate = useNavigate();


    const links:NavLink[] = [
        {
            label: "Documentation",
            className: "hover:text-indigo-400",
            href: "/docs",
            target: "_self",
            icon: FaBook,
        },
        {
            label: "GitHub",
            className: "hover:text-blue-400",
            href: GITHUB_FTREACT,
            target: "_blank",
            icon: FaGithub,
        },
        {
            label: "Buy Me a Coffee",
            className: "hover:text-yellow-400",
            href: BUY_ME_A_COFFEE,
            target: "_blank",
            icon: SiBuymeacoffee
        },
    ];

    return (
        <nav className="fixed z-[100] w-screen bg-gray-900 border-b border-gray-800">
            <div className="mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
                <div
                    className="text-xl font-bold text-white cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    ft_react
                </div>
                <div className="flex gap-4">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            to={link.href || "#"}
                            target={link.target}
                            className={`text-white transition-colors flex items-center gap-2 ${link.className}`}
                        >
                            <Icon icon={link.icon} size={isMobile ? 30 : 20} />
                            <span className="hidden sm:block">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};
