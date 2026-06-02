import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// Importamos los componentes reales de tu compañero (Módulo 1)
import Login from './modulo1/pages/Login';
import Register from './modulo1/pages/Register';
// Importación de tu Módulo 2 (Feed Principal)
import FeedPrincipal from './modulo2/pages/FeedPrincipal';
import Dashboard from './modulo4/pages/Dashboard';

import ChatwootWidget from './components/ChatwootWidget';

function App() {
  
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

              {/* Barra de Búsqueda (Estilo Amazon) */}
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
                {/* Enlace al Módulo 2 (Inicio / Feed) - MODIFICADO CON LA CASITA */}
                <Link to="/" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  🏠 <span>Inicio</span>
                </Link>

                {/* Enlace al Módulo 3 (Crear Publicación) */}
                <Link to="/publicar" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  ➕ <span className="ml-0.5">Publicar</span>
                </Link>

                {/* Enlace al Módulo 5 (Chat / Mensajería) */}
                <Link to="/chat" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  💬 <span className="hidden sm:inline">Mensajes</span>
                </Link>

                {/* Enlace al Módulo 4 (Perfil del Usuario) */}
                <Link to="/dashboard" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                  👤 <span>Mi Perfil</span>
                </Link>

                {/* Botón de Acento para el Módulo 1 (Login) */}
                <Link to="/login" className="bg-amber-500 hover:bg-amber-400 text-indigo-950 text-sm font-bold px-3 py-2 rounded-lg shadow transition-all transform active:scale-95">
                  Ingresar
                </Link>
              </div>

            </div>
          </div>
        </nav>
        {/* ======================================================================= */}

        {/* CONTENEDOR CENTRAL DE LAS PÁGINAS */}
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            {/* Módulo 2: Feed Principal Conectado Real */}
            <Route path="/" element={<FeedPrincipal />} />
            
            {/* Módulo 1: Login y Registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Módulo 3: Crear Publicación */}
            <Route path="/publicar" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Módulo 3: Crear Publicación</h2>
                <p className="text-gray-500 mt-1">Formulario para añadir un nuevo artículo a mockAnuncios.</p>
              </div>
            } />

            {/* Módulo 4: Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Módulo 5: Chat entre Usuarios */}
            <Route path="/chat" element={
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Módulo 5: Chat y Mensajería</h2>
                <p className="text-gray-500 mt-1">Bandeja de entrada simulada para negociar compras y ventas.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
      <ChatwootWidget/>
    </BrowserRouter>

    
  );
}

export default App;