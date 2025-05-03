import { useAuth } from "../../provider/AuthProvider.tsx";
import { useEffect, useState } from "react";
import { UserService } from "../../services/UserService.ts";
import { UserCourseStatus } from "../../states/UserCourse.ts";
import { CourseType } from "../../states/Course.ts";

// Components
import { Divider } from "@heroui/divider";
import { CircularProgress } from "@heroui/progress";
import { UserCourses } from "./UserCourses.tsx";
import { UserSummary } from "./UserSummary.tsx";

export const ProfilePage = () => {
    const [createdCourses, setCreatedCourses] = useState<CourseType[]>();
    const [purchasedCourses, setPurchasedCourses] = useState<CourseType[]>();
    const [totalSoldCourses, setTotalSoldCourses] = useState<number>();
    const { client } = useAuth();

    useEffect(() => {
        if (client?.id) {
            UserService.getCourses(client.id, UserCourseStatus.creator)
                .then(res => setCreatedCourses(res));
            UserService.getCourses(client.id, UserCourseStatus.purchased)
                .then(res => setPurchasedCourses(res));
            UserService.getSoldCoursesCount()
                .then(res => setTotalSoldCourses(res));
        }
    }, [client?.id]);

    return (
        <main>
            { client ? (
                    <div>
                        <UserSummary user={client} 
                                     totalCourses={createdCourses?.length ?? 0} 
                                     totalPurchasedCourses={purchasedCourses?.length ?? 0} 
                                     totalSoldCourses={totalSoldCourses ?? 0} />
                        <Divider />
                        <UserCourses createdCourses={createdCourses} purchasedCourses={purchasedCourses} />
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </main>
    );
}
