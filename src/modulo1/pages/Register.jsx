import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleRegister = (e) => {

    e.preventDefault();

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const success = register({
      name,
      email,
      password,
    });

    if (success) {
      navigate("/login");
    } else {
      setError("El usuario ya existe");
    }
  };

  return (
    <div>

      <h2>Registro</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Registrarse
        </button>

        {error && <p>{error}</p>}

      </form>

    </div>
  );
};

export default Register;