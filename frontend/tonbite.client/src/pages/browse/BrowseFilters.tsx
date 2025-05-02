import {useState} from "react";
import {FilterProps} from "../../services/extensions/FilterProps.ts";
import {today, getLocalTimeZone, CalendarDate} from "@internationalized/date";

// UI Components
import {Icons} from "../../utils";
import {Slider} from "@heroui/slider";
import {Button} from "@heroui/button";
import {Icon} from "../../components";
import {RangeCalendar} from "@heroui/calendar";
import {DrawerContent, useDisclosure} from "@heroui/react";
import {Drawer, DrawerHeader, DrawerBody, DrawerFooter} from "@heroui/drawer";

interface BrowseFiltersProps {
    current: FilterProps;
    onApply: (filters: FilterProps) => void;
}

export const BrowseFilters = ({current, onApply}: BrowseFiltersProps) => {
    const dates = {
        start: current?.startDate ? new Date(current.startDate) : null,
        end: current?.endDate ? new Date(current.endDate) : null,
    }

    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [price, setPrice] = useState([Number(current.minPrice ?? 0), Number(current.maxPrice ?? 10)]);
    const [date, setDate] = useState({
        start: dates.start ? new CalendarDate(dates.start.getUTCFullYear(), dates.start.getUTCMonth() + 1, dates.start.getUTCDate()) : today(getLocalTimeZone()),
        end: dates.end ? new CalendarDate(dates.end.getUTCFullYear(), dates.end.getUTCMonth() + 1, dates.end.getUTCDate()) : today(getLocalTimeZone()),
    });

    const apply = () => {
        const form: FilterProps = {}

        form.minPrice = price[0].toString();
        form.maxPrice = price[1].toString();

        form.startDate = new Date(Date.UTC(date.start.year, date.start.month - 1, date.start.day)).toISOString();
        form.endDate = new Date(Date.UTC(date.end.year, date.end.month - 1, date.end.day)).toISOString();

        onApply(form);
        onClose();
    }

    const remove = () => {
        onApply({});
    }

    return (
        <>
            <Button startContent={<Icon icon={Icons.FILTERS} />}
                    color="warning" size={"lg"}
                    variant={"flat"}
                    radius={"sm"}
                    onPress={onOpen}>
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
                        <Button startContent={<Icon icon={Icons.DELETE} />}
                                color={"danger"}
                                variant={"light"}
                                onPress={remove}
                                className={"mr-auto"}>
                            Remove
                        </Button>
                        <Button startContent={<Icon icon={Icons.APPLY} />}
                                color={"primary"}
                                onPress={apply}>
                            Apply
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}