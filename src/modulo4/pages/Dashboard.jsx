import { useContext, useMemo } from "react";
import { AuthContext } from "../../modulo1/context/AuthContext";
import useFetch from "../../hooks/useFetch";

/* ══════════════════════════════════════════
   URLs de la API
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Dos peticiones con useFetch: el perfil del usuario y la lista de productos
  const { data: perfil, loading: loadP, error: errP } = useFetch(
    user?.id ? `${API_URL}/users/${user.id}` : null
  );
  const { data: productos, loading: loadProd } = useFetch(`${API_URL}/products`);

  const misAnuncios = useMemo(() => {
    if (!productos || !user?.id) return [];
    return productos.filter((p) => p.autorId === user.id);
  }, [productos, user]);

  const cargando = loadP || loadProd;

  if (cargando) {
    return <p className="text-center text-gray-400 py-12">Cargando perfil...</p>;
  }

  if (errP || !perfil) {
    return <p className="text-center text-red-500 py-12">No se pudo cargar el perfil ({errP})</p>;
  }

  // El backend devuelve el nombre como "name" en /users/:id
  const nombre = perfil.name || perfil.nombre || "Usuario";
  const misFavoritos = perfil.productosFavoritos || [];

  let sumaRating = 0;
  for (let i = 0; i < misAnuncios.length; i++) {
    sumaRating = sumaRating + misAnuncios[i].rating;
  }
  const ratingPromedio = misAnuncios.length > 0 ? (sumaRating / misAnuncios.length).toFixed(1) : "—";

  const partes = nombre.split(" ");
  const iniciales = partes[0][0].toUpperCase() + (partes[1] ? partes[1][0].toUpperCase() : "");

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">

      {/* Tarjeta de perfil */}
      <div className="bg-indigo-900 rounded-2xl p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-400 text-indigo-900 font-black text-xl flex items-center justify-center">
            {iniciales}
          </div>
          <div>
            <h1 className="text-2xl font-black">{nombre}</h1>
            <p className="text-indigo-300 text-sm">{perfil.email}</p>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-indigo-900">{perfil.totalPublicaciones}</p>
          <p className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wide">Publicaciones</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-black text-amber-500">{ratingPromedio}</p>
          <p className="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wide">Rating promedio</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">❤️ Mis favoritos</h2>

        {misFavoritos.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
            <p className="text-4xl mb-3">🤍</p>
            <p className="font-bold">Aún no tienes favoritos</p>
            <p className="text-sm mt-1">Dale corazón a los anuncios en el feed para verlos aquí</p>
          </div>
        ) : (
          <div className="space-y-3">
            {misFavoritos.map((anuncio) => (
              <div key={anuncio.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
                <img
                  src={anuncio.imagen}
                  alt={anuncio.titulo}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm mt-1 truncate">{anuncio.titulo}</p>
                  <p className="text-xs text-gray-400">⭐ {anuncio.rating}</p>
                </div>
                <p className="font-black text-gray-900 text-sm flex-shrink-0">
                  {anuncio.precio === 0 ? <span className="text-green-600">Gratis</span> : `S/ ${Number(anuncio.precio).toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-black text-gray-900 mb-4">Mis publicaciones</h2>

        {misAnuncios.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-bold">Aún no tienes publicaciones</p>
          </div>
        ) : (
          <div className="space-y-3">
            {misAnuncios.map((anuncio) => (
              <div key={anuncio.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
                <img
                  src={anuncio.imagen}
                  alt={anuncio.titulo}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full uppercase">
                    {anuncio.categoria?.name}
                  </span>
                  <p className="font-bold text-gray-900 text-sm mt-1 truncate">{anuncio.titulo}</p>
                  <p className="text-xs text-gray-400">⭐ {anuncio.rating} · {anuncio.fechaPublicacion}</p>
                </div>
                <p className="font-black text-gray-900 text-sm flex-shrink-0">
                  {anuncio.precio === 0 ? <span className="text-green-600">Gratis</span> : `S/ ${Number(anuncio.precio).toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
