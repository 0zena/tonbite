import { CourseType } from "../../states";
import { CourseCard } from "./CourseCard.tsx";

export const CourseList = ({data, showStatus}: {data: CourseType[], showStatus: boolean}) => {
    return (
        <div className={"grid gap-4 grid-cols-3 w-full max-sm:grid-cols-1 max-lg:grid-cols-2"}>
            {data.map((item, index) => (
                <CourseCard item={item} showStatus={showStatus} key={index} />
            ))}
        </div>
    );
}