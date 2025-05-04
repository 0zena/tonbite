import { Button } from "@heroui/react";
import { UserType } from "../../states";

interface UserListItemProps {
    user: UserType;
    onDelete: (id: number) => void;
}


export const UserListItem = ({ user, onDelete }: UserListItemProps) => {
    const remove = () => {
        onDelete(user.id!);
    }

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td><Button onPress={remove}>Delete</Button></td>
        </tr>
    )
}