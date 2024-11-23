import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Auth } from './auth/Auth'
import { Home } from './home/Home'

export const AppRouter = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />    
        </Routes>
    </BrowserRouter>
    );
}