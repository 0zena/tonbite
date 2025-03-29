import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Icon } from "../icon/Icon.tsx";
import { Icons } from "../../utils";

interface MenuItemActions {
    onEdit: () => void;
    onDelete: () => void;
}

const menuItems = [
    {
      key: "edit",
      label: "Edit Course",
    },
    {
        key: "delete",
        label: "Delete Course",
    },
]

export const CourseMenuButton = ({ onEdit, onDelete }: MenuItemActions) => {
    const click = (key: string) => {
        switch (key) {
            case "edit":
                onEdit();
                break;
            case "delete":
                onDelete();
                break;
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant="bordered">
                    <Icon icon={Icons.MENU} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu items={menuItems}>
                {(item) => (
                    <DropdownItem key={item.key} onPress={() => click(item.key)}
                                  className={item.key === "delete" ? "text-danger" : ""}
                                  color={item.key === "delete" ? "danger" : "default"}>
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )
}