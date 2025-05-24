import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { RequireAuth } from "../contexts/Auth/RequireAuth"
import { Perfil } from "../pages/Perfil"
import { Eventos } from "../pages/Eventos"
import { EditEventPage } from "../pages/EditEvento"
import { CreateEvento } from "../pages/CreateEvento"
import { EditPerfil } from "../pages/EditPerfil"


export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route  path="/login" element={<Login/>}></Route>
            <Route path="/" element={<RequireAuth><Home/></RequireAuth>}></Route>
            <Route path="/perfil" element={<RequireAuth><Perfil/></RequireAuth>}></Route>
            <Route path="/eventos" element={<RequireAuth><Eventos/></RequireAuth>}></Route>
            <Route path="/edit-evento?" element={<RequireAuth><EditEventPage/></RequireAuth>}></Route>
            <Route path="/create-evento" element={<RequireAuth><CreateEvento/></RequireAuth>}></Route>
            <Route path="/perfil/edit?" element={<RequireAuth><EditPerfil/></RequireAuth>}></Route>
        </Routes>
    )
}