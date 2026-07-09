import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { mockAnuncios } from '../../data/mocks';
// 1. IMPORTANTE: Traemos el contexto de autenticación real
import { AuthContext } from '../../modulo1/context/AuthContext'; 

export default function MyPosts() {
  const [misPublicaciones, setMisPublicaciones] = useState([]);
  
  // 2. Extraemos el usuario logueado en la sesión actual
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Jalamos la base de datos unificada del localStorage
    const baseDeDatosLocal = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];
    
    // Si el localStorage está completamente vacío, lo inicializamos con los mocks
    if (baseDeDatosLocal.length === 0) {
      localStorage.setItem('g3_publicaciones', JSON.stringify(mockAnuncios));
    }

    const datosCargados = baseDeDatosLocal.length > 0 ? baseDeDatosLocal : mockAnuncios;

    // 3. FILTRADO CORREGIDO: Identificamos dinámicamente el ID del usuario actual
    const miIdActual = user?.id || user?.email || "u_001";

    const misAnunciosFiltrados = datosCargados.filter(
      (post) => String(post.autor?.idAutor) === String(miIdActual)
    );
    
    setMisPublicaciones(misAnunciosFiltrados);
  }, [user]); // Agregamos user como dependencia por seguridad

  const handleDelete = (idParaBorrar) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este anuncio?");
    
    if (confirmar) {
      // Actualizamos el estado visual de inmediato
      const listaActualizadaVista = misPublicaciones.filter(post => String(post.id) !== String(idParaBorrar));
      setMisPublicaciones(listaActualizadaVista);
      
      // Actualizamos la base de datos real del localStorage
      const baseDeDatosLocal = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];
      const nuevaBaseDeDatos = baseDeDatosLocal.filter(post => String(post.id) !== String(idParaBorrar));
      localStorage.setItem('g3_publicaciones', JSON.stringify(nuevaBaseDeDatos));
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mis Artículos en Venta</h2>
        <Link to="/publicar" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Nuevo Anuncio
        </Link>
      </div>

      {misPublicaciones.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">Aún no tienes artículos publicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {misPublicaciones.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">
              
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{post.tipo}</span>
                  <span className="text-lg font-bold text-gray-800">S/ {post.precio.toFixed(2)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{post.descripcion}</p>
                
                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <Link 
                    to={`/editar/${post.id}`} 
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded text-center hover:bg-gray-200 transition"
                  >
                    ✏️ Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 bg-red-50 text-red-600 font-semibold py-2 rounded text-center hover:bg-red-100 transition"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}