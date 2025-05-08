import React, { Link, useEffect, useState } from "react";

const memes = [
    "/public/memes/meme1.png",
    "/public/memes/meme2.png",
    "/public/memes/meme3.png",
    "/public/memes/meme4.png",
    "/public/memes/meme5.png",
    "/public/memes/meme6.png",
    "/public/memes/meme7.png",
];

const Meme = ({ url, onClick }: { url: string; onClick: () => void }) => (
    <div
        className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={onClick}
    >
        <img src={url} className="w-full h-auto rounded-md" />
    </div>
);

const Modal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false);
            setTimeout(onClose, 200);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 "
            onClick={handleBackdropClick}
        >
            <div
                className={`relative transform transition-all duration-200 p-4 bg-gray-900 rounded-lg ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <img
                    src={imageUrl}
                    className="max-w-full max-h-screen rounded-lg shadow-2xl"
                    alt="Meme"
                />
            </div>
        </div>
    );
};

export default function MemesPage() {
    const [selectedMeme, setSelectedMeme] = useState<string | null>(null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 text-white">
            <h1 className="text-4xl font-bold mb-8">Memes Page</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {memes.map((meme) => (
                    <Meme key={meme} url={meme} onClick={() => setSelectedMeme(meme)} />
                ))}
            </div>
            {selectedMeme && (
                <Modal imageUrl={selectedMeme} onClose={() => setSelectedMeme(null)} />
            )}

            <Link to="/">
                <button className="p-4 text-white duration-100 bg-gray-800 hover:bg-gray-800/50 rounded-xl">
                    Go back
                </button>
            </Link>
        </div>
    );
}
