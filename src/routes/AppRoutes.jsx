import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<div>Perfil do usuário</div>} />
          <Route
            path="/reservas"
            element={<div>Minhas reservas</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;