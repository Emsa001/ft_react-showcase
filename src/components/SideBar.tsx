import React, { Link, useEffect, useState, useStatic } from "react";
import { IconType } from "react-icons";
import { Icon } from "./Icon";
import { FiChevronDown, FiChevronRight, FiChevronLeft } from "react-icons/fi";

export interface NavItemProps {
    parentLink?: string;
    label: string;
    link?: string;
    icon?: IconType;
    childs?: NavItemProps[];
    hr?: boolean;
}

interface SideBarProps {
    items: NavItemProps[];
    isOpen: boolean;
    toggle: () => void;
}

export const SideBar = ({ items, isOpen, toggle }: SideBarProps) => {
    return (
        <aside
            className={`h-full pb-16 z-[100] fixed w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800 overflow-y-auto custom-scrollbar 
            ${isOpen ? "-translate-x-0" : "-translate-x-48"} 
            transition-transform duration-300 ease-in-out`}
        >
            <div className="flex justify-between items-center p-6 text-xl font-bold tracking-tight border-b border-gray-800">
                Docs
                {/* Close button (only visible on mobile) */}
                <button className="lg:hidden" onClick={toggle}>
                    <Icon icon={isOpen ? FiChevronLeft : FiChevronRight} size={18} />
                </button>
            </div>

            <div className={`${isOpen ? "block" : "hidden lg:block"} flex-1 flex flex-col`}>
                <nav className="flex-1 px-4 py-6 text-sm space-y-1">
                    {items.map((item, index) => (
                        <div key={index}>
                            <NavItem {...item} />
                        </div>
                    ))}
                </nav>

                <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
                    © 2025{" "}
                    <a
                        href="https://github.com/emsa001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Emanuel
                    </a>
                </div>
            </div>
        </aside>
    );
};

const NavItem = ({ parentLink, label, link, icon, childs, hr }: NavItemProps) => {
    const location = window.location;
    const hasChildren = childs && childs.length > 0;
    const id = label.toLowerCase().replace(/\s+/g, "-");

    let resolvedLink = link || id;
    if (parentLink) {
        const cleanParent = parentLink.replace(/\/+$/, "");
        const cleanResolved = resolvedLink.replace(/^\/+/, "");
        if (location.pathname.replace(/\/+$/, "") !== cleanParent) {
            resolvedLink = `${cleanParent}/${cleanResolved}`;
        }
    }

    const basePath = (() => {
        if (!parentLink) return resolvedLink;
        return parentLink.replace(/\/+$/, "");
    })();

    /*
    WARNING: This is a temporary workaround and NOT the optimal or correct way to manage active state.
    
    We're using `useStatic` to persist the 'open' state across full re-renders, since navigation currently causes
    the entire app (including the root component) to re-render and reset local state.
    
    Once navigation updates are properly handled in ft_react,
    this should be replaced with `useState` for proper reactivity and lifecycle alignment.
    
    TODO: Replace `useStatic` with `useState` after implementing persistent navigation behavior.
    */

    const isActive =
        location.pathname.replace(/\/+$/, "") === resolvedLink ||
        (hasChildren && location.pathname.startsWith(basePath));
    const [open, setOpen] = useStatic(id, isActive);

    if (hr) {
        return <hr className="my-2 border-gray-800" />;
    }

    if (hasChildren) {
        return (
            <div>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-lg text-gray-400 font-semibold uppercase text-xs tracking-wider transition-colors hover:bg-gray-800 hover:text-white`}
                >
                    <span className="flex items-center gap-2">
                        {icon && <Icon className="text-gray-500" icon={icon} />}
                        {label}
                    </span>
                    {open ? (
                        <Icon icon={FiChevronDown} size={14} />
                    ) : (
                        <Icon icon={FiChevronRight} size={14} />
                    )}
                </button>

                <div
                    className={`ml-3 pl-2 border-l border-gray-800 overflow-hidden transition-all duration-300 ease-in-out space-y-1 ${
                        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    {childs.map((child, idx) => (
                        <NavItem key={idx} {...child} parentLink={link} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Link
            to={resolvedLink}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
        >
            {icon && <Icon className="text-gray-400" icon={icon} />}
            <span>{label}</span>
        </Link>
    );
};
