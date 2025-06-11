import { useContext, useEffect, useState } from "react";
import { useSearchParams , useLocation, data, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/api";
import { Evento } from "../../types/evento";
import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./EditEvento.css"
import IconWrapper from "../../components/Icon";
import { MdRestoreFromTrash } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/InputField/InputField";
import { Container } from "../../components/Container/Container";

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
    const [inputFile,setInputFile] = useState<File>();
    const [imageUrl,setImageUrl] = useState<string>("");

 
    const {token} = useContext(AuthContext);

    async function getEvento(){
        try {
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
    
            if(response.data.imagem && response.data.imagem.length > 0){
                console.log("LOG DA IMAGEM");
                
                console.log(response.data.imagem);
                
                const image = await api.get("/event-image/"+idEvento,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                    responseType:"blob"
                })
    
                setImageUrl(URL.createObjectURL(image.data));
    
            }
        } catch (error) {
            console.log(error);
            
        }

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

            const formData = new FormData();
            formData.append("image",inputFile!);

            if(inputFile){
                
                await api.patch("/event/upload-image/"+idEvento,formData,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                        "Content-Type":"multipart/form-data",
                        "Acess-Control-Allow-Origin":"*"
                    }
                });
            }
            

            

            console.log("Evento atualizado com sucesso");

            
        // navigate("/dados-evento/?id="+idEvento);



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
            <Container>

                <div className="pageEditEvent">
                    {!evento && <span>Carregando...</span> }

                    {evento &&  
                        <>
                            <h2>Edição de Evento</h2>
                
                            <form  className="formEditEvento" onSubmit={handleSubmit(putEditEvento)}>

                                <div className="divImageEvent">
                                            <img src={imageUrl? imageUrl : "https://cdn0.casamentos.com.br/vendor/3872/3_2/960/jpeg/whatsapp-image-2018-07-27-at-10-51-32-19_13_123872.jpeg"} alt="" id="image-editUser"/>
                                            
                                            <label htmlFor="fileImage" >
                                                <IconWrapper icon={FiCamera}/>  
                                            </label>

                                            <input type="file"  id="fileImage" onChange={(e)=>{

                                                if(!e.target.files![0]){
                                                    return;
                                                }
                                                setInputFile(e.target.files![0])
                                                
                                                const fileReader = new FileReader();
                                                
                                                fileReader.onload = (event)=>{
                                                    setImageUrl(event.target?.result as string);
                                                }
                                                // fileReader.readAsDataURL(e.target.files![0]);
                                                fileReader.readAsDataURL(e.target.files![0]);
                                                
                                                // setImageUrl(URL.createObjectURL(image.data));
                                                
                                                
                                            }}/>
                                </div>

                                <div className="dadosEvento">
                                            <InputField label="Titulo:" type="text" {...register('title')} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                                            {errors.title && <span>{errors.title.message}</span>}
                                </div>
                
                                <div className="dadosEvento">
                                            <InputField label="Descrição:" type="text" {...register('description')} value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                            {errors.description && <span>{errors.description.message}</span>}
                                </div>
                
                                <div className="dadosEvento">
                                            <InputField label="Endereço:" type="text" {...register('endereco')} value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
                                            {errors.endereco && <span>{errors.endereco.message}</span>}
                                </div>
                
                                <div className="dadosEvento">
                                            <InputField label="Horário:" type="time" {...register('horario')} value={horario} onChange={((e)=>setHorario(e.target.value))}/>
                                            {errors.horario && <span>{errors.horario.message}</span>}
                                </div>
            
                                <div className="dadosEvento">
                                            <InputField label="Num Participantes:" type="text" {...register('quantPart')} value={quantPart} onChange={((e)=>setQuantPart(e.target.value))}/>
                                            {errors.quantPart && <span>{errors.quantPart.message}</span>}
                                </div>
                
                                <div className="dadosEvento">
                                            <InputField label="Data:" type="date" {...register('data')} value={data} onChange={(e)=>setData(e.target.value)}/>
                                            {errors.data && <span>{errors.data.message}</span>}
                                </div>
                
                                <Button name="Atualizar"/>
                            </form>

                            <button className="btnRemoveEvent" onClick={()=>{
                                setOpenPopUp(true);
                                const pageGlass = document.querySelector(".box") as HTMLElement;
                                pageGlass.style.display = "block";
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
                                                        const pageGlass = document.querySelector(".box") as HTMLElement;
                                                        pageGlass.style.display= "none";
                                                        pageGlass?.classList.remove("glassEdit");    
                                                    }} className="btnRemove btn-no">Não</button>
                                                </div>
                                            </div>
                                }
                            </div>
                        </>
                    }
                </div>
               
            
        </Container>
    )

        
    
} 