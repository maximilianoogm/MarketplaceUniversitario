import { createContext, useState } from "react";

/* ══════════════════════════════════════════
   URL de la API
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Estado inicial perezoso: lee la sesión guardada ANTES del primer render,
  // así al recargar la página las rutas protegidas no rebotan al login.
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  });

  // Acción de escritura: registra al usuario en el backend (POST /users)
  const register = async (newUser) => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.error || "No se pudo registrar el usuario");
    }
    return data.user;
  };

  // Acción de escritura: valida credenciales (POST /login) y guarda la sesión
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.error || "Credenciales incorrectas");
    }
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
