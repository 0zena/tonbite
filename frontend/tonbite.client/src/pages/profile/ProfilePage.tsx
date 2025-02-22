import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserType } from "../../states";
import { UserService } from "../../services";
import { CircularProgress } from "@heroui/progress";
import {CourseList} from "../../components";

export const ProfilePage = () => {
    const [user, getUser] = useState<UserType | undefined>();

    useEffect(() => {
        UserService.Get(true).then((res) => getUser(res));
    }, []);

    return(
        <main>
            { user != undefined ? (
                    <div>
                        <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
                        <h2>{user.username ?? user.email}</h2>
                        {user.courses != undefined ? (
                            <CourseList data={user.courses} />
                        ) : (
                            <p>No courses yet</p>
                        )}
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </main>
    );
}
