import {useEffect, useState} from "react";
import {CourseType} from "../../states";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {SortProps} from "../../services/extensions/SortProps.ts";
import {CourseService} from "../../services";

// UI Components
import {Slider} from "@heroui/slider";
import {Button} from "@heroui/button";
import {CourseList, Icon} from "../../components";
import {DrawerContent, useDisclosure} from "@heroui/react";
import {Pagination} from "@heroui/pagination";
import {Drawer, DrawerHeader, DrawerBody, DrawerFooter} from "@heroui/drawer";
import {Icons} from "../../utils";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";

export const BrowsePage = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [price, setPrice] = useState([0, 10]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const filters: FilterProps = {
        page: page,
    }

    const sorting: SortProps = {
        desc: false,
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

    const ApplyPrice = () => {
        filters.minPrice = price[0].toString();
        filters.maxPrice = price[1].toString();
    }

    return (
        <main className={"space-between"}>
            <Button startContent={<Icon icon={Icons.FILTERS} />} color="warning" variant="flat" onPress={onOpen}>
                Filters
            </Button>

            <Dropdown>
                <DropdownTrigger>
                    <Button>
                        Sort By
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key={"newest"}>Newest</DropdownItem>
                    <DropdownItem key={"oldest"}>Oldest</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>Apply Filters</DrawerHeader>
                    <DrawerBody>
                        <div>
                            <Slider label={"Price"}
                                    step={0.01}
                                    minValue={0}
                                    maxValue={10}
                                    value={price}
                                    formatOptions={{style: "currency", currency: "TON"}}
                            />
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button startContent={<Icon icon={Icons.APPLY} />} color={"primary"} onPress={ApplyPrice}>Apply</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <div className={"flex justify-center"}>
                <CourseList data={courses} showStatus={false} />
            </div>
            <Pagination variant={"bordered"} page={page} onChange={setPage} total={(Math.ceil((total / 15)))} />
        </main>
    );
}