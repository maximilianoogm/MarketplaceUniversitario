import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../modulo1/context/AuthContext';
import useFetch from '../../hooks/useFetch';

/* ══════════════════════════════════════════
   URL de la API
   ══════════════════════════════════════════ */
const API_PRODUCTS = "http://localhost:3000/products";

export default function MyPosts() {
  const { user } = useContext(AuthContext);

  // Traemos todos los productos y filtramos localmente por el autor logueado
  const { data: productos, loading, error } = useFetch(API_PRODUCTS);

  const misPublicaciones = useMemo(() => {
    if (!productos || !user?.id) return [];
    return productos.filter((post) => post.autorId === user.id);
  }, [productos, user]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Mis Artículos en Venta</h2>
        <Link to="/publicar" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          + Nuevo Anuncio
        </Link>
      </div>

      {loading && (
        <p className="text-center text-gray-400 py-12">Cargando tus artículos...</p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 py-12">No se pudo conectar con el servidor ({error})</p>
      )}

      {!loading && !error && misPublicaciones.length === 0 && (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-4">Aún no tienes artículos publicados.</p>
        </div>
      )}

      {!loading && !error && misPublicaciones.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {misPublicaciones.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col">

              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{post.categoria?.name}</span>
                  <span className="text-lg font-bold text-gray-800">S/ {Number(post.precio).toFixed(2)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{post.descripcion}</p>

                <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                  Edición y eliminación próximamente.
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
