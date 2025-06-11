import { useNavigate, useSearchParams } from "react-router-dom";
import "./EditPerfil.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/api";
import { User } from "../../types/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconWrapper from "../../components/Icon";
import { FiCamera } from "react-icons/fi";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/InputField/InputField";
import { NavBar } from "../../components/NavBar/NavBar";
import { Container } from "../../components/Container/Container";

export const EditPerfil = ()=>{

    // const [searchParams] = useSearchParams();
    // const idUser = searchParams.get('id');

    const [name,setName] = useState<string>("");
    const [idade,setIdade] = useState<string>();
    const [telefone,setTelefone] = useState<string>();
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");
    const [inputFile,setInputFile] = useState<File | null>(null);
    const [imageUrl,setImageUrl] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);


    const {user,token} = useContext(AuthContext);

    const userEditSchema = z.object({
            name:z.string().min(4,"O nome do usuário deve ter pelo menos 5 caracteres").optional(),
            email:z.string().email().optional(),
            idade:z.coerce.number().min(1,"O usuário deve informar uma idade válida").optional(),
            foto:z.string().optional(),
            cpf:z.string().min(11,"Informe um CPF de no mínimo 11 caracteres!").max(14,"O CPF suporta no máximo 14 caracteres!").optional(),
            telefone:z.string().optional(),
    })

    type UserEditSchema = z.infer<typeof userEditSchema>;

    const {register,handleSubmit, formState:{errors}} = useForm<UserEditSchema>({
        resolver:zodResolver(userEditSchema)
    })

    const navigate = useNavigate();
    

    async function getUser(){
        try {
            const response = await api.get("/user/"+user!.id);
            const userData : User = response.data;
            setName(userData.name);
            setIdade(userData.idade ? userData.idade.toString() : "Sem Idade");
            setTelefone(userData.telefone ? userData.telefone.toString() : "Sem Telefone");
            setEmail(userData.email);
            setCpf(userData.cpf ? userData.cpf.toString() : "Sem CPF");
            

            console.log("user");
            
            console.log(user);
            

            if(userData.foto){
                
                const responseImage = await api.get("/user-image/"+user!.id,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    responseType:"blob"
                }) 
                
                setImageUrl(URL.createObjectURL(responseImage.data));
                setIsLoading(true);   
                return;
            }


            setIsLoading(true);
        } catch (error) {
            setImageUrl("https://img.freepik.com/premium-vector/free-vector-user-icon-simple-line_901408-588.jpg");
            console.log(error);
            return;
        }
    }

    async function putEditUser(){
        try {

            const formData = new FormData();
            formData.append("image",inputFile!);
            
    
            console.log("+++++++++++++++++++++");


            console.log(inputFile);
            console.log(formData);

            console.log("+++++++++++++++++++++");

            

            console.log({
                name,
                cpf,
                email,
                idade:parseInt(idade!),
                telefone,
                foto:inputFile
            });
            

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

            if(inputFile !== null){
                await api.patch("/user/upload-image",formData,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type":"multipart/form-data",
                        "Acess-Control-Allow-Origin":"*"
                    }
                })
            }


            navigate("/perfil");

        } catch (error) {
           console.log(error);
        }
    }

    // async function getImageUser(){
    //     try {
            
    //         // const image = document.querySelector("#image-editUser") as HTMLImageElement;
    //         // image.src= urlImage; 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(()=>{
        getUser();
        // getImageUser();
    },[])


    

    return (
        <Container>
        
            <NavBar/>
            <div className="pageEditUser">
                <h2>Edição de Perfil</h2>
                {isLoading && <form  className="formEditUser" onSubmit={handleSubmit(putEditUser)}>
                                <div  className="divImageUser">
                                            <img src={imageUrl? imageUrl : "https://img.freepik.com/premium-vector/free-vector-user-icon-simple-line_901408-588.jpg"} alt="" id="image-editUser"/>
                                            <label htmlFor="fileImage" >
                                                <IconWrapper icon={FiCamera}/>  
                                            </label >
                                            <input type="file"  id="fileImage" onChange={(e)=>{
                                                if(!e.target.files![0]){
                                                    return;
                                                }
                                                setInputFile(e.target.files![0])
                            
                                                const fileReader = new FileReader();

                                                fileReader.onload = (event)=>{
                                                    setImageUrl(event.target?.result as string);
                                                }

                                                fileReader.readAsDataURL(e.target.files![0]);
                                                }
                                                }/>
                                </div>

                                <div className="dadosUser">
                                            <span>Nome:</span>
                                            <InputField type="text" {...register('name')} value={name} onChange={(e)=>setName(e.target.value)}/>
                                            {errors.name && <span>{errors.name.message}</span>}
                                </div>
                
                                <div className="dadosUser">
                                            <span>Email:</span>
                                            <InputField type="text" {...register('email')} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                            {errors.email && <span>{errors.email.message}</span>}
                                </div>
                
                                <div className="dadosUser">
                                            <span>CPF:</span>
                                            <InputField type="text" {...register('cpf')} value={cpf} onChange={(e)=>setCpf(e.target.value)}/>
                                            {errors.cpf && <span>{errors.cpf.message}</span>}
                                </div>
                
                                <div className="dadosUser">
                                            <span>Idade:</span>
                                            <InputField type="text" {...register('idade')} value={idade} onChange={((e)=>setIdade(e.target.value))}/>
                                            {errors.idade && <span>{errors.idade.message}</span>}
                                </div>
                
                                <div className="dadosUser">
                                            <span>Telefone:</span>
                                            <InputField type="text" {...register('telefone')} value={telefone} onChange={((e)=>setTelefone(e.target.value))}/>
                                            {errors.telefone && <span>{errors.telefone.message}</span>}
                                </div>
                
                
                                <Button name="Atualizar"/>
                            </form>}
                {!isLoading && <p>Carregando dados...</p>}
                
            </div>
        </Container>
    )
}