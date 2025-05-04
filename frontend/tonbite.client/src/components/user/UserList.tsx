import { UserType } from "../../states";
import { UserListItem } from "./UserListItem";
import "./UserList.scss";
import { ConfirmModal, useConfirmModal } from "../modal";
import { UserService } from "../../services";

interface UserListProps {
    users: UserType[];
    onDelete: (id: number) => void;
}

export const UserList = ({ users, onDelete }: UserListProps) => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();

    const remove = async (id: number) => {
        if (!await confirmAction()) return;
        await UserService.delete(id);
        onDelete(id);
    }

    return (
        <>
            <table className="user-list">
                <thead> 
                    <tr>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserListItem key={user.id} user={user} onDelete={remove} />
                    ))}
                </tbody>
            </table>
        
            <ConfirmModal isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            onConfirm={handleConfirmResult}
                            title="Delete User?"
                            message="Are you sure you want to delete this user? This action cannot be undone." />
        </>
    )
}