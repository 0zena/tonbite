import { useAuth } from "../../provider/AuthProvider.tsx";

// Components
import { Divider } from "@heroui/divider";
import { CircularProgress } from "@heroui/progress";
import { UserCourses } from "./UserCourses.tsx";
import { UserSummary } from "./UserSummary.tsx";

export const ProfilePage = () => {
    const { client } = useAuth();

    return (
        <main>
            { client != undefined ? (
                    <div>
                        <UserSummary user={client} />
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
