import { useEffect, useState } from "react";
import { UserService } from "../../../services";
import { UserType } from "../../../states";
import { Tabs, Tab, CircularProgress, Card } from "@heroui/react";
import { ChangePasswordForm } from "./ChangePasswordForm.tsx";
import { EditProfileForm } from "./EditProfileForm.tsx";

export const ProfileManagePage = () => {
    const [user, getUser] = useState<UserType | undefined>();

    useEffect(() => {
        UserService.Get().then((res) => getUser(res));
    }, []);

    return <main>
        <div className="flex w-full flex-col space-y-4">
            <h1>Manage Profile</h1>

            {user != undefined
                ? (
                    <Card className={"flex w-fit h-max p-6 justify-center"}>
                        <Tabs placement={"top"}>
                            <Tab key={"profile"} title={"Profile"}>
                                <div className={"flex justify-center"}>
                                    <EditProfileForm user={user} />
                                </div>
                            </Tab>
                            <Tab key={"changePassword"} title={"Change Password"} className={"w-full"}>
                                <div className={"flex justify-center"}>
                                    <ChangePasswordForm />
                                </div>
                            </Tab>
                            <Tab key={"advanced"} title={"Advanced"}>
                                Advanced settings
                            </Tab>
                        </Tabs>
                    </Card>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </div>
    </main>;
}