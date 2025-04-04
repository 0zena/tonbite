import { CourseType, UserType } from "../../states";

// UI Components
import { Button } from "@heroui/button";
import { CourseMenuButton } from "../../components";

interface CourseHeaderActionProps {
    course?: CourseType;
    client?: UserType;
    editing: boolean;
    Buy: () => void;
    Edit: () => void;
    Delete: () => void;
}

export const CourseHeaderAction = ({course, client, editing, Buy, Edit, Delete}: CourseHeaderActionProps) => {
    if (course?.users?.isCourseOwner(client) || client?.roles?.hasRole("Admin"))
        return <CourseMenuButton editing={editing} onEdit={Edit} onDelete={Delete} />
    else if (course?.users?.isCourseBuyer(client))
        return <p>Purchased</p>
    else
        return <Button onPress={Buy} variant={"flat"} color={"primary"}>Buy</Button>
}