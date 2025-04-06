import {useEffect, useState} from "react";
import {CourseType} from "../../states";
import {CourseService} from "../../services";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {SortProps} from "../../services/extensions/SortProps.ts";
import {CourseList} from "../../components";

const filters: FilterProps = {

}

const sorting: SortProps = {
    desc: true,
}

export const HomePage = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        if (!courses.length) {
            CourseService
                .getList(sorting, filters)
                .then(x => {if (x) setCourses(x)});
        }
    }, []);

    return (
        <>
            Home page
            <div className={"flex justify-center"}>
                <CourseList data={courses} showStatus={true} />
            </div>
        </>
    );
};
