/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx,html}"],
    theme: {
        extend: {
            glass: "bg-clip-padding backdrop-filter backdrop-blur-md",
        },
    },
    plugins: [],
};
