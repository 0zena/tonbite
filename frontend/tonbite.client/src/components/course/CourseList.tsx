import {CourseType} from "../../states";
import {CourseCard} from "./CourseCard.tsx";

export const CourseList = ({data}: {data: CourseType[]}) => {

    return data.map((item, index) => (
        <CourseCard item={item} key={index} />
    ))
}