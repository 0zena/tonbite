import { UserType } from "../../states";
import { Button } from "@heroui/button";
import { NavLink } from "react-router-dom";
import {Icon} from "../../components";
import {Icons} from "../../utils";

export const UserSummary = ({user}: {user: UserType}) => {
    return (
        <div className="grid grid-cols-2 px-4">
            <span>
                <h2>{user.username ?? user.email}</h2>
                <p className={"text-start"}>{user.bio}</p>
                <p>Total Courses: {user.courses?.length ?? 0}</p>
            </span>
            <span>
                <Button as={NavLink} to={"manage"}><Icon icon={Icons.SETTINGS} />Manage</Button>
            </span>
        </div>
    );
}