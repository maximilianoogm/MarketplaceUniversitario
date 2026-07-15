import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../modulo1/context/AuthContext';
import useFetch from '../../hooks/useFetch';

/* ══════════════════════════════════════════
   URL de la API
   ══════════════════════════════════════════ */
const API_URL = "https://backend-unimarket.onrender.com";

const obtenerImagenCategoria = (producto) => {
  if (producto.imagen && producto.imagen.startsWith("http") && !producto.imagen.includes("placeholder")) {
    return producto.imagen;
  }
  const categoria = producto.categoria?.name?.toLowerCase() || "";
  if (categoria.includes("libro")) {
    return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80";
  }
  if (categoria.includes("copia") || categoria.includes("impresion") || categoria.includes("apuntes y copias")) {
    return "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80";
  }
  if (categoria.includes("apunte") || categoria.includes("resumen")) {
    return "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80";
  }
  if (categoria.includes("laboratorio") || categoria.includes("herramienta") || categoria.includes("material")) {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&auto=format&fit=crop&q=80";
  }
  return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80";
};

export default function MyPosts() {
  const { user } = useContext(AuthContext);

  const { data: productos, loading, error } = useFetch(`${API_URL}/products`);
  
  const [misPublicaciones, setMisPublicaciones] = useState([]);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [toast, setToast] = useState({ visible: false, mensaje: '' });

  const [modalEliminar, setModalEliminar] = useState({ abierto: false, postId: null });

  useEffect(() => {
    if (productos && user?.id) {
      const filtrados = productos.filter((post) => post.autorId === user.id);
      setMisPublicaciones(filtrados);
    }
  }, [productos, user]);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast({ visible: false, mensaje: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const solicitarEliminar = (postId) => {
    setModalEliminar({ abierto: true, postId });
  };

  const cerrarModal = () => {
    setModalEliminar({ abierto: false, postId: null });
  };

  const ejecutarEliminar = async () => {
    const postId = modalEliminar.postId;
    if (!postId) return;

    setEliminandoId(postId);
    cerrarModal(); 

    try {
      const res = await fetch(`${API_URL}/products/${postId}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("No se pudo eliminar de la base de datos.");

      setMisPublicaciones(prev => prev.filter(post => post.id !== postId));
      setToast({ visible: true, mensaje: "Anuncio eliminado con éxito." });
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      
      {toast.visible && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 max-w-sm p-4 rounded-xl shadow-2xl border bg-emerald-50 border-emerald-100 text-emerald-800 animate-bounce">
          <span className="text-xl">✅</span>
          <p className="text-sm font-bold">{toast.mensaje}</p>
        </div>
      )}

      {modalEliminar.abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-xs transition-opacity">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-scaleIn">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 text-red-600 rounded-full mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-950 text-center">¿Eliminar publicación?</h3>
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
              Esta acción no se puede deshacer. Se borrará permanentemente de UniMarket y se cerrarán las salas de chat asociadas a este producto.
            </p>

            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={cerrarModal}
                className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                No, cancelar
              </button>
              <button
                onClick={ejecutarEliminar}
                className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-md shadow-red-200"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition">

              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={obtenerImagenCategoria(post)} alt={post.titulo} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{post.categoria?.name}</span>
                  <span className="text-lg font-bold text-gray-800">S/ {Number(post.precio).toFixed(2)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">{post.descripcion}</p>

                <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end">
                  <Link 
                    to={`/editar/${post.id}`} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    ✏️ Editar
                  </Link>
                  <button 
                    onClick={() => solicitarEliminar(post.id)}
                    disabled={eliminandoId === post.id}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {eliminandoId === post.id ? 'Eliminando...' : '🗑️ Eliminar'}
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