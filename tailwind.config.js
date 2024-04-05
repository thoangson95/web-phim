/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "sm-max": { max: "575px" },
            "md-max": { max: "767px" },
            "lg-max": { max: "991px" },
            "xl-max": { max: "1199px" },
        },
        extend: {
            colors: {
                body: "var(--color-body)",
                main: "var(--color-main)",
                hover: "var(--color-hover)",
            },
            backgroundImage: {
                "gradient-orange": "var(--color-gradient-orange)",
                "gradient-purple": "var(--color-gradient-purple)",
                "login-right":
                    "linear-gradient(136deg,rgb(240,248,255) -1%, rgb(219, 238, 255) 85%)",
            },
            backgroundPosition: {
                "left-center": "left center",
            },
            backgroundSize: {
                "100-100": "100% 100%",
                "auto-100": "auto 100%",
                "100-auto": "100% auto",
            },
            spacing: {
                container: "calc(50vw - 610px)",
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    "text-split": (value) => ({
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "white-space": "normal",
                        "-webkit-box-orient": "vertical",
                        display: "-webkit-box",
                        "-webkit-line-clamp": value,
                    }),
                },
                { values: theme("gridColumnStart") }
            );
        }),
    ],
};
