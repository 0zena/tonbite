import { CourseType } from "../../states";

export const CourseSummary = ({course}: {course: CourseType}) => {
    return (
        <div className={"flex flex-col w-full items-center"}>
            <h1 className={"py-4 font-bold max-md:text-2xl md:text-4xl text-gradient"}>{course.name}</h1>
            <div className={"text-start p-4 max-w-[900px]"}>
                <p>{course.bio}</p>
            </div>
        </div>
    )
}
