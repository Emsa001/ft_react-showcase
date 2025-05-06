import React from 'react';

export const NavMenu = () => {
    return (
        <nav className="fixed z-[100] w-screen bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold text-white">ft_react</div>
                <div className="flex gap-4">
                    <a
                        href="https://github.com/yourusername/ft_react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <span className="i-mdi-github w-5 h-5"></span>
                        GitHub
                    </a>
                    <a
                        href="https://www.npmjs.com/package/ft_react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <span className="i-mdi-npm w-5 h-5"></span>
                        NPM
                    </a>
                    <a
                        href="https://buymeacoffee.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span className="i-mdi-coffee w-5 h-5"></span>
                        Buy Me a Coffee
                    </a>
                </div>
            </div>
        </nav>
    );
}
