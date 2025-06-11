import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import "./RegisterUser.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";


export const CreateUser = ()=>{

    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const navigate = useNavigate();

    const cadastroSchema = z.object({
        name:z.string().min(4,"Você deve informar um nome de no mínimo 4 caracteres!"),
        email:z.string().email("Você deve informar um e-mail válido!"),
        password:z.string().min(5,{message:"Informe uma senha de no mínimo 5 caracteres"})
    })
    
    type CadastroSchema= z.infer<typeof cadastroSchema>;
    
    
    const {register,formState:{errors},handleSubmit} = useForm<CadastroSchema>({
        resolver:zodResolver(cadastroSchema)
    });


    async function handleCadastroSubmit(){
        try {
            
            await api.post("/user/create",{
                name,
                email,
                password
            });
    
            console.log("cadastro feiot ocm sucesso");
            
    
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <Container>
        <div className="pageCadastro">
            
            <div className="boxCadastro">
                <div className="headCadastro">
                    <span id="textCadastro">Go Go Party's</span>
                </div>

                <div className="subtitleCadastro">
                    <span id="textCadastro">Seja Bem-Vindo</span>
                    <span id="subCadastro">Realize seu cadastro e esteja pronto para criar e gerenciar seus eventos</span>
                </div>

                <form onSubmit={handleSubmit(handleCadastroSubmit)} className="formCadastro">
                    <div className="dadosCadastro">
                        <span>Nome:</span>
                        <input type="text" {...register('name')} placeholder="Informe um nome..." value={name} onChange={(e)=>setName(e.target.value)}/>
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>

                    <div className="dadosCadastro">
                        <span>E-mail:</span>
                        <input type="email" {...register('email')} placeholder="Informe um e-mail..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div className="dadosCadastro">
                        <span>Senha:</span>
                        <input type="password" {...register('password')} placeholder="Informe uma senha..." value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <Button name="Criar conta"/>

                    <span className="textCadastre">Já está cadastrado? <span className="loginAqui" onClick={()=>navigate("/login")}>Clique aqui </span>e entre na sua conta</span>

                    {/* <Button name="Botao de enviar"/> */}
                </form>
            </div>
        </div>
        </Container>
    )
}