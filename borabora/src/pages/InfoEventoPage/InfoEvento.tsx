import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./InfoEvento.css"
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AuthProvider } from "../../contexts/Auth/AuthProvider";
import { User } from "../../types/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Evento } from "../../types/evento";
import { CardConvidadoEvento } from "../../components/CardConvidadosEvento/CardConvidadoEvento";
import { FiEdit } from "react-icons/fi";
import IconWrapper from "../../components/Icon";
import { NavBar } from "../../components/NavBar/NavBar";
import { Container } from "../../components/Container/Container";

export const InfoEvento = ()=>{


    const [searchParams] = useSearchParams();
    const idEvento = searchParams.get("id");
    console.log("idEvento: ", idEvento);
    
    
    type ConvidadoSchema = {
        convidadoId:string,
        eventId:string,
        nomeConvidado:string,
        nomeEvento:string,
        presenca:boolean
    }

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const [evento, setEvento] = useState<Evento>();
    const [imageEvento, setImageEvento] = useState<string>();
    const [dataFormatted, setDataFormatted] = useState<string>();
    const [listUsersSearched,setListUsersSearched] = useState<User[]>([]);
    const [listCanInvite,setListCanInvite] = useState<User[]>([]);
    const [listGuests,setListGuests] = useState<ConvidadoSchema[]>([]); 


    async function getEvento(){
        try {
            
            const response = await api.get("/event/"+idEvento,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setEvento(response.data);
            setDataFormatted(new Date(response.data.data).toLocaleDateString());
            
            if(response.data.imagem){
                const responseImage = await api.get("/event-image/"+idEvento,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    responseType:"blob"
                })
    
                setImageEvento(URL.createObjectURL(responseImage.data));
                return;
            }
            setImageEvento("data:image/jpeg;base64,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");

            

        } catch (error) {
            console.log(error);
        }
    }




    async function getUsersCanInvitations(){
        const responseUsers = await api.get("/users");
        const responseConvidados = await api.get(`/convidados/${idEvento}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        const convidados = responseConvidados.data as ConvidadoSchema[];
        const users = responseUsers.data as User[];

        
        const guests : User[]= [];

         users.filter((user) => {  
            let verifica = false;

            convidados.forEach((convidado) =>{
               if(user.id === convidado.convidadoId){
                verifica=true;
               }
            });

            if(verifica === false){
                guests.push(user);
            }
        });
        setListCanInvite(guests);
    }



    function listSearchUsers(e:ChangeEvent){

        const searchedName = (e.target as HTMLInputElement).value;

        if(searchedName.length === 0 || null){
            setListUsersSearched([])
            return;
        }

        const splitSearchedName = searchedName.slice(0,searchedName.length + 1).split(" ").join(" ");

        const splitName  : User[]=[];

        listCanInvite.forEach((guest)=>{

            const charactersName = guest.name.toLocaleLowerCase().slice(0,searchedName.length).split(" ").join(" ");

            if(splitSearchedName === charactersName){
                splitName.push(guest);
            }

        })   
        setListUsersSearched(splitName);
    }




    
    async function getGuests(){
        const responseUsers = await api.get("/users");
        const responseConvidados = await api.get(`/convidados/${idEvento}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        
        const convidados = responseConvidados.data as ConvidadoSchema[];
        const users = responseUsers.data as User[];

        const guests = convidados.filter(convidado => users.filter(user => user.id !== convidado.convidadoId));
        setListGuests(guests);
    }

    async function inviteUser(idUser:string){
        try {
            
            const response= await api.post(`/convidado/${idEvento}`,{
                convidadoId:idUser
            },{
                headers:{
                Authorization:`Bearer ${token}`
                }
            })
            
            console.log(response.data);
            
            getGuests()
            getUsersCanInvitations();

        } catch (error) {
            console.log(error);
            
        }
    }

    
    function editEventPage(){
        navigate("/edit-evento?id="+idEvento);
    }


    useEffect(()=>{
        getEvento();
        getUsersCanInvitations()
        getGuests()
        
    },[])



    return (
        <Container>

            <NavBar/>

            <div className="infoEventoPage">

                <div className="box-evento">
                    <img id="image-info" src={imageEvento ? imageEvento : "data:image/jpeg;base64,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"} alt="" />
                    <div className="dados-evento">
                            <span>Título:{evento?.title}</span>
                            <span>Data: {dataFormatted}</span>
                            <span>Horario:{evento?.horario}</span>
                            <span>Quantidade de participantes: {evento?.quantPart}</span>
                    </div>

                    <button id="btn-editEvento" onClick={editEventPage}>
                        <IconWrapper icon={FiEdit}></IconWrapper>
                    </button>

                </div>

                <div className="box-convites">

                    <input id="search-input" type="text" placeholder="Search..." onChange={listSearchUsers}/> 

                    <div className="box-convidados">

                        {listUsersSearched.length === 0 && 
                        
                            <p>Pesquise um nome de um usuário para ser convidado...</p>
                        }

                        {listUsersSearched.map(guest=>
                                <div className="convidado-wrapper">
                                    <CardConvidadoEvento id={guest.id}/>
                                    <button id="btn-convidar" onClick={()=>inviteUser(guest.id)}>Convidar</button>
                                </div>
                        )}

                    </div>

                    <h2>Lista de Convidados</h2>




                    <div className="lista-convidados">

                        {listGuests.length == 0 && 

                            <p>A lista de Convidados está vazia</p>
                        }

                        {listGuests.length > 0 && listGuests.map(guest=>

                            <div className="convidado">
                                <CardConvidadoEvento id={guest.convidadoId} />
                                <div className="box-presenca" style={guest.presenca ? {backgroundColor:"#3aff5b"} : {backgroundColor:"#ff3a44"}} >
                                
                                    <span id="text-presenca">Presença</span>
                                    <span id="presenca">{guest.presenca ? "Confirmada" : "Não Confirmada" }</span>
                                </div>
                            </div>
                        
                            
                        )}

                    </div>
                </div>
            </div>
        </Container>
    )
}