import { Tabs, Tab } from "@heroui/tabs";
import {CourseType} from "../../states";
import {CourseList} from "../../components";

interface UserCoursesProps {
    createdCourses: CourseType[] | undefined;
    purchasedCourses: CourseType[] | undefined;
}

export const UserCourses = ({createdCourses, purchasedCourses}: UserCoursesProps) => {
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