import { api } from "../services/api"
import { JSX, useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/Auth/AuthContext"
import { Evento } from "../types/evento"
import "./CardEvento.css"
import { useNavigate } from "react-router-dom"
import { MdRestoreFromTrash } from 'react-icons/md';
import { IconType } from "react-icons/lib"
import IconWrapper from "./Icon"
// import { IconType } from "react-icons"

// type IconTrash = {
//     icon:React.ReactNode
// }

// const IconRemove = ({icon: Icon}:IconTrash)=>{
//     return (
//         {Icon}
//     )
// }


  // Uso certo
   // ✅ Isso é o componente em si (função)
  

export const CardEvento = ({idEvento}:{idEvento:string})=>{

    const  {token} = useContext(AuthContext);
    const [evento, setEvento] = useState<Evento | null>();
    const [data,setData] = useState("");
    const navigate = useNavigate();

    async function getEvento(){
        const response = await api.get(`/event/${idEvento}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data);

        setData(new Date(new Date(response.data?.data!).getTime() + new Date(response.data?.data!).getTimezoneOffset() * 60000).toLocaleDateString());
        
        setEvento(response.data);
    }

    function editEventPage(id:string){
        navigate("/edit-evento?id="+id);
    }

   

    const [openPopup,setOpenPopUp] = useState(false);

    useEffect(()=>{
        
        getEvento();
        
    },[])


    return (
            <div onClick={()=>editEventPage(idEvento)}>
                <div className="dados-evento" >
                    <div className="head-event">
                        <span className="title-event">{evento?.title}</span>
                        <span className="adress-event">{evento?.endereco}</span>
                    </div>
                    <span className="date-event">{data}</span>
                </div>
                {evento?.imagem? evento!.imagem : <img className="img-evento"  src="https://cdn0.casamentos.com.br/vendor/3872/3_2/960/jpeg/whatsapp-image-2018-07-27-at-10-51-32-19_13_123872.jpeg"/>}
            </div>

    )
}