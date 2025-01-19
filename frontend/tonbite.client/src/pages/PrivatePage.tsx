import { useAuth } from "../provider/AuthProvider.tsx";

const PrivatePage = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className={"flex flex-col items-center"}>
            {isAuthenticated ? (<p>IsAuth</p>) : (<p>notAuth</p>)}
            <button onClick={logout}>Logout</button>
        </header>
    );
};

export default PrivatePage;