import { UserCourseStatus, UserCourseType, UserType } from "../../states";

declare global {
    interface Array {
        isCourseOwner(this: UserCourseType[], client: UserType | undefined): boolean;
        isCourseBuyer(this: UserCourseType[], client: UserType | undefined): boolean;
    }
}

Array.prototype.isCourseOwner = function (this: UserCourseType[], client: UserType | undefined): boolean {
    return this.some(u => u.userId === client?.id && u.status === UserCourseStatus.creator);
};


Array.prototype.isCourseBuyer = function (this: UserCourseType[], client: UserType | undefined): boolean {
    return this.some(u => u.userId === client?.id && u.status === UserCourseStatus.purchased);
};

export {};