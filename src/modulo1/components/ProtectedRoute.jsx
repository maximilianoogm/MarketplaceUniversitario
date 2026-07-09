import { Navigate } from "react-router-dom";

// Este componente funciona como un "portero de discoteca"
// Si estás logueado te deja pasar a ver los componentes hijos (children)
// Si no, te rebota de inmediato al Login
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;