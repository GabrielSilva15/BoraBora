import { Button } from "../components/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import { api } from "../services/api";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const loginSchema = z.object({
    email:z.string(),
    password:z.string().min(5,{message:"A senha deve conter no minimo 5 caracteres"})
})

type  LoginSchema  = z.infer<typeof loginSchema>

export function Login (){

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState:{errors} } =  useForm<LoginSchema>({
        resolver:zodResolver(loginSchema)
    });

    async function handleLoginSubmit(data:LoginSchema){
        try {
            await auth.signIn(data.email,data.password);   
            navigate("/");
        } catch (error) {
            console.log(error);
        }
       
    }

    return (
        <div className="pageLogin">
            
            <div className="boxLogin">
                <div className="headLogin">
                    <span id="textLogin">Go Go Party's</span>
                </div>

                <div className="subtitleLogin">
                    <span id="textLogin">Seja Bem-Vindo</span>
                    <span id="subLogin">Realize seu login e esteja pronto para criar e gerenciar seus eventos</span>
                </div>

                <form onSubmit={handleSubmit(handleLoginSubmit)} className="formLogin">
                    <label htmlFor="" className="dadosLogin">
                        <span>E-mail:</span>
                        <input type="email" {...register('email')} placeholder="Digite seu e-mail..."/>
                        {errors.email && <span>{errors.email.message}</span>}
                    </label>

                    <label htmlFor="" className="dadosLogin">
                        <span>Senha:</span>
                        <input type="password" {...register('password')} placeholder="Insira sua senha..."/>
                        {errors.password && <span>{errors.password.message}</span>}
                    </label>


                    <button className="btnEntrar">Entrar</button>

                    <span className="textCadastre">Não realizou seu cadastro ainda? <span className="cadastreAqui">Clique aqui </span>e crie sua conta</span>

                    {/* <Button name="Botao de enviar"/> */}
                </form>
            </div>
        </div>
    )
}