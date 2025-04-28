import { AuthContext } from "../contexts/Auth/AuthContext"
import { useContext, useEffect } from "react"
import { api } from "../services/api";
import "./CardPerfil.css"

export const CardPerfil = ()=>{

    const {user,token} = useContext(AuthContext);

    async function getImage(){
        const response = await api.get(`/user-image/${user!.id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            responseType:"blob"
        }) 

        const urlImage = URL.createObjectURL(response.data);
        document.querySelector("img")!.src =urlImage; 
    }

    useEffect(()=>{
        getImage();
    },[])

    return (
            <div className="card-perfil">
                <img alt="" id="image-user"/>
                <div className="dados">
                    <span>Nome: {user!.name}</span>
                    <span>E-mail: {user!.email}</span>
                    <span>CPF: {user?.cpf ? user!.cpf : "Sem CPF"}</span>
                    <span>Idade: {user!.idade}</span>
                </div>
            </div>
    )
}