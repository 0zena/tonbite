import { useEffect, useState } from "react";
import { SearchBar, UserList } from "../../components"
import { UserService } from "../../services";
import { UserType } from "../../states";
import { StatisticsService } from "../../services/StatisticsService";
import { SummaryForm } from "../../states/SummaryForm";
import { StatisticsSummary } from "./StatisticsSummary";
export const AdminPage = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<UserType[] | undefined>([]);
    const [summary, setSummary] = useState<SummaryForm | undefined>(undefined);

    useEffect(() => {
        if (search) {
            UserService.searchUsers(search).then(setUsers);
        } else {
            setUsers([]);
        }
    }, [search]);

    useEffect(() => {
        StatisticsService.getSummary().then(setSummary);
    }, []);

    const searchUser = (key: string | undefined) => {
        setSearch(key ?? "");
    }

    const remove = (id: number) => {
        setUsers(users?.filter(user => user.id !== id));
    }

    return (
        <div className="flex flex-col gap-4">
            {summary && <StatisticsSummary summary={summary} />}
            <SearchBar label="Search User" placeholder="Search for a user by email, username or id" value={search} onSearch={searchUser} />
            <UserList users={users ?? []} onDelete={remove} />
        </div>
    )
}
