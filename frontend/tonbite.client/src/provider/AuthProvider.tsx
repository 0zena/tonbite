import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import AuthService from "../services/AuthService.ts";
import { jwtDecode, JwtPayload } from "jwt-decode";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children } : { children: ReactNode}) => {
    const [ token, setToken ] = useState(localStorage.getItem("accessToken"));

    const isTokenExpired = (token: string) : boolean => {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp != undefined)
            return decoded.exp < Math.floor(Date.now() / 1000)
        return true;
    }

    const logout = () => {
        AuthService.Logout().then(() => { setToken(null); });
    };

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
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