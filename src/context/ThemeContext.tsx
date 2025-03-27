import { createContext, useState, ReactNode, useEffect } from "react";

// Define theme context type with strict types
interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

// Create Theme Context
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme Provider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">(
        (localStorage.getItem("theme") as "light" | "dark") || "light"
    );

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save preference
    };

    // Apply theme to document class & remove previous class
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
