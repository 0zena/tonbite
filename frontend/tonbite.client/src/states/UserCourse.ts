export enum UserCourseStatus {
    creator = 0,
    purchased = 1,
}

export type UserCourseType = {
    userId?: number;
    courseId?: number;
    status?: UserCourseStatus;
    createdAt?: string;
}