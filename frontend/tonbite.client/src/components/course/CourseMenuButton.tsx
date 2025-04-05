import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import {Icon} from "../icon/Icon.tsx";
import {Icons} from "../../utils";
import {Visibility} from "../../states/Course.ts";

interface MenuItemActions {
    editing: boolean;
    visibility: Visibility;
    onEdit: () => void;
    onDelete: () => void;
    onChange: () => void;
}

export const CourseMenuButton = ({ editing, visibility, onEdit, onDelete, onChange }: MenuItemActions) => {
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
                                  description={editing ? "Cancel Editing Course" : "Edit Course"}
                                  onPress={onEdit}>
                        {editing ? "Cancel Edit" : "Edit"}
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger zone">
                    <DropdownItem key="delete"
                                  className="text-danger"
                                  color="danger"
                                  description="Permanently delete the course"
                                  onPress={onDelete}>
                        Delete
                    </DropdownItem>
                    <DropdownItem key="visibility"
                                  className="text-danger"
                                  color="danger"
                                  description={visibility === Visibility.private
                                      ? "Change course visibility to public"
                                      : "Change course visibility to private" }
                                  onPress={onChange}>
                        Change Visibility
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}