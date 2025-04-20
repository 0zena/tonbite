import {useEffect, useState} from "react";
import {CourseType} from "../../states";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {SortProps} from "../../services/extensions/SortProps.ts";
import {CourseService} from "../../services";
import {CourseList} from "../../components";
import {Pagination} from "@heroui/pagination";

export const BrowsePage = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const filters: FilterProps = {
        page: page,
    }

    const sorting: SortProps = {
        desc: true,
    }

    useEffect(() => {
        CourseService
            .getList(sorting, filters)
            .then(x => {
                if (x) {
                    setCourses(x.courses ?? []);
                    setTotal(x.total ?? 0);
                }
            });
    }, [page]);

    return (
        <main className={"space-between"}>
            <div className={"flex justify-center"}>
                <CourseList data={courses} showStatus={false} />
            </div>
            <Pagination variant={"bordered"} page={page} onChange={setPage} total={(Math.ceil((total / 15)))} />
        </main>
    );
}