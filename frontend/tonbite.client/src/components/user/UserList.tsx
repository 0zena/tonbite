import { UserType } from "../../states";
import { ConfirmModal, useConfirmModal } from "../modal";
import { UserService } from "../../services";
import { useAuth } from "../../provider/AuthProvider";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { Icon } from "../icon/Icon";
import { Icons } from "../../utils";

interface UserListProps {
    users: UserType[];
    onDelete: (id: number) => void;
}

export const UserList = ({ users, onDelete }: UserListProps) => {
    const {isOpen, onOpenChange, confirmAction, handleConfirmResult} = useConfirmModal();
    const { client } = useAuth();

    const remove = async (id: number) => {
        if (!await confirmAction()) return;
        await UserService.delete(id);
        onDelete(id);
    }

    return (
        <>
            <Table aria-label="User List" className="user-list">
                <TableHeader> 
                    <TableColumn>ID</TableColumn>
                    <TableColumn>USERNAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No users to display."}>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="text-center">{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {client?.id !== user.id && 
                                (<Button isIconOnly 
                                         variant="light" 
                                         color="danger" 
                                         startContent={<Icon icon={Icons.DELETE} />} 
                                         onPress={() => remove(user.id!)} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        
            <ConfirmModal isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            onConfirm={handleConfirmResult}
                            title="Delete User?"
                            message="Are you sure you want to delete this user? This action cannot be undone." />
        </>
    )
}