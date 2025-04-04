import { useAuth } from "../../provider/AuthProvider.tsx";

// Components
import { Divider } from "@heroui/divider";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@heroui/progress";
import { UserCourses } from "./UserCourses.tsx";

export const ProfilePage = () => {
    const { client } = useAuth();

    return (
        <main>
            { client != undefined ? (
                    <div>
                        <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
                        <h2>{client.username ?? client.email}</h2>
                        <Divider />
                        <UserCourses client={client} />
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </main>
    );
}
