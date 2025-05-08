import React, { useNavigate } from "react";

import { Icon } from "./Icon";
import { FaGithub } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import { BUY_ME_A_COFFEE, GITHUB_FTREACT } from "../links";

export const NavMenu = () => {
    const isMobile = window.innerWidth < 640;
    const navigate = useNavigate();

    return (
        <nav className="fixed z-[100] w-screen bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div
                    className="text-xl font-bold text-white cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    ft_react
                </div>
                <div className="flex gap-4">
                    <a
                        href={GITHUB_FTREACT}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository for ft_react"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Icon icon={FaGithub} size={isMobile ? 30 : 20} />
                        <span className="hidden sm:block">GitHub</span>
                    </a>
                    <a
                        href={BUY_ME_A_COFFEE}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Support on Buy Me a Coffee"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Icon icon={SiBuymeacoffee} size={isMobile ? 30 : 20} />
                        <span className="hidden sm:block">Buy Me a Coffee</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};
