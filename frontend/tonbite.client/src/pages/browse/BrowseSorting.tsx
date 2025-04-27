import {SortProps} from "../../services/extensions/SortProps.ts";

// UI Components
import {Select, SelectItem} from "@heroui/select";
import {ChangeEvent} from "react";

interface BrowseSortingProps {
    selected: string;
    onSort: (sortBy: SortProps) => void;
}

export const BrowseSorting = ({selected, onSort}: BrowseSortingProps) => {
    const setSorting = (e: ChangeEvent<HTMLSelectElement>) => {
        const newKey = e.target.value;
        const sort: SortProps = {
            desc: newKey === "newest",
        };

        onSort(sort);
    }

    return (
        <Select isRequired size={"sm"}
                label="Sort by"
                selectedKeys={[selected]}
                onChange={setSorting}
                className={"max-w-56"}>
            <SelectItem key={"newest"}>Newest</SelectItem>
            <SelectItem key={"oldest"}>Oldest</SelectItem>
        </Select>
    );
}