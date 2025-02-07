import { NavLink } from "react-router-dom";

export const ProfilePage = () => {
    return <main>
        <NavLink to={"manage"} title={"Manage profile"}>Manage</NavLink>
    </main>;
}
