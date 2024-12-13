import { useState, useEffect } from "react";
import "./CambiarTema.css";

export const CambiarTema = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button className="theme-switcher" onClick={toggleTheme}>
            <span className={`icon ${theme === "light" ? "moon" : "sun"}`}></span>
        </button>
    );
};

