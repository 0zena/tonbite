import { UserType } from "../../states";
import { Button } from "@heroui/button";
import { NavLink } from "react-router-dom";
import { Icon, UserSummaryCard } from "../../components";
import { Icons } from "../../utils";
import { Card, CardHeader, CardBody } from "@heroui/card";

interface UserSummaryProps {
    user: UserType;
    totalCourses: number;
    totalPurchasedCourses: number;
    totalSoldCourses: number;
}

export const UserSummary = ({ user, totalCourses, totalPurchasedCourses, totalSoldCourses }: UserSummaryProps) => {
    return (
        <div className="max-w-4xl mx-auto md:p-6">
            <Card>
                <CardHeader className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                            {user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-start gap-2 max-md:items-center max-md:flex-col">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-100">
                                    {user.username ?? user.email}
                                </h2>
                            </div>
                            <Button startContent={<Icon icon={Icons.SETTINGS} />} as={NavLink} to={"manage"}>
                                Manage
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="mt-4">
                        <div className="text-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-200">About Me</h3>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4 min-h-[100px] border border-gray-700">
                            <p className="text-start text-gray-300 whitespace-pre-wrap">
                                {user.bio || "No bio provided yet."}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 max-md:grid-cols-1">
                        <UserSummaryCard value={totalCourses} label={"Created Courses"} />
                        <UserSummaryCard value={totalPurchasedCourses} label={"Purchased Courses"} />
                        <UserSummaryCard value={totalSoldCourses} label={"Total Sold"} />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};