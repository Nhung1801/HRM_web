import { User } from '../user.model';

export interface UserCurrent extends User {
    isRefreshToken: boolean;
    roleNames: string[];
}
