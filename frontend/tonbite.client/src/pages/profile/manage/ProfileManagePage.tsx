import { useEffect, useState } from "react";
import { UserService } from "../../../services";
import UserProps from "../../../states/UserProps.ts";
import { Tabs, Tab, CircularProgress } from "@heroui/react";
import { ChangePasswordForm } from "./ChangePasswordForm.tsx";

export const ProfileManagePage = () => {
    const [user, getUser] = useState<UserProps | undefined>();

    useEffect(() => {
        UserService.Get().then((res) => getUser(res));
    }, []);

    return <main>
        <div className="flex w-full flex-col space-y-4">
            <h1>Manage Profile</h1>

            {user != undefined
                ? (
                    <Tabs placement={"top"}>
                        <Tab key={"profile"} title={"Profile"}>
                            Profile
                        </Tab>
                        <Tab key={"changePassword"} title={"Change Password"} className={"w-full"}>
                            <div className={"flex justify-center w-full"}>
                                <ChangePasswordForm />
                            </div>
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