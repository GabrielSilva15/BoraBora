import { useNavigate, useSearchParams } from "react-router-dom";
import "./EditPerfil.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { api } from "../services/api";
import { User } from "../types/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconWrapper from "../components/Icon";
import { FiCamera } from "react-icons/fi";

export const EditPerfil = ()=>{

    // const [searchParams] = useSearchParams();
    // const idUser = searchParams.get('id');

    const [name,setName] = useState<string>("");
    const [idade,setIdade] = useState<string>();
    const [telefone,setTelefone] = useState<string>();
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");
    const [inputFile,setInputFile] = useState<File>();


    const {user,token} = useContext(AuthContext);

    const userEditSchema = z.object({
            name:z.string().min(4,"O nome do usuário deve ter pelo menos 5 caracteres").optional(),
            email:z.string().email().optional(),
            idade:z.coerce.number().min(1,"O usuário deve informar uma idade válida").optional(),
            cpf:z.string(),
            telefone:z.string().optional(),
    })

    type UserEditSchema = z.infer<typeof userEditSchema>;

    const {register,handleSubmit, formState:{errors}} = useForm<UserEditSchema>({
        resolver:zodResolver(userEditSchema)
    })

    const navigate = useNavigate();
    

    async function getUser(){
        try {

            const response = await api.get("/user/"+user);
            const userData : User = response.data;
            setName(userData.name);
            setIdade(userData.idade.toString());
            setTelefone(userData.telefone);
            setEmail(userData.email);
            setCpf(userData.cpf);
        } catch (error) {
            console.log(error);
        }
    }

    async function putEditUser(){
        try {
            await api.put("/user/update",{
                name,
                cpf,
                email,
                idade:parseInt(idade!),
                telefone,
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            navigate("/perfil");

        } catch (error) {
           console.log(error);
        }
    }

    async function getImageUser(){
        const response = await api.get("/user-image/"+user,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            responseType:"blob"
        }) 

        const urlImage = URL.createObjectURL(response.data);
        const image = document.querySelector("#image-editUser") as HTMLImageElement;
        image.src= urlImage; 
    }

    useEffect(()=>{
        getUser();
        getImageUser();
    },[])
    

    return (
        <div className="pageEditUser">
            Edit User
            <form  className="formEditUser" onSubmit={handleSubmit(putEditUser)}>
                            <label htmlFor="" className="labelImageUser">
                                        <img src="" alt="" id="image-editUser"/>
                                        <label htmlFor="fileImage">
                                            <IconWrapper icon={FiCamera}/>  
                                        </label>
                                        <input type="file"  id="fileImage"/>
                            </label>

                            <label htmlFor="" className="dadosUser">
                                        <span>Nome:</span>
                                        <input type="text" {...register('name')} value={name} onChange={(e)=>setName(e.target.value)}/>
                                        {errors.name && <span>{errors.name.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosUser">
                                        <span>Email:</span>
                                        <input type="text" {...register('email')} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        {errors.email && <span>{errors.email.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosUser">
                                        <span>CPF:</span>
                                        <input type="text" {...register('cpf')} value={cpf} onChange={(e)=>setCpf(e.target.value)}/>
                                        {errors.cpf && <span>{errors.cpf.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosUser">
                                        <span>Idade:</span>
                                        <input type="number" {...register('idade')} value={idade} onChange={((e)=>setIdade(e.target.value))}/>
                                        {errors.idade && <span>{errors.idade.message}</span>}
                            </label>
            
                            <label htmlFor="" className="dadosUser">
                                        <span>Telefone:</span>
                                        <input type="text" {...register('telefone')} value={telefone} onChange={((e)=>setTelefone(e.target.value))}/>
                                        {errors.telefone && <span>{errors.telefone.message}</span>}
                            </label>
            
            
                            <button className="btnEdit">Atualizar</button>
                        </form>
        </div>
    )
}