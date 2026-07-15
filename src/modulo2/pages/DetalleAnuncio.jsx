import { useParams, Link } from 'react-router-dom';
import ChatwootWidget from '../../components/ChatwootWidget';
import useFetch from '../../hooks/useFetch';

/* ══════════════════════════════════════════
   URL de la API
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

const DetalleAnuncio = () => {
  const { id } = useParams();

  // Traemos el producto por su id con el hook useFetch
  const { data: anuncio, loading: cargando, error } = useFetch(`${API_URL}/products/${id}`);

  const contactarVendedor = () => {
    if (!window.$chatwoot) return;

    const ultimoVendedor = window.localStorage.getItem("ultimoVendedorChat");

    // Si el chat abierto es de OTRO vendedor, reseteamos la conversación
    // para no mezclar mensajes de distintos vendedores en el mismo hilo.
    if (ultimoVendedor && ultimoVendedor !== String(anuncio.autorId)) {
      window.$chatwoot.reset();
    }

    window.localStorage.setItem("ultimoVendedorChat", String(anuncio.autorId));

    window.$chatwoot.toggle('open');
    window.$chatwoot.setConversationCustomAttributes({
      vendedorId: String(anuncio.autorId),
      productoId: String(anuncio.id),
    });
  };

  if (cargando) {
    return <p className="text-center text-gray-500 py-12">Cargando...</p>;
  }

  if (error || !anuncio) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-black text-gray-900">Anuncio no encontrado</h2>
        <p className="text-gray-500 mt-2">El artículo que estás buscando no existe o fue retirado por el vendedor.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-800 transition-colors">
          Volver al Feed Principal
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-indigo-900 hover:text-amber-600 transition-colors gap-2">
          ⬅️ Volver al catálogo
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-2 gap-8 p-6 sm:p-8">

        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
          <img
            src={anuncio.imagen}
            alt={anuncio.titulo}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-indigo-900 text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm">
            {anuncio.categoria?.name}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Publicado el {anuncio.fechaPublicacion}</span>
              <span>•</span>
              <span className="text-amber-500 font-bold">⭐ {anuncio.rating}</span>
            </div>

            <h1 className="text-3xl font-black text-gray-950 tracking-tight leading-tight">
              {anuncio.titulo}
            </h1>

            <div className="mt-4 text-2xl font-black text-indigo-950">
              {anuncio.precio === 0 ? (
                <span className="text-emerald-600 uppercase tracking-wide bg-emerald-50 px-3 py-1 rounded-lg text-lg">Gratis / Regalo</span>
              ) : (
                `S/ ${anuncio.precio.toFixed(2)}`
              )}
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Descripción del artículo</h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {anuncio.descripcion}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Información del vendedor</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-gray-950 text-base">{anuncio.autor?.nombre}</p>
                <p className="text-xs text-indigo-900 font-medium bg-indigo-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  🎓 Ingeniería de {anuncio.autor?.carrera}
                </p>
              </div>

              <div className="text-right max-w-[200px]">
                <button
                  onClick={contactarVendedor}
                  className="bg-indigo-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors cursor-pointer"
                >
                  💬 Contactar al vendedor
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ChatwootWidget
        vendedorId={anuncio.autorId}
        productoId={anuncio.id}
        productoTitulo={anuncio.titulo}
      />
    </div>
  );
};

export default DetalleAnuncio;