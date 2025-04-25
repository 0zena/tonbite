import {useEffect, useState} from "react";
import {CourseType} from "../../states";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {SortProps} from "../../services/extensions/SortProps.ts";
import {CourseService} from "../../services";

// UI Components
import {Pagination} from "@heroui/pagination";
import {BrowseFilters} from "./BrowseFilters.tsx";
import {BrowseSorting} from "./BrowseSorting.tsx";
import {CourseList, SearchBar, LoadingLayout} from "../../components";

export const BrowsePage = () => {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState<FilterProps>({page: page});
    const [sorting, setSorting] = useState<SortProps>({});

    useEffect(() => {
        setLoading(true);
        CourseService
            .getList(sorting, filter)
            .then(x => {
                if (x) {
                    setCourses(x.courses ?? []);
                    setTotal(x.total ?? 0);
                }
                setLoading(false);
            });
    }, [page, filter, sorting]);

    const ApplyFilters = (form: FilterProps) => {
        setFilter(form);
    }

    const ApplySorting = (sortBy: SortProps) => {
        setSorting(sortBy);
    }

    const ApplySearch = (key: string | undefined) => {
        setFilter(prev => ({
            ...prev,
            searchKey: key,
        }));
    }

    if (loading) {
        return (<LoadingLayout />);
    }

    return (
        <main className={"space-between"}>
            <SearchBar value={filter.searchKey} onSearch={ApplySearch} />
            <BrowseSorting onSort={ApplySorting} />
            <BrowseFilters onApply={ApplyFilters} />

            <div className={"flex justify-center"}>
                <CourseList data={courses} showStatus={false} />
            </div>
            {courses.length > 0 && (<Pagination variant={"bordered"} page={page} onChange={setPage} total={(Math.ceil((total / 15)))} />)}
        </main>
    );
}