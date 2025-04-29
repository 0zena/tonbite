import { Tabs, Tab } from "@heroui/tabs";
import { CircularProgress } from "@heroui/progress";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { ChangePasswordForm } from "./ChangePasswordForm.tsx";
import { EditProfileForm } from "./EditProfileForm.tsx";
import { AdvancedSettingsForm } from "./AdvancedSettingsForm.tsx";
import { useAuth } from "../../../provider/AuthProvider.tsx";

export const ProfileManagePage = () => {
    const { client } = useAuth();

    return (
        <main className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <Card className="min-h-[600px]">
                    <CardHeader className="flex flex-col items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-200">
                            Manage Profile
                        </h1>
                    </CardHeader>

                    <CardBody className="flex flex-col">
                        {client ? (
                            <Tabs placement="top">
                                <Tab
                                    key="profile"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 group-data-[selected=true]:text-gray-200">General</span>
                                        </div>
                                    }
                                >
                                    <div className="flex mt-6 max-md:flex-col max-md:items-center">
                                        <EditProfileForm user={client} />
                                        <p className="mt-4 text-sm text-gray-400 px-4">
                                            Customize your public profile information. This information will be visible to other users on the platform.
                                            You can update your username, bio, and other personal details at any time.
                                        </p>
                                    </div>
                                </Tab>

                                <Tab
                                    key="changePassword"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 group-data-[selected=true]:text-gray-200">Password</span>
                                        </div>
                                    }
                                >
                                    <div className="flex mt-6 max-md:flex-col max-md:items-center">
                                        <ChangePasswordForm />
                                        <p className="mt-4 text-sm text-gray-400 px-4">
                                            Keep your account secure by regularly updating your password. 
                                            Make sure to use a strong password with a mix of letters, numbers, and special characters.
                                        </p>
                                    </div>
                                </Tab>

                                <Tab key="advanced"
                                     title={
                                         <div className="flex items-center space-x-2">
                                             <span className="text-gray-400 group-data-[selected=true]:text-gray-200">Advanced</span>
                                         </div>
                                     }>
                                    <div className="flex mt-6 max-md:flex-col max-md:items-center">
                                        <AdvancedSettingsForm roles={client.roles} />
                                        <p className="mt-4 text-sm text-gray-400 px-4">
                                            Manage your account roles and permissions. These settings control your access to different features
                                            and capabilities within the platform. Contact support if you need assistance with role management.
                                        </p>
                                    </div>
                                </Tab>
                            </Tabs>
                        ) : (
                            <div className="flex justify-center py-12">
                                <CircularProgress size="lg" />
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </main>
    );
};