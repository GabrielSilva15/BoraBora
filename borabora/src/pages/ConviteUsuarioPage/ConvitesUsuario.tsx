import { useContext, useEffect, useState } from "react";
import "./ConvitesUsuario.css";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { api } from "../../services/api";
import { NavBar } from "../../components/NavBar/NavBar";
import { ContainerWrapper } from "../../components/Container/styled";

export const ConvitesUsuario = ()=>{

    const {token,user} = useContext(AuthContext);

    const [listConvites,setListConvites] = useState<any[]>([]);

    async function getConvite(){
        try {
            
            const response = await api.get("/convidado/eventos",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })


            setListConvites(response.data.sort((a:any,b:any)=>{
                return a.presenca - b.presenca;
            }));
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async function acceptConvite(idEvento:string){
        try {
            
            const response = await api.patch("/convidado/confirma-presenca",{
                eventId:idEvento
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Confirmando presença");
            
            getConvite()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getConvite();
    },[])

    return (
        <ContainerWrapper>
            <NavBar/>
            <div className="convites-page">

                <h2>Convites</h2>

                {listConvites.length === 0 && (
                    <p>Você não foi convidado para nenhum evento ainda.</p>
                )}

                {listConvites.length > 0 && listConvites.map((convite)=>
                
                    (
                        <div className="convites">
                            <p id="text-convite">Você foi convidado para o evento: {convite.nomeEvento}</p>
                            {convite.presenca === false && (
                                <div className="btns-convite">
                                    <button id="btn-aceitar" onClick={()=>acceptConvite(convite.eventId)}>Aceitar</button>
                                </div>
                            )}

                            {convite.presenca === true && (
                                <p id="text-confirmacao">Presença confirmada</p>
                            )}
                        </div>
                    )
                )}
            </div>
        </ContainerWrapper>
    )
}