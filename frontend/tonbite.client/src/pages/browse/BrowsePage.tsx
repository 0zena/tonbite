import {useEffect, useState} from "react";
import {CourseType} from "../../states";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {SortProps} from "../../services/extensions/SortProps.ts";
import {CourseService} from "../../services";

// UI Components
import {Pagination} from "@heroui/pagination";
import {BrowseFilters} from "./BrowseFilters.tsx";
import {BrowseSorting} from "./BrowseSorting.tsx";
import {CourseList, SearchBar, LoadingLayout, Icon} from "../../components";
import {Button} from "@heroui/button";
import {Icons} from "../../utils/Icons.ts";

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

    const applyFilters = (form: FilterProps) => {
        setFilter(form);
    }

    const applySorting = (sortBy: SortProps) => {
        setSorting(sortBy);
    }

    const applySearch = (key: string | undefined) => {
        setFilter(prev => ({
            ...prev,
            searchKey: key,
        }));
    }

    const clearAll = () => {
        setFilter({page: 1});
        setSorting({});
    }

    if (loading) {
        return (<LoadingLayout />);
    }

    return (
        <div className={"flex flex-col h-full gap-6"}>
            <SearchBar value={filter.searchKey} onSearch={applySearch} />
            <span className={"flex items-center justify-end gap-4 max-sm:flex-col max-sm:items-start"}>
                <BrowseSorting selected={sorting.desc ? "newest" : "oldest"} onSort={applySorting} />
                <BrowseFilters current={filter} onApply={applyFilters} />
                <Button startContent={<Icon icon={Icons.CANCEL} />} size={"lg"} radius={"sm"} onPress={clearAll}>
                    Clear All
                </Button>
            </span>

            <h2 className={"text-start text-2xl font-bold"}>Available Courses</h2>

            <div className={"flex justify-center pt-6 border-t w-full"}>
                <CourseList data={courses} showStatus={false} />
            </div>
            {courses.length > 0 && (<Pagination variant={"bordered"}
                                                page={page}
                                                onChange={setPage}
                                                total={(Math.ceil((total / 15)))}
                                                className={"flex mt-auto justify-center"} />
            )}
        </div>
    );
}