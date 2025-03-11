import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useTonConnectUI } from '@tonconnect/ui-react';
import { AuthService, UserService } from "../services";
import { UserType } from "../states";

type AuthContextType = {
    client: UserType | undefined;
    token: string | null;
    setClient: (user: UserType | undefined) => void;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children } : { children: ReactNode}) => {
    const [ token, setToken ] = useState(localStorage.getItem("accessToken"));
    const [ client, setClient ] = useState<UserType | undefined>();
    const [tonConnectUI] = useTonConnectUI();

    const isTokenExpired = (token: string) : boolean => {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.exp != undefined)
            return decoded.exp < Math.floor(Date.now() / 1000)
        return true;
    }

    const logout = () => {
        AuthService.Logout().then(() => { setToken(null); });
        tonConnectUI.disconnect().then();
    };

    useEffect(() => {
        if (token) {
            UserService.Get(false, true).then(res => setClient(res));
        }
    }, [token]);

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            AuthService.RefreshToken().then((token) => {
                if (token) setToken(token);
                else logout();
            }).catch(() => { logout(); });
        }
    }, [logout, token]);

    const contextValue = useMemo(
        () => ({
            client,
            token,
            setClient,
            setToken,
            isAuthenticated: !!token,
            logout,
        }),
        [client, logout, token]
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