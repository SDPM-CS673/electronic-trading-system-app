// context/AuthContext.js
import React, { createContext, useState, useContext,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem("userDetails");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

        if (storedUserDetails && storedIsLoggedIn === "true") {
            setUserDetails(JSON.parse(storedUserDetails));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        setUserDetails(userData);
        setIsLoggedIn(true);

        // Persist the authentication state
        localStorage.setItem("userDetails", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setUserDetails(null);
        setIsLoggedIn(false);

        // Clear the persisted state
        localStorage.removeItem("userDetails");
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{ userDetails, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);