import { CardEvento } from "../components/CardEvento";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { api } from "../services/api";
import { Evento } from "../types/evento";
import { MdRestoreFromTrash } from 'react-icons/md';
import { FiPlusCircle } from "react-icons/fi";

import "./Eventos.css"
import IconWrapper from "../components/Icon";
import { useNavigate } from "react-router-dom";

export const Eventos = ()=>{

    const {user,token} = useContext(AuthContext);
    const [eventos,setEventos] = useState<Evento[]>([]);


    const navigate = useNavigate();

    async function getEventos(){
        const response = await api.get("/event",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        setEventos(response.data);
    }

    function editEventPage(id:string){
        navigate("/edit-evento?id="+id);
    }

    

    useEffect(()=>{
        getEventos();
    },[])

    return (

        <div className="pageEventos">

        <button className="btnAdd" onClick={()=>navigate("/create-evento")}>
            <IconWrapper icon={FiPlusCircle}/>
        </button>
        

        <h1>Eventos</h1>

            <ul className="lista-eventos">
                {eventos.length === 0 && <span>Não há eventos</span> }

                {eventos.map((evento)=>{
                    
                    return  <li key={evento?.id} className="eventoDados">
                                <CardEvento key={evento.id} idEvento={evento.id} />                 
                            </li> 
                })}
            </ul>

        </div>
        

    )
}