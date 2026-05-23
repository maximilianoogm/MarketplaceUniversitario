import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Estado global del usuario
  const [user, setUser] = useState(null);

  // Cargar sesión guardada
  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (currentUser) {
      setUser(currentUser);
    }

  }, []);

  // REGISTER
  const register = (newUser) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si ya existe
    const userExists = users.find(
      user => user.email === newUser.email
    );

    if (userExists) {
      return false;
    }

    // Guardar nuevo usuario
    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return true;
  };

  // LOGIN
  const login = (email, password) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      user =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      return false;
    }

    // Guardar sesión
    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    // Actualizar estado global
    setUser(foundUser);

    return true;
  };

  // LOGOUT
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