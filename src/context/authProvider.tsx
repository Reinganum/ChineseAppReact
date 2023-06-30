import {createContext, useState} from 'react';
import { IAuth, ChildrenProps} from '../types/types';

interface IAuthContext {
    auth:IAuth,
    setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}

const AuthContext=createContext({} as IAuthContext);

export const AuthProvider=({ children }: ChildrenProps )=>{
    const [auth, setAuth]=useState<IAuth>({auth:false,userId:'',accessToken:'',selectedList:'',avatar:''});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 


export default AuthContext;