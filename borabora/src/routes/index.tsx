import { Routes, Route, Navigate } from "react-router-dom"


export const AppRoutes = ()=>{
    return (
        <Routes>
            <Route path="/login" element={<p>Pagina de login</p>}></Route>
            <Route path="*" element={<Navigate to={"/login"}/>}></Route>
        </Routes>
    )
}