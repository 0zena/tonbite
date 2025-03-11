import { NavLink } from "react-router-dom";
import { CircularProgress } from "@heroui/progress";
import { CourseList } from "../../components";
import { Divider } from "@heroui/divider";
import { useAuth } from "../../provider/AuthProvider.tsx";
import {useEffect, useState} from "react";
import { CourseType } from "../../states";
import {UserService} from "../../services";

export const ProfilePage = () => {
    const [courses, setCourses] = useState<CourseType[]>();
    const { client } = useAuth();

    useEffect(() => {
        if (client?.id) {
            UserService
                .GetCourses(client.id)
                .then(res => setCourses(res));
        }
    }, [client?.id]);

    return (
        <main>
            { client != undefined ? (
                    <div>
                        <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
                        <h2>{client.username ?? client.email}</h2>
                        <Divider />
                        <div className={"p-6"}>
                            {courses?.length ? (
                                <CourseList data={courses} showStatus={true} />
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
