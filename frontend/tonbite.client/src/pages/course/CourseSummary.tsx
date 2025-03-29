import { CourseType } from "../../states";
import { Button } from "@heroui/button";
import { NotFoundError } from "../error/NotFoundError.tsx";

export const CourseSummary = ({course}: {course: CourseType | undefined}) => {
    return (
        <>
            {course != undefined ? (
                <div className={"flex flex-col w-full items-center"}>
                    <h1 className={"font-bold max-md:text-2xl md:text-4xl"}>{course.name}</h1>
                    <div className={"text-start p-4 max-w-[900px]"}>
                        <p>{course.bio}</p>
                    </div>

                    <Button>Add Step</Button>
                </div>
            ) : (
                <NotFoundError />
            )}
        </>
    )
}
