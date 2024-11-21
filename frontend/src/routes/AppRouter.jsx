import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from './auth/Auth'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}