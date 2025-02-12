import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserType } from "../../states";
import { UserService } from "../../services";
import { CircularProgress } from "@heroui/react";

export const ProfilePage = () => {
    const [user, getUser] = useState<UserType | undefined>();

    useEffect(() => {
        UserService.Get().then((res) => getUser(res));
    }, []);

    return(
        <main>
            { user != undefined ? (
                    <div>
                        <h2>{user.username ?? user.email}</h2>
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
            <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
        </main>
    );
}
