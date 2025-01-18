import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import AuthService from "../services/AuthService.ts";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children } : { children: ReactNode}) => {
    const [ token, setToken ] = useState(localStorage.getItem("accessToken"));

    const logout = () => {
        // TODO: HTTP Request for login
        setToken(null);
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
    };

    useEffect(() => {
        // TODO: Check Access token expire time via HTTP request or jwt decoder
        if (!token) {
            AuthService.RefreshToken().then((token) => {
                if (token) setToken(token);
                else logout();
            }).catch(() => { logout(); });
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            isAuthenticated: !!token,
            logout,
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;