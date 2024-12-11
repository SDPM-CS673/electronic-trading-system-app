// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../services/api-call.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessionLoad, setSessionLoad] = useState(false);

    useEffect(() => {
        get("/auth/session", "team3").then((result) => {
            if (result && Object.keys(result).length > 0) {
                setUserDetails(result);
                setIsLoggedIn(true);
            }
            setSessionLoad(true);
        }).catch((error) => {
            console.error(error);
            setSessionLoad(true);
        });
    }, []);

    const login = (userData) => {
        setUserDetails(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUserDetails(null);
        setIsLoggedIn(false);
    };

    if (!sessionLoad) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ userDetails, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);