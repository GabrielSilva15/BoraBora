import { Link } from "react-router-dom"
import IconWrapper from "../Icon"
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useContext } from "react";
import { ItemList, NavBarList, NavBarWrapper } from "./styles";


export const NavBar = ()=>{

    const {user,token,signOut} = useContext(AuthContext);

    return (
        <>
            <NavBarWrapper>
                {token && 
                    <NavBarList className="rotas-logado">
                        <ItemList>
                            <Link to="/">Home</Link>
                        </ItemList> 

                        <ItemList>
                            <Link to="/perfil">Perfil</Link>
                        </ItemList>

                        <ItemList>
                            <Link to="/eventos">Eventos</Link>                        
                        </ItemList>

                        <ItemList>                        
                            <Link to="/convites">Convites</Link>
                        </ItemList>

                        <ItemList>                        
                            <Link id="rota-logout" to="/login" onClick={signOut}>
                                <IconWrapper icon={FiLogOut}/>
                            </Link>   
                        </ItemList>
                    </NavBarList>
                }
            </NavBarWrapper>
        </>
    )
}
