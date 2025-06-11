import { AuthContext } from "../../contexts/Auth/AuthContext"
import { useContext, useEffect, useState } from "react"
import { api } from "../../services/api";
import "./CardPerfil.css"
import IconWrapper from "../Icon";
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
    const [imageUrl,setImageUrl] = useState<string>("");
    const navigate = useNavigate();

    async function getImageUser(){
       try {
        
       } catch (error) {
        console.log(error);
       }
    }

    async function getUser(){
        try {
            console.log("================= ID USUARIO =================");
            
            
            const response = await api.get("/user/"+user!.id,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }) 
            
    
            setName(response.data.name);
            setEmail(response.data.email);
            setCpf(response.data.cpf);
            setIdade(response.data.idade);
            setTelefone(response.data.telefone);

            if(response.data.foto ){
                const responseImage = await api.get("/user-image/"+user!.id,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    responseType:"blob"
                }) 
        
                const urlImage = URL.createObjectURL(responseImage.data);
                setImageUrl(urlImage);
            }


            
            
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
                    <img alt="" id="image-user" src={imageUrl? imageUrl : "https://img.freepik.com/premium-vector/free-vector-user-icon-simple-line_901408-588.jpg"}/>
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