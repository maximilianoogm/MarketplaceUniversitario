import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importamos los componentes de tus compañeros
import Login from './modulo1/pages/Login';
import Register from './modulo1/pages/Register';
import FeedPrincipal from './modulo2/pages/FeedPrincipal';

// ==========================================
// IMPORTACIONES DE TU MÓDULO 3 (TÚ CÓDIGO)
// ==========================================
import PostForm from './modulo3/components/PostForm';
import EditPost from './modulo3/pages/EditPost';
import MyPosts from './modulo3/pages/MyPosts';

function App() {
  // SIMULADOR DE LOGIN: Cambia a 'true' o usa el botón "Ingresar" para probar
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {/* Fondo claro global para scroll infinito */}
      <div className="min-h-screen bg-gray-50 text-gray-800">
        
        {/* ================= NAVBAR GLOBAL (Estilo Amazon / Temu) ================= */}
        <nav className="bg-indigo-900 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo / Nombre del Marketplace */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-black tracking-tight hover:text-amber-400 transition-colors">
                  🎓 Uni<span className="text-amber-400">Market</span>
                </Link>
              </div>

              {/* Barra de Búsqueda */}
              <div className="hidden md:block flex-1 max-w-md mx-8">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar libros, apuntes, servicios..." 
                    className="w-full bg-white text-gray-900 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Botones de Navegación del Navbar */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link to="/" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  🏠 <span>Inicio</span>
                </Link>

                {/* Mostrar opciones privadas solo si está logueado */}
                {isLoggedIn && (
                  <>
                    <Link to="/publicar" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                      ➕ <span className="ml-0.5">Publicar</span>
                    </Link>

                    {/* TU PANTALLA: Mis Artículos */}
                    <Link to="/mis-articulos" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                      📦 <span className="hidden sm:inline">Mis Artículos</span>
                    </Link>
                  </>
                )}

                <Link to="/chat" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  💬 <span className="hidden sm:inline">Mensajes</span>
                </Link>

                {isLoggedIn ? (
                  <button onClick={() => setIsLoggedIn(false)} className="text-sm font-medium hover:text-red-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                    🚪 Salir
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsLoggedIn(true)} className="bg-amber-500 hover:bg-amber-400 text-indigo-950 text-sm font-bold px-3 py-2 rounded-lg shadow transition-all transform active:scale-95">
                    Ingresar
                  </Link>
                )}
              </div>

            </div>
          </div>
        </nav>
        {/* ======================================================================= */}

        {/* CONTENEDOR CENTRAL DE LAS PÁGINAS */}
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<FeedPrincipal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* ========================================== */}
            {/* RUTAS DE TU MÓDULO 3 CONECTADAS */}
            {/* ========================================== */}
            <Route path="/publicar" element={<PostForm />} />
            <Route path="/editar/:id" element={<EditPost />} />
            <Route path="/mis-articulos" element={<MyPosts />} />

            {/* Rutas pendientes de tus compañeros */}
            <Route path="/perfil" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Módulo 4: Perfil de Usuario</h2>
              </div>
            } />
            <Route path="/chat" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Módulo 5: Chat y Mensajería</h2>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;