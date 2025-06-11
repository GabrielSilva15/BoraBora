import { api } from "../../services/api"
import { JSX, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { Evento } from "../../types/evento"
import "./CardEvento.css"
import { useNavigate } from "react-router-dom"
import { MdRestoreFromTrash } from 'react-icons/md';
import { FiCalendar, FiMapPin  } from "react-icons/fi";
import { IconType } from "react-icons/lib"
import IconWrapper from "../Icon"
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
    const [data,setData] = useState<string>("");
    const [imageUrl,setImageUrl] = useState<string>("");

    const navigate = useNavigate();

    async function getEvento(){
       try {
        const response = await api.get(`/event/${idEvento}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        console.log(response.data);
        

        setData(new Date(new Date(response.data?.data!).getTime() + new Date(response.data?.data!).getTimezoneOffset() * 60000).toLocaleDateString());
        
        setEvento(response.data);
        console.log("vau ti bi cy");
        
        if(response.data.imagem && response.data.imagem.length > 0){
                const image = await api.get("/event-image/"+idEvento,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                }   ,
                responseType:"blob"
            });

      
        
        //     console.log(URL.createObjectURL(image.data));

            setImageUrl(URL.createObjectURL(image.data));
            return;
        }


        setImageUrl("https://cdn0.casamentos.com.br/vendor/3872/3_2/960/jpeg/whatsapp-image-2018-07-27-at-10-51-32-19_13_123872.jpeg");

       } catch (error) {
     
        
        setImageUrl("https://cdn0.casamentos.com.br/vendor/3872/3_2/960/jpeg/whatsapp-image-2018-07-27-at-10-51-32-19_13_123872.jpeg");
        console.log(error);
            
       }
    }

    function dadosEventPage(id:string){
        // navigate("/edit-evento?id="+id);
        navigate("/dados-evento/?id="+id);

    }

   

    const [openPopup,setOpenPopUp] = useState(false);

    useEffect(()=>{
        
        getEvento();
        
    },[])


    return (
            <li className="box-eventoDados" onClick={()=>dadosEventPage(idEvento)}>
                <div className="dados-evento" >
                    <img className="img-evento"  src={imageUrl}/>
                    <div className="head-event">
                        <span className="title-event">
                            {evento?.title}
                        </span>
                        <span className="adress-event">
                            <IconWrapper icon={FiMapPin}/>
                            {evento?.endereco}</span>
                        <span className="date-event">
                            <IconWrapper icon={FiCalendar}/>
                            {data}
                        </span>
                    </div>
                </div>
            </li>

    )
}