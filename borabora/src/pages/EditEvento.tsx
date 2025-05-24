import { useContext, useEffect, useState } from "react";
import { useSearchParams , useLocation, data, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/Auth/AuthContext";
import { api } from "../services/api";
import { Evento } from "../types/evento";
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditEvento.css"
import IconWrapper from "../components/Icon";
import { MdRestoreFromTrash } from "react-icons/md";

export const EditEventPage = ()=>{


    const [searchParams] = useSearchParams();
    const idEvento = searchParams.get('id');
    const [openPopup,setOpenPopUp] = useState(false);
    const navigate = useNavigate();

    const eventEditSchema = z.object({
        title:z.string().min(4,"O titulo do evento deve ter no minimo 4 caracteres").optional(),
        description:z.string().optional(),
        quantPart:z.coerce.number().min(1,"O evento deve conter pelo menos um participante").optional(),
        horario:z.string(),
        endereco:z.string().optional(),
        data:z.coerce.date().refine((data)=> data > new Date(),{
            message:"Data inválida"
        }),
    })

    type EventEditSchema = z.infer<typeof eventEditSchema>;

    const {register,handleSubmit, formState:{errors}} = useForm<EventEditSchema>({
        resolver:zodResolver(eventEditSchema)
    })

    const [evento, setEvento] = useState<Evento>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endereco, setEndereco] = useState("");
    const [horario, setHorario] = useState("");
    const [quantPart, setQuantPart] = useState("");
    const [data, setData] = useState("");
 
    const {token} = useContext(AuthContext);

    async function getEvento(){
        const response= await api.get('/event/'+idEvento,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        setEvento(response.data);

        setTitle(response.data.title);
        setDescription(response.data.description);
        setEndereco(response.data.endereco);
        setHorario(response.data.horario)
        setQuantPart(response.data.quantPart);
        const [dia, mes, ano]:any= new Date(new Date(response.data?.data!).getTime() + new Date(response.data?.data!).getTimezoneOffset() * 60000).toLocaleDateString().toString().split("/");
        setData(`${ano}-${mes}-${dia}`);  
    }

    async function putEditEvento(){
        try {


            await api.put("/event/"+idEvento,{
                title,
                description,
                endereco,
                horario,
                data,
                quantPart:parseInt(quantPart)
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            console.log("Evento atualizado com sucesso");


        } catch (error) {
           console.log(error);
        }
    }

    async function removeEvent(){



        try {
            await api.delete("/event/"+idEvento,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setOpenPopUp(false);
            navigate("/eventos");
        } catch (error) {
            console.log(error);      
        }
    }

    useEffect(()=>{
        
        getEvento();

    },[])
    return (

            <div className="pageEditEvent">
                {!evento && <span>Carregando...</span> }

                {evento &&  
                    <>
                        <h2>Edição de Evento</h2>
            
                        <form  className="formEditEvento" onSubmit={handleSubmit(putEditEvento)}>
                            <label htmlFor="" className="dadosEvento">
                                        <span>Titulo:</span>
                                        <input type="text" {...register('title')} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                                        {errors.title && <span>{errors.title.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Descrição:</span>
                                        <input type="text" {...register('description')} value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                        {errors.description && <span>{errors.description.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Endereço:</span>
                                        <input type="text" {...register('endereco')} value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
                                        {errors.endereco && <span>{errors.endereco.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Horário:</span>
                                        <input type="time" {...register('horario')} value={horario} onChange={((e)=>setHorario(e.target.value))}/>
                                        {errors.horario && <span>{errors.horario.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Número de Participantes:</span>
                                        <input type="text" {...register('quantPart')} value={quantPart} onChange={((e)=>setQuantPart(e.target.value))}/>
                                        {errors.quantPart && <span>{errors.quantPart.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosEvento">
                                        <span>Data:</span>
                                        <input type="date" {...register('data')} value={data} onChange={(e)=>setData(e.target.value)}/>
                                        {errors.data && <span>{errors.data.message}</span>}
                            </label>
            
            
                            <button className="btnEdit">Atualizar</button>
                        </form>

                        <button className="btnRemoveEvent" onClick={()=>{
                                    setOpenPopUp(true);
                                    const pageGlass = document.querySelector(".box");
                                    console.log(pageGlass);
                                    
                                    pageGlass?.classList.add("glassEdit");
                                    }}>
                                    <IconWrapper icon={MdRestoreFromTrash} />
                        </button>

                        <div className="box">
                            {openPopup &&
                                        <div className="popup">
                                            <p>Deseja realmente apagar este evento?</p>
                                            <div>
                                                <button onClick={async()=>{
                                                    await removeEvent()
                                                    navigate("/eventos");
                                                }} className="btnRemove btn-yes">Sim</button>
                                                <button onClick={()=>{
                                                    setOpenPopUp(false)
                                                    const pageGlass = document.querySelector(".box");
                                                    pageGlass?.classList.remove("glassEdit");    
                                                }} className="btnRemove btn-no">Não</button>
                                            </div>
                                        </div>
                            }
                        </div>
                    </>
                }
            </div>
               
            
    )

        
    
} 