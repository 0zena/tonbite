export interface Pagination<T> {
    courses: T[];
    total: number;
    max: number;
}