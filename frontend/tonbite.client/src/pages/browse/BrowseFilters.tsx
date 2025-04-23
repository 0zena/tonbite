import {useState} from "react";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {today, getLocalTimeZone} from "@internationalized/date";

// UI Components
import {Icons} from "../../utils";
import {Slider} from "@heroui/slider";
import {Button} from "@heroui/button";
import {Icon} from "../../components";
import {RangeCalendar} from "@heroui/calendar";
import {DrawerContent, useDisclosure} from "@heroui/react";
import {Drawer, DrawerHeader, DrawerBody, DrawerFooter} from "@heroui/drawer";

interface BrowseFiltersProps {
    onApply: (filters: FilterProps) => void;
}

export const BrowseFilters = ({onApply}: BrowseFiltersProps) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [price, setPrice] = useState([0, 10]);
    const [date, setDate] = useState({
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()),
    });

    const Apply = () => {
        const form: FilterProps = {}

        form.minPrice = price[0].toString();
        form.maxPrice = price[1].toString();

        form.startDate = new Date(Date.UTC(date.start.year, date.start.month - 1, date.start.day)).toISOString();
        form.endDate = new Date(Date.UTC(date.end.year, date.end.month - 1, date.end.day)).toISOString();

        onApply(form);
        onClose();
    }

    return (
        <>
            <Button startContent={<Icon icon={Icons.FILTERS} />} color="warning" variant="flat" onPress={onOpen}>
                Filters
            </Button>

            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>Apply Filters</DrawerHeader>
                    <DrawerBody>
                        <div className={"flex flex-col self-center gap-6 w-min"}>
                            <Slider label={"Price Range"}
                                    step={0.01}
                                    minValue={0}
                                    maxValue={10}
                                    value={price}
                                    // @ts-expect-error Slider's onChange expects a specific type signature not matched by useState setter.
                                    onChange={setPrice}
                                    formatOptions={{style: "currency", currency: "TON"}}
                            />
                            <span>
                                <h4 className={"text-center mb-2"}>Date Range</h4>
                                <RangeCalendar aria-label="Date (No Selection)" value={date} onChange={setDate} maxValue={today(getLocalTimeZone())} />
                            </span>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button startContent={<Icon icon={Icons.APPLY} />} color={"primary"} onPress={Apply}>Apply</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}