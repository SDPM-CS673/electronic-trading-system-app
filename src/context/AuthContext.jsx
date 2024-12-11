// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem("userDetails");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    }, []);

    const login = (userData) => {
        setUserDetails(userData);
        setIsLoggedIn(true);


    };

    const logout = () => {
        setUserDetails(null);
        setIsLoggedIn(false);
        window.location.href = "/";


    };

    return (
        <AuthContext.Provider value={{ userDetails, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);