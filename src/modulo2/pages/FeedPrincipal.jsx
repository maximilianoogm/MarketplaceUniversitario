import { useState, useMemo, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../modulo1/context/AuthContext";

/* ══════════════════════════════════════════
   URL de la API (cambia esto por la URL real de tu backend)
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

// ==========================================
// Tarjeta de un producto (mapea el JSON del backend)
// ==========================================
const TarjetaAnuncio = ({ producto, userId, favInicial }) => {
  const [esFavorito, setEsFavorito] = useState(favInicial);
  const [guardando, setGuardando] = useState(false);

  // Sincroniza el corazón cuando llega la info de favoritos del usuario
  // (los productos y los favoritos se cargan en peticiones separadas).
  useEffect(() => {
    setEsFavorito(favInicial);
  }, [favInicial]);

  // Acción de escritura: marca/desmarca el favorito en el backend
  const toggleFavorito = async () => {
    if (!userId || guardando) return;
    setGuardando(true);
    try {
      const res = await fetch(`${API_URL}/products/${producto.id}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setEsFavorito(data.favorito); // el backend devuelve el estado final
      }
    } catch {
      // si falla la red, no cambiamos el corazón
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img src={producto.imagen} alt={producto.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute top-2 left-2 bg-indigo-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
          {producto.categoria?.name}
        </span>
        <button onClick={toggleFavorito} disabled={guardando} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-sm p-1.5 rounded-full shadow-xs backdrop-blur-xs transition-transform active:scale-90 cursor-pointer disabled:opacity-60">
          {esFavorito ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-1">
            <span>⭐</span> {(producto.rating ?? 5.0).toFixed(1)}
          </div>
          <h4 className="font-bold text-gray-950 text-base line-clamp-1 group-hover:text-indigo-900 transition-colors">{producto.titulo}</h4>
          <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{producto.descripcion}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Precio</span>
            <span className="text-lg font-black text-gray-900">
              {producto.precio === 0 ? <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-md">Gratis</span> : `S/. ${Number(producto.precio).toFixed(2)}`}
            </span>
          </div>

          <Link
            to={`/detalle/${producto.id}`}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-xs"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
const FeedPrincipal = () => {
  const { user } = useContext(AuthContext);

  // Traemos los productos reales del backend con el hook useFetch
  const { data: productos, loading, error } = useFetch(`${API_URL}/products`);

  // Traemos el perfil del usuario para saber qué productos ya marcó como favoritos
  const { data: perfil } = useFetch(user?.id ? `${API_URL}/users/${user.id}` : null);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // Set con los IDs de los productos favoritos del usuario (para pintar los corazones)
  const favoritosIds = useMemo(() => {
    const set = new Set();
    (perfil?.productosFavoritos || []).forEach((p) => set.add(p.id));
    return set;
  }, [perfil]);

  // Las categorías del filtro se arman con lo que devuelve el backend
  const gridCategorias = useMemo(() => {
    if (!productos) return ["Todos"];
    return [
      "Todos",
      ...Array.from(new Set(productos.map((p) => p.categoria?.name).filter(Boolean))),
    ];
  }, [productos]);

  // Filtrado local (igual que en el taller)
  const productosFiltrados = useMemo(() => {
    if (!productos) return [];
    if (categoriaSeleccionada === "Todos") return productos;
    return productos.filter((p) => p.categoria?.name === categoriaSeleccionada);
  }, [productos, categoriaSeleccionada]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-20">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><span>⚙️</span> Filtrar por</h3>
          <hr className="border-gray-100 mb-4" />
          <div className="space-y-1">
            {gridCategorias.map((cat) => (
              <button key={cat} onClick={() => setCategoriaSeleccionada(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${categoriaSeleccionada === cat ? "bg-indigo-50 text-indigo-900 font-bold" : "text-gray-600 hover:bg-gray-50"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Descubre publicaciones</h2>
        </div>

        {loading && (
          <p className="text-center text-gray-400 py-12">Cargando publicaciones...</p>
        )}

        {!loading && error && (
          <p className="text-center text-red-500 py-12">No se pudo conectar con el servidor ({error})</p>
        )}

        {!loading && !error && productosFiltrados.length === 0 && (
          <p className="text-center text-gray-400 py-12">Todavía no hay publicaciones en esta categoría.</p>
        )}

        {!loading && !error && productosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <TarjetaAnuncio
                key={producto.id}
                producto={producto}
                userId={user?.id}
                favInicial={favoritosIds.has(producto.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FeedPrincipal;
