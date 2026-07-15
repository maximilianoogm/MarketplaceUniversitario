import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const registerHeroImage =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setCargando(true);
    try {
      // Registra en el backend real (POST /users). El schema usa "nombre".
      await register({
        nombre: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "El usuario ya existe");
    } finally {
      setCargando(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-xs outline-none transition focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/15";

  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1fr_1fr]">

          <div className="p-8 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-900">
                  Registro universitario
                </span>
                <h2 className="mt-4 text-3xl font-black text-gray-950">
                  Crea tu cuenta
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Registra tus datos y empieza a usar UniMarket.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label htmlFor="register-name" className="mb-2 block text-sm font-bold text-gray-800">
                    Nombre completo
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="register-email" className="mb-2 block text-sm font-bold text-gray-800">
                    Correo universitario
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="nombre@universidad.edu.pe"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="register-password" className="mb-2 block text-sm font-bold text-gray-800">
                    {"Contrase\u00f1a"}
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder={"Crea una contrase\u00f1a segura"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full rounded-lg bg-indigo-900 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-indigo-800 active:scale-[0.99] disabled:opacity-60"
                >
                  {cargando ? "Creando..." : "Crear cuenta"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                {"\u00bfYa tienes cuenta?"}{" "}
                <Link to="/login" className="font-bold text-indigo-900 hover:text-amber-600">
                  {"Inicia sesi\u00f3n"}
                </Link>
              </p>
            </div>
          </div>

          <aside className="relative overflow-hidden bg-indigo-900 p-8 text-white sm:p-10">
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  Comunidad universitaria
                </p>
                <h1 className="mt-3 text-5xl font-black tracking-tight">
                  Uni<span className="text-amber-400">Market</span>
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-indigo-100">
                  Compra libros, comparte apuntes, publica servicios y conecta con estudiantes de tu campus.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3">
                <img
                  src={registerHeroImage}
                  alt="Comunidad universitaria UniMarket"
                  className="h-52 w-full rounded-xl object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-3 transition hover:-translate-y-0.5 hover:bg-white/15">
                  <span className="block text-2xl font-black text-amber-300">+</span>
                  <span className="text-xs text-indigo-100">Apuntes</span>
                </div>
                <div className="rounded-xl bg-white/10 p-3 transition hover:-translate-y-0.5 hover:bg-white/15">
                  <span className="block text-2xl font-black text-amber-300">S/.</span>
                  <span className="text-xs text-indigo-100">Ventas</span>
                </div>
                <div className="rounded-xl bg-white/10 p-3 transition hover:-translate-y-0.5 hover:bg-white/15">
                  <span className="block text-2xl font-black text-amber-300">24h</span>
                  <span className="text-xs text-indigo-100">Contacto</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default Register;
