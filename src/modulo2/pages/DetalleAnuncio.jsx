import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ChatwootWidget from '../../components/ChatwootWidget';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../modulo1/context/AuthContext'; // Importamos el contexto para saber quién está logueado

/* ══════════════════════════════════════════
   URL de la API
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

// ==========================================
// FUNCIÓN SELECTORA DE IMÁGENES TEMÁTICAS
// ==========================================
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

const DetalleAnuncio = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Obtenemos el usuario activo

  const { data: anuncio, loading: cargando, error, mutate } = useFetch(`${API_URL}/products/${id}`);

  // ── ESTADOS PARA LA CALIFICACIÓN ──
  const [puntuacionUsuario, setPuntuacionUsuario] = useState(0);
  const [votoRegistrado, setVotoRegistrado] = useState(false);
  const [enviandoVoto, setEnviandoVoto] = useState(false);

  // Función para calificar y hacer PATCH en el backend
  const calificarProducto = async (estrellas) => {
    if (enviandoVoto || votoRegistrado) return;
    setEnviandoVoto(true);
    setPuntuacionUsuario(estrellas);

    try {
      const res = await fetch(`${API_URL}/products/${id}/rate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: estrellas })
      });

      if (!res.ok) throw new Error("No se pudo registrar la puntuación.");

      setVotoRegistrado(true);
      
      // mutate actualiza la información del producto localmente en el hook useFetch sin recargar la página
      if (mutate) {
        mutate();
      }
    } catch (err) {
      alert("Error al calificar: " + err.message);
    } finally {
      setEnviandoVoto(false);
    }
  };

  const contactarVendedor = () => {
    if (!window.$chatwoot) return;

    const ultimoVendedor = window.localStorage.getItem("ultimoVendedorChat");

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

  // Comprobar si el usuario logueado es el dueño de la publicación
  const esPropietario = user?.id === anuncio.autorId;

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
            src={obtenerImagenCategoria(anuncio)}
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
              <span className="text-amber-500 font-bold flex items-center gap-1">
                ⭐ {Number(anuncio.rating ?? 5.0).toFixed(1)}
              </span>
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

          <div className="space-y-4 mt-8">
            {/* ── SECCIÓN INTERACTIVA DE ESTRELLAS ── */}
            {!esPropietario && (
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2">¿Qué te parece este artículo?</h4>
                {votoRegistrado ? (
                  <p className="text-emerald-700 font-bold text-xs flex items-center gap-1.5 animate-pulse">
                    🎉 ¡Tu calificación de {puntuacionUsuario} ⭐ ha sido registrada con éxito!
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-500">Haz clic para calificar:</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((estrella) => (
                        <button
                          key={estrella}
                          onClick={() => calificarProducto(estrella)}
                          disabled={enviandoVoto}
                          className="text-2xl transition-all duration-150 active:scale-90 hover:scale-115 cursor-pointer"
                        >
                          {estrella <= (puntuacionUsuario) ? '⭐' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Información del vendedor */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
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