import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { IniciarSesion } from './pages/IniciarSesion'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/iniciar_sesion',
        element: <IniciarSesion />
    }
]);

export function App() {
    return (
        <>
            <RouterProvider router={router} />  
        </>
    );
}
