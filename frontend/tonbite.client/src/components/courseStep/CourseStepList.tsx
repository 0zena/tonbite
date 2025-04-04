import {CourseStepCard} from "./CourseStepCard.tsx";
import {CourseStepType} from "../../states";

export const CourseStepList = ({data}: {data: CourseStepType[]}) => {
    return (
        <div className={"space-y-4 w-full max-w-[900px]"}>
            {data.map((item, index) => (
                <CourseStepCard item={item} key={index} />
            ))}
        </div>
    );
}