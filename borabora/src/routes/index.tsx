import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "../pages/LoginPage/Login"
import { Home } from "../pages/Home/Home"
import { RequireAuth } from "../contexts/Auth/RequireAuth"
import { Perfil } from "../pages/PerfilPage/Perfil"
import { Eventos } from "../pages/ListEventosPage/Eventos"
import { EditEventPage } from "../pages/EditEventoPage/EditEvento"
import { CreateEvento } from "../pages/CreateEventoPage/CreateEvento"
import { EditPerfil } from "../pages/EditPerfilPage/EditPerfil"
import { CreateUser } from "../pages/RegisterUserPage/RegisterUser"
import { InfoEvento } from "../pages/InfoEventoPage/InfoEvento"
import { ConvitesUsuario } from "../pages/ConviteUsuarioPage/ConvitesUsuario"


export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route  path="/login" element={<Login/>}></Route>
            <Route path="/" element={<RequireAuth><Home/></RequireAuth>}></Route>
            <Route path="/perfil" element={<RequireAuth><Perfil/></RequireAuth>}></Route>
            <Route path="/eventos" element={<RequireAuth><Eventos/></RequireAuth>}></Route>
            <Route path="/edit-evento?" element={<RequireAuth><EditEventPage/></RequireAuth>}></Route>
            <Route path="/create-evento" element={<RequireAuth><CreateEvento/></RequireAuth>}></Route>
            <Route path="/perfil/edit" element={<RequireAuth><EditPerfil/></RequireAuth>}></Route>
            <Route path="/cadastro" element={<CreateUser/>}></Route>
            <Route path="/dados-evento/?" element={<RequireAuth><InfoEvento/></RequireAuth>}></Route>
            <Route path="/convites" element={<RequireAuth><ConvitesUsuario/></RequireAuth>}></Route>


        </Routes>
    )
}