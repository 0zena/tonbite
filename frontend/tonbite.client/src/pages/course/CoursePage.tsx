import { useEffect, useState } from "react";
import { CourseType } from "../../states";
import { CourseService } from "../../services/CourseService.ts";
import { useParams } from "react-router-dom";
import { Visibility } from "../../states/Course.ts";

export const CoursePage = () => {
    const [course, setCourse] = useState<CourseType | undefined>();
    const {id} = useParams();

    useEffect(() => {
        CourseService.Get(id).then(r => setCourse(r));
    }, [id]);

    const visibilityName = course?.visibility !== undefined ? Visibility[course.visibility] : '';

    return (
        <main>
            {course != undefined ? (
                <div className={"text-start"}>
                    <p>{course.name}</p>
                    <p>{course.bio}</p>
                    <p>{visibilityName}</p>
                </div>
            ) : (
                <>progress</>
            )}
        </main>
    )
}
