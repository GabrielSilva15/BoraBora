import { JSX,useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../../services/api";
import { User } from "../../types/user";


export const AuthProvider = ({children} : {children: JSX.Element})=>{

    const [token,setToken] = useState<string | null>(null);
    const [user,setUser] = useState<User | null>(null);


    async function signIn (email:string,password:string){
        try {
            const response = await api.post("/user/login",{email,password});
            const responseUsers = await api.get("/users");

            const getUser = responseUsers.data.filter((item:User) => item.email === email);

            if(response.data){
                setToken(response.data);
                setUser(getUser[0]);
                localStorage.setItem("authToken",response.data);
                localStorage.setItem("authUser",JSON.stringify(getUser));
                return true;
            }
        return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function signOut (){
        setToken(null);
        localStorage.removeItem("authToken");
    }

    return (
        <AuthContext.Provider value={{token,user,signIn,signOut}}>
            {children}
        </AuthContext.Provider>
    )
}