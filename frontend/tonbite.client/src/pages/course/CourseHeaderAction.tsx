import { CourseType, UserType } from "../../states";

// UI Components
import { Button } from "@heroui/button";
import { CourseMenuButton } from "../../components";
import {TonConnectButton} from "@tonconnect/ui-react";

interface CourseHeaderActionProps {
    course?: CourseType;
    client?: UserType;
    editing: boolean;
    Buy: () => void;
    Edit: () => void;
    Delete: () => void;
    Change: () => void;
}

export const CourseHeaderAction = ({course, client, editing, Buy, Edit, Delete, Change}: CourseHeaderActionProps) => {
    if (course?.users?.isCourseOwner(client) || client?.roles?.hasRole("Admin"))
        return <CourseMenuButton visibility={course!.visibility!} editing={editing} onEdit={Edit} onDelete={Delete} onChange={Change} />
    else if (course?.users?.isCourseBuyer(client))
        return <p>Purchased</p>
    else
        return (
            <>
                <TonConnectButton />
                <Button onPress={Buy} variant={"flat"} color={"primary"}>Buy</Button>
            </>
        )
}