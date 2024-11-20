import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Login
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const auThorized = () => {
        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                console.log("Token has expired.");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, auThorized }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);