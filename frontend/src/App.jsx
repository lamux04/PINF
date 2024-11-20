import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { Home } from './pages/Home'
import { Login } from './pages/Login'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

export function App() {
    return (
        <>
            <RouterProvider router={router} />  
        </>
    );
}
