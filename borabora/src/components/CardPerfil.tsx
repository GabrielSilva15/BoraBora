import { AuthContext } from "../contexts/Auth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { api } from "../services/api";
import "./CardPerfil.css"
import IconWrapper from "./Icon";
import { FiEdit, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CardPerfil = ()=>{

    const {user,token} = useContext(AuthContext);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [cpf,setCpf] = useState("");
    const [telefone,setTelefone] = useState("");
    const [idade,setIdade] = useState("");
    const [inputFile, setInputFile] = useState<File | null>(null);
    const navigate = useNavigate();

    async function getImageUser(){
        const response = await api.get("/user-image/"+user,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            responseType:"blob"
        }) 

        const urlImage = URL.createObjectURL(response.data);
        document.querySelector("img")!.src =urlImage; 
    }

    async function getUser(){
        try {
            console.log("================= ID USUARIO =================");
            
            console.log(user);
            
            const response = await api.get("/user/"+user,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }) 
            console.log("aqui");
            
    
            setName(response.data.name);
            setEmail(response.data.email);
            setCpf(response.data.cpf);
            setIdade(response.data.idade);
            setTelefone(response.data.telefone)
            console.log(response.data);
            console.log("deu erro");
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    // async function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){
    //     if(e.target.files && e.target.files.length > 0){
    //         setInputFile(e.target.files[0])
    //     }
    // }

    async function navigateToEditUser(){
        navigate("/perfil/edit");
    }

    useEffect(()=>{
        getUser();
        getImageUser();
    },[])

    return (
            <div className="card-perfil">
                <button className="btn-edit" onClick={navigateToEditUser}>
                    <IconWrapper icon={FiEdit}/>
                </button>
                    <img alt="" id="image-user"/>
                {/* <div className="img-box">
                    <label htmlFor='btn-editImage' >
                        <IconWrapper icon={FiCamera}/>
                    </label>
                    <input type="file" name="" id="btn-editImage" onChange={handleFileChange}/>
                </div> */}
                <div className="dados">
                    <span>Nome: {name}</span>
                    <span>E-mail: {email}</span>
                    <span>CPF: {cpf ? cpf : "Sem CPF"}</span>
                    <span>Idade: {idade}</span>
                </div>
            </div>
    )
}