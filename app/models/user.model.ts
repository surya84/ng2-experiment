
export interface IUser {
    email?: string;
    password?: string;

    firstName?: string;
    lastName?: string;
    fullName?: string;

    roleName?: string;
}

export class User implements IUser {
    
}