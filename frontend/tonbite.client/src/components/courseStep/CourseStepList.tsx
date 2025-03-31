import {CourseStepCard} from "./CourseStepCard.tsx";
import {CourseStepType} from "../../states";

export const CourseStepList = ({data}: {data: CourseStepType[]}) => {
    return (
        <div className={"grid gap-4 grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2"}>
            {data.map((item, index) => (
                <CourseStepCard item={item} key={index} />
            ))}
        </div>
    );
}