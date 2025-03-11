import { NavLink } from "react-router-dom";
import { CircularProgress } from "@heroui/progress";
import { CourseList } from "../../components";
import { Divider } from "@heroui/divider";
import { useAuth } from "../../provider/AuthProvider.tsx";

export const ProfilePage = () => {
    const { client } = useAuth();

    return (
        <main>
            { client != undefined ? (
                    <div>
                        <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
                        <h2>{client.username ?? client.email}</h2>
                        <Divider />
                        <div className={"p-6"}>
                            {client.courses?.length ? (
                                <CourseList data={client.courses} showStatus={true} />
                            ) : (
                                <p>No courses yet</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </main>
    );
}
