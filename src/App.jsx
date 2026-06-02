import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// ==========================================
// IMPORTACIONES DE TUS COMPAÑEROS
// ==========================================
import Login from './modulo1/pages/Login';
import Register from './modulo1/pages/Register';
import FeedPrincipal from './modulo2/pages/FeedPrincipal';
import DetalleAnuncio from './modulo2/pages/DetalleAnuncio'; 
import Dashboard from './modulo4/pages/Dashboard';

// ==========================================
// IMPORTACIONES DE TU MÓDULO 3
// ==========================================
import PostForm from './modulo3/components/PostForm';
import EditPost from './modulo3/pages/EditPost';
import MyPosts from './modulo3/pages/MyPosts';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        
        {/* ================= NAVBAR GLOBAL ================= */}
        <nav className="bg-indigo-900 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo */}
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

                {/* Opciones privadas (Solo logueados) */}
                {isLoggedIn && (
                  <>
                    <Link to="/publicar" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                      ➕ <span className="ml-0.5">Publicar</span>
                    </Link>
                    <Link to="/mis-articulos" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                      📦 <span className="hidden sm:inline">Mis Artículos</span>
                    </Link>
                  </>
                )}

                <Link to="/chat" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  💬 <span className="hidden sm:inline">Mensajes</span>
                </Link>

                {/* Ruta de tu compañero del Módulo 4 */}
                <Link to="/dashboard" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  👤 <span>Mi Perfil</span>
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

        {/* CONTENEDOR CENTRAL DE LAS PÁGINAS */}
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            {/* RUTAS DE TUS COMPAÑEROS */}
            <Route path="/" element={<FeedPrincipal />} />
            <Route path="/detalle/:id" element={<DetalleAnuncio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* RUTAS DE TU MÓDULO 3 */}
            <Route path="/publicar" element={<PostForm />} />
            <Route path="/editar/:id" element={<EditPost />} />
            <Route path="/mis-articulos" element={<MyPosts />} />

            {/* MÓDULO 5 (Aún en construcción por tu equipo) */}
            <Route path="/chat" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Módulo 5: Chat y Mensajería</h2>
                <p className="text-gray-500 mt-1">Bandeja de entrada simulada para negociar compras y ventas.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;