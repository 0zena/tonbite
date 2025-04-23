import {SortProps} from "../../services/extensions/SortProps.ts";

// UI Components
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";

interface BrowseSortingProps {
    onSort: (sortBy: SortProps) => void;
}

export const BrowseSorting = ({onSort}: BrowseSortingProps) => {
    const setSorting = (key: string) => {
        const sort: SortProps = {
            desc: key === "newest",
        };

        onSort(sort);
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button>
                        Sort By
                    </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key) => setSorting(key.toString())}>
                    <DropdownItem key={"newest"}>Newest</DropdownItem>
                    <DropdownItem key={"oldest"}>Oldest</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}