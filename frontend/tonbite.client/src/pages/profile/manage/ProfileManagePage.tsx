import { Tabs, Tab } from "@heroui/tabs";
import { CircularProgress } from "@heroui/progress";
import { ChangePasswordForm } from "./ChangePasswordForm.tsx";
import { EditProfileForm } from "./EditProfileForm.tsx";
import { AdvancedSettingsForm } from "./AdvancedSettingsForm.tsx";
import { useAuth } from "../../../provider/AuthProvider.tsx";

export const ProfileManagePage = () => {
    const { client } = useAuth();

    return <main>
        <div className="flex w-full flex-col space-y-4 items-center">
            <h1 className={"text-2xl text-gradient font-bold"}>Manage Profile</h1>

            {client != undefined
                ? (
                    <div className={"flex w-fit h-max p-6"}>
                        <Tabs placement={"top"}>
                            <Tab key={"profile"} title={"Profile"}>
                                <div className={"flex justify-center"}>
                                    <EditProfileForm user={client} />
                                </div>
                            </Tab>
                            <Tab key={"changePassword"} title={"Change Password"} className={"w-full"}>
                                <div className={"flex justify-center"}>
                                    <ChangePasswordForm />
                                </div>
                            </Tab>
                            <Tab key={"advanced"} title={"Advanced"}>
                                <AdvancedSettingsForm roles={client.roles} />
                            </Tab>
                        </Tabs>
                    </div>
                ) : (
                    <CircularProgress className={"justify-self-center"} />
                )
            }
        </div>
    </main>;
}