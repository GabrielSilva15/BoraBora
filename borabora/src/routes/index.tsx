import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"
import { RequireAuth } from "../contexts/Auth/RequireAuth"
import { Perfil } from "../pages/Perfil"


export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/home" element={<RequireAuth><Home/></RequireAuth>}></Route>
            <Route path="/perfil" element={<Perfil/>}></Route>
        </Routes>
    )
}