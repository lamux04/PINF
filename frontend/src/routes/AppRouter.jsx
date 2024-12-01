import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Auth } from './auth/Auth'
import { Home } from './home/Home'
import { Plantillas } from "./plantillas/Plantillas";
import { VerPlantilla } from "./ver_plantilla/VerPlantilla";
import { VerCurso } from "./ver_curso/VerCurso";
import { EditarPlantilla } from "./editar_plantilla/EditarPlantilla";
import { EditarCurso } from "./editar_curso/EditarCurso";

export const AppRouter = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />  
            <Route path="/plantillas" element={<Plantillas />} />    
            <Route path="/plantillas/:codigo" element={<VerPlantilla />} />    
            <Route path="/cursos/:codigo" element={<VerCurso />} />    
            <Route path="/modificar_plantilla/:codigo" element={<EditarPlantilla />} />    
            <Route path="/modificar_curso/:codigo" element={<EditarCurso />} />    
        </Routes>
    </BrowserRouter>
    );
}