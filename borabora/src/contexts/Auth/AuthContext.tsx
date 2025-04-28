import { createContext } from 'react';
import { User } from '../../types/user';
export type AuthContextType = {
    token: string | null
    user: User | null
    signIn : (email:string,password:string) => Promise<boolean>;
    signOut : () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);