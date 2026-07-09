import { useState, useContext } from "react"; // 1. Agregamos useContext de React
import { Link, useNavigate } from "react-router-dom";
// 2. Importamos AuthContext con llaves y la ruta exacta relativa
import { AuthContext } from "../context/AuthContext"; 

const loginHeroImage =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  // 3. Consumimos el AuthContext usando el método oficial de React
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // 3. REMPLAZADO: Ya no validamos contra "juan" hardcodeado. 
    // Ahora llamamos a la función global que busca en localStorage["users"]
    const esValido = login(email.trim(), password.trim());

    if (esValido) {
      setIsLoggedIn(true); 
      navigate("/");       
    } else {
      setError("Correo universitario o contraseña incorrectos");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-xs outline-none transition focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/15";

  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

          <aside className="bg-indigo-900 p-8 text-white sm:p-10 flex flex-col justify-between gap-8">
            <div>
              {/* CORRECCIÓN LEVE: Eliminamos el texto "Módulo 1" que salía en producción */}
              <h1 className="text-4xl font-black tracking-tight">
                Vuelve a <span className="text-amber-400">UniMarket</span>
              </h1>
              <p className="mt-4 text-sm leading-6 text-indigo-100">
                Entra para explorar publicaciones, guardar favoritos y contactar estudiantes del campus.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3">
              <img
                src={loginHeroImage}
                alt="Estudiantes revisando recursos universitarios"
                className="h-48 w-full rounded-xl object-cover"
              />
              <div className="absolute bottom-4 left-6 rounded-xl bg-white/95 px-4 py-3 text-indigo-950 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Campus activo
                </p>
                <p className="text-sm font-black">Libros, apuntes y servicios</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-xl bg-white/10 p-3 transition hover:bg-white/15">
                <span className="block text-lg font-black text-amber-300">01</span>
                Explora
              </div>
              <div className="rounded-xl bg-white/10 p-3 transition hover:bg-white/15">
                <span className="block text-lg font-black text-amber-300">02</span>
                Contacta
              </div>
              <div className="rounded-xl bg-white/10 p-3 transition hover:bg-white/15">
                <span className="block text-lg font-black text-amber-300">03</span>
                Compra
              </div>
            </div>
          </aside>

          <div className="p-8 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                  Iniciar sesión
                </span>
                <h2 className="mt-4 text-2xl font-black text-gray-950">
                  Entra a tu cuenta
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Usa tu correo universitario y contraseña para continuar.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-sm font-bold text-gray-800">
                    Correo universitario
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="nombre@universidad.edu.pe"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-2 block text-sm font-bold text-gray-800">
                    Contraseña
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-black text-indigo-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.99]"
                >
                  Ingresar
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                ¿Aún no tienes cuenta?{" "}
                <Link to="/registro" className="font-bold text-indigo-900 hover:text-amber-600">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Login;