import { useEffect, useState } from "react";
import { SearchBar, UserList } from "../../components"
import { UserService } from "../../services";
import { UserType } from "../../states";

export const AdminPage = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<UserType[] | undefined>([]);

    useEffect(() => {
        if (search) {
            UserService.searchUsers(search).then(setUsers);
        } else {
            setUsers([]);
        }
    }, [search]);

    const searchUser = (key: string | undefined) => {
        setSearch(key ?? "");
    }

    const remove = (id: number) => {
        setUsers(users?.filter(user => user.id !== id));
    }

    return (
        <div>
            <h1>Admin</h1>
            <SearchBar label="Search User" placeholder="Search for a user by email, username or id" value={search} onSearch={searchUser} />
            {users && <UserList users={users} onDelete={remove} />}
        </div>
    )
}
