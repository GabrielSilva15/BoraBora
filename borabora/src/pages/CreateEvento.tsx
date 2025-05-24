import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../services/api";
import {z} from "zod";
import "./CreateEvento.css"
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreateEvento = ()=>{


        const {token} = useContext(AuthContext);
        const navigate = useNavigate();

        const eventCreateSchema = z.object({
                title:z.string().min(4,"O titulo do evento deve ter no minimo 4 caracteres"),
                description:z.string().optional(),
                quantPart:z.coerce.number().min(1,"O evento deve conter pelo menos um participante"),
                horario:z.string(),
                endereco:z.string().min(4,"Você deve informar um endereco"),
                data:z.coerce.date().refine((data)=> data > new Date(),{
                    message:"Data inválida"
                }),
        })

        type EventCreateSchema = z.infer<typeof eventCreateSchema>;
    
        const {register,handleSubmit,formState:{errors}} = useForm<EventCreateSchema>({
            resolver:zodResolver(eventCreateSchema)
        })
        

        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [endereco, setEndereco] = useState("");
        const [horario, setHorario] = useState("");
        const [quantPart, setQuantPart] = useState("");
        const [data, setData] = useState("");
    

        async function createEvento(){
            try {
                await api.post("/event",{
                    title,
                    description,
                    endereco,
                    horario,
                    data,
                    quantPart:parseInt(quantPart),
                    geolocalization:{
                        type:"Point",
                        coordinates:[0,0]
                    }
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                console.log("Evento criado com sucesso!");
                navigate("/eventos")
                
            } catch (error) {
                console.log("error", error);
            }
        }

    return (

        <div className="pageCreateEvent">
            Página de criar evento

            <form  className="formCreateEvento" onSubmit={handleSubmit(createEvento)}>
                            <label htmlFor="" className="dadosEvento">
                                        <span>Titulo:</span>
                                        <input type="text" {...register('title')} placeholder="Informe um título para seu evento..."  onChange={(e)=>setTitle(e.target.value)}/>
                                        {errors.title && <span>{errors.title.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Descrição:</span>
                                        <input type="text" {...register('description')} placeholder="Informe uma descrição para seu evento..." onChange={(e)=>setDescription(e.target.value)}/>
                                        {errors.description && <span>{errors.description.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Endereço:</span>
                                        <input type="text" {...register('endereco')} placeholder="Informe um endereço para seu evento..."  onChange={(e)=>setEndereco(e.target.value)}/>
                                        {errors.endereco && <span>{errors.endereco.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Horário:</span>
                                        <input type="time" {...register('horario')} placeholder="Informe um horário para seu evento..."  onChange={((e)=>setHorario(e.target.value))}/>
                                        {errors.horario && <span>{errors.horario.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Número de Participantes:</span>
                                        <input type="text" {...register('quantPart')} placeholder="Informe uma quantidade de participantes para seu evento..."  onChange={((e)=>setQuantPart(e.target.value))}/>
                                        {errors.quantPart && <span>{errors.quantPart.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Data:</span>
                                        <input type="date" {...register('data')}  onChange={(e)=>setData(e.target.value)}/>
                                        {errors.data && <span>{errors.data.message}</span>}
                            </label>
            
            
                            <button className="btnEdit">Enviar</button>
                        </form>
        </div>
    )
}