import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './modulo1/pages/Login';
import Register from './modulo1/pages/Register';
import FeedPrincipal from './modulo2/pages/FeedPrincipal';
import DetalleAnuncio from './modulo2/pages/DetalleAnuncio'; 
import Dashboard from './modulo4/pages/Dashboard';

import PostForm from './modulo3/components/PostForm';
import EditPost from './modulo3/pages/EditPost';
import MyPosts from './modulo3/pages/MyPosts';
import ChatwootWidget from './components/ChatwootWidget';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        
        {isLoggedIn && (
          <nav className="bg-indigo-900 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                
                <div className="flex-shrink-0">
                  <Link to="/" className="text-xl font-black tracking-tight hover:text-amber-400 transition-colors">
                    🎓 Uni<span className="text-amber-400">Market</span>
                  </Link>
                </div>

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

                <div className="flex items-center space-x-2 md:space-x-4">
                  <Link to="/" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                    🏠 <span>Inicio</span>
                  </Link>

                  <Link to="/publicar" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                    ➕ <span className="ml-0.5">Publicar</span>
                  </Link>
                  
                  <Link to="/mis-articulos" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                    📦 <span className="hidden sm:inline">Mis Artículos</span>
                  </Link>

                  <Link to="/dashboard" className="text-sm font-medium hover:text-amber-400 px-2 py-2 rounded-md transition-colors flex items-center gap-1">
                    👤 <span>Mi Perfil</span>
                  </Link>

                  <button 
                    onClick={() => setIsLoggedIn(false)} 
                    className="bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-lg shadow transition-all transform active:scale-95"
                  >
                    🚪 Salir
                  </button>
                </div>

              </div>
            </div>
          </nav>
        )}

        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/registro" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
            
            <Route path="/" element={isLoggedIn ? <FeedPrincipal /> : <Navigate to="/login" />} />
            <Route path="/detalle/:id" element={isLoggedIn ? <DetalleAnuncio /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            
            <Route path="/publicar" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
            <Route path="/editar/:id" element={isLoggedIn ? <EditPost /> : <Navigate to="/login" />} />
            <Route path="/mis-articulos" element={isLoggedIn ? <MyPosts /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>

      {isLoggedIn && <ChatwootWidget/>}
    </BrowserRouter>
  );
}

export default App;