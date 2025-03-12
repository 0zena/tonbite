import { RoleType } from "../../states";

declare global {
    interface Array {
        hasRole(this: RoleType[], role: string): boolean;
        hasOneOfRole(this: RoleType[], role: string, alt: string): boolean;
    }
}

Array.prototype.hasRole = function (this: RoleType[], role: string): boolean {
    return this.some(r => r.name === role);
};


Array.prototype.hasOneOfRole = function (this: RoleType[], role: string, alt: string): boolean {
    return this.some(r => r.name === role || r.name === alt);
};

export {};