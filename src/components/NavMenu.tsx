import React, { useNavigate } from "react";

import { Icon } from "./Icon";
import { FaGithub, FaNpm } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

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
                        href="#"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Icon icon={FaGithub} size={isMobile ? 30 : 20} />
                        <span className="hidden sm:block">GitHub</span>
                    </a>
                    <a
                        href="#"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <Icon icon={FaNpm} size={isMobile ? 30 : 20} />
                        <span className="hidden sm:block">NPM</span>
                    </a>
                    <a
                        href="#"
                        rel="noopener noreferrer"
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
