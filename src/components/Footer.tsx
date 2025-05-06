import React from "react";

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-gray-800 mt-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-gray-500 mb-4">ft_react Hook Library · MIT Licensed · v3.0.0</p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Documentation
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Examples
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        GitHub
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        NPM
                    </a>
                </div>
            </div>
        </footer>
    );
};
