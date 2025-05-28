import React, { Link } from "react";

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-500 mb-4">
                    build with{" "}
                    <a href="https://github.com/Emsa001/ft_react" target="_blank" className="text-blue-500 hover:text-blue-700 transition-colors">
                        ft_react
                    </a>{" "}
                    · MIT Licensed · v3.0.0
                </p>
                <div className="flex justify-center gap-6">
                    <Link to="/docs" className="text-gray-400 hover:text-white transition-colors">
                        Documentation
                    </Link>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Examples (soon)
                    </a>
                    <a href="https://github.com/Emsa001/ft_react-showcase" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        GitHub - This page
                    </a>
                </div>
            </div>
        </footer>
    );
};
