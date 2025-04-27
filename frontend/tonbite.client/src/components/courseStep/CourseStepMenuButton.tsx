// UI Components
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {Icon} from "../icon/Icon.tsx";
import {Icons} from "../../utils";

interface CourseStepMenuButtonProps {
    editing: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

export const CourseStepMenuButton = ({editing, onEdit, onDelete}: CourseStepMenuButtonProps) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant="bordered">
                    <Icon icon={Icons.MENU} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection showDivider>
                    <DropdownItem key="edit"
                                  description={editing ? "Cancel Editing Step" : "Edit Step"}
                                  onPress={onEdit}>
                        {editing ? "Cancel Edit" : "Edit"}
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem key="delete"
                                  className="text-danger"
                                  color="danger"
                                  description="Permanently delete course step"
                                  onPress={onDelete}>
                        Delete
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}