import { RoleType } from "../../states";

declare global {
    interface Array {
        hasRole(this: RoleType[], role: string): boolean;
    }
}

Array.prototype.hasRole = function (this: RoleType[], role: string): boolean {
    return this.some(r => r.name === role);
};

export {};