import { useEffect, useState } from "react";
import { UserService } from "../../services";
import UserProps from "../../states/UserProps.ts";
import { Tabs, Tab, CircularProgress } from "@heroui/react";
import { ChangePassword } from "./manage/ChangePassword.tsx";

export const ProfilePage = () => {
    const [user, getUser] = useState<UserProps | undefined>();

    useEffect(() => {
        UserService.Get().then((res) => getUser(res));
    }, []);

    return <main>
        <div className={"flex flex-col max-w-96 justify-self-center"}>
            {user != undefined
                ? (
                    <Tabs fullWidth>
                        <Tab key={"profile"} title={"Profile"}>
                            Profile
                        </Tab>
                        <Tab key={"changePassword"} title={"Change Password"}>
                            <ChangePassword />
                        </Tab>
                        <Tab key={"advanced"} title={"Advanced"}>
                            Advanced settings
                        </Tab>
                    </Tabs>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </div>
    </main>;
}
