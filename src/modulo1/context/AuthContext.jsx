import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (currentUser) {
      setUser(currentUser);
    }

  }, []);

  const register = (newUser) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      user => user.email === newUser.email
    );

    if (userExists) {
      return false;
    }

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return true;
  };

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

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    setUser(foundUser);

    return true;
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