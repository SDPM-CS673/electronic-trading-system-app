// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/api-call.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessionLoad, setSessionLoad] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        get("/auth/session", "team3").then((result) => {
            if (result && Object.keys(result).length > 0) {
                console.log(result);
                setUserDetails(result);
                setIsAdmin(result.admin_status)
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
        navigate("/product/list") // route to product list page after login
    };

    const logout = () => {
        setUserDetails(null);
        setIsLoggedIn(false);
        navigate("/"); // route to base page after logout
    };

    if (!sessionLoad) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ userDetails, isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);