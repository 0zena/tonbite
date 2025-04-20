import { Tabs, Tab } from "@heroui/tabs";
import { CourseType, UserCourseStatus, UserType } from "../../states";
import { UserService } from "../../services";
import { useEffect, useState } from "react";
import {CourseList} from "../../components";

export const UserCourses = ({client}: {client: UserType}) => {
    const [createdCourses, setCreatedCourses] = useState<CourseType[]>();
    const [purchasedCourses, setPurchasedCourses] = useState<CourseType[]>();

    useEffect(() => {
        if (client?.id) {
            UserService.getCourses(client.id, UserCourseStatus.creator)
                .then(res => setCreatedCourses(res));
            UserService.getCourses(client.id, UserCourseStatus.purchased)
                .then(res => setPurchasedCourses(res));
        }
    }, [client?.id]);

    return (
        <div className={"p-6"}>
                <Tabs>
                    <Tab key={"created"} title={"My Courses"}>
                        {createdCourses?.length ? (
                            <CourseList data={createdCourses} showStatus={true} />
                        ) : (
                            <p>No courses yet</p>
                        )}
                    </Tab>
                    <Tab key={"purchased"} title={"Purchased Courses"}>
                        {purchasedCourses?.length ? (
                            <CourseList data={purchasedCourses} showStatus={true} />
                        ) : (
                            <p>No courses yet</p>
                        )}
                    </Tab>
                </Tabs>
        </div>
    )
}