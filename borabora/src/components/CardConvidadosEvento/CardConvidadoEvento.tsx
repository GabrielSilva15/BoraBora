import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { AuthProvider } from "../../contexts/Auth/AuthProvider";
import { User } from "../../types/user";

import "./CardConvidadoEvento.css";

export const CardConvidadoEvento = ({id}:{id:string})=>{
    

    const {token} = useContext(AuthContext);
    const [convidado,setConvidado] = useState<User>(); 
    const [imageConvidado,setImageConvidado] = useState<string>(); 

    async function getUserConvidado(){
        
        try {
            const responseUser = await api.get("/user/"+id,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log(responseUser);
            
            setConvidado(responseUser.data);

            if(responseUser.data.foto === null || responseUser.data.foto === ""){
                setImageConvidado("https://thumbs.dreamstime.com/b/perfil-de-usu%C3%A1rio-do-vetor-avatar-padr%C3%A3o-179376714.jpg");
                return;
            }

            const responseImage = await api.get("/user-image/"+id,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                responseType:"blob"
            }) 
            
            setImageConvidado(URL.createObjectURL(responseImage.data));


        } catch (error) {
            setImageConvidado("https://thumbs.dreamstime.com/b/perfil-de-usu%C3%A1rio-do-vetor-avatar-padr%C3%A3o-179376714.jpg");
            console.log(error);      
            return;
        }
    }


    async function getImage(){
        try {


            console.log(`Bearer ${token}`);
            
            
            const responseImage = await api.get("/user-image/"+id,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                responseType:"blob"
            }) 
            
                setImageConvidado(URL.createObjectURL(responseImage.data));
                return;   
        } catch (error) {
            console.log(error);
            
            setImageConvidado("https://thumbs.dreamstime.com/b/perfil-de-usu%C3%A1rio-do-vetor-avatar-padr%C3%A3o-179376714.jpg");
            return;
        }
    }


    useEffect(()=>{
        getUserConvidado();
        // getImage()
    },[])



    return (
        <AuthProvider>
            <div id="dados-convidados">
                <img id="img-convidado" src={imageConvidado} alt="" />
                <span>{convidado?.name}</span>
            </div>
        </AuthProvider>
    )
}