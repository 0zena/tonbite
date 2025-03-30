import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Icon } from "../icon/Icon.tsx";
import { Icons } from "../../utils";

interface MenuItemActions {
    editing: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

export const CourseMenuButton = ({ editing, onEdit, onDelete }: MenuItemActions) => {
    const menuItems = [
        {
            key: "edit",
            label: editing ? "Cancel Editing Course" : "Edit Course",
        },
        {
            key: "delete",
            label: "Delete Course",
        },
    ]

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