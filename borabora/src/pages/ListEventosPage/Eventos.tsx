import { CardEvento } from "../../components/CardEvento/CardEvento";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/api";
import { Evento } from "../../types/evento";
import { MdRestoreFromTrash } from 'react-icons/md';
import { FiPlusCircle } from "react-icons/fi";
import { ToastContainer,toast } from "react-toastify";
import "./Eventos.css"
import IconWrapper from "../../components/Icon";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Container } from "../../components/Container/Container";

export const Eventos = ()=>{

    const {user,token} = useContext(AuthContext);
    const [eventos,setEventos] = useState<Evento[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    async function getEventos(){
       try {
        const response = await api.get("/event",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })  

        setEventos(response.data);

        setIsLoading(true);
       } catch (error:any) {
        if(error.status === 404) toast.error("O usuário buscado não é organizador para ter eventos!");
        setIsLoading(true);
       }
    }

    function editEventPage(id:string){
        navigate("/edit-evento?id="+id);
    }

    

    useEffect(()=>{
        getEventos();
    },[])

    return (
        <Container>
            <NavBar/>
            <div className="pageEventos">

                <button className="btnAdd" onClick={()=>user!.organizador ? navigate("/create-evento") : toast.error("O usuário não tem permissão para criar eventos!")} >
                    <IconWrapper icon={FiPlusCircle}/>
                </button>
                
                <h1>Eventos</h1>


                {isLoading && eventos.length === 0 && <span>Não há eventos</span> }

                {isLoading && 
                    <ul className="lista-eventos">
                        {eventos.map((evento)=>{
                            
                            return <CardEvento key={evento.id} idEvento={evento.id} />                 
                                    
                        })}
                    </ul>
                }

                <ToastContainer/>

            </div>
        
        </Container>
    )
}