import { useParams, Link } from 'react-router-dom';
import { mockAnuncios } from '../../data/mocks';
import ChatwootWidget from '../../components/ChatwootWidget'; // Importamos el componente del Módulo 5

const DetalleAnuncio = () => {
  const { id } = useParams();
  
  // Buscamos el anuncio específico en nuestros mocks en memoria usando el ID de la URL
  const anuncio = mockAnuncios.find((item) => item.id === parseInt(id));

  // Control de seguridad por si el estudiante manipula la URL manual con un ID inexistente
  if (!anuncio) {
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
      {/* Botón de retorno al catálogo principal */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-indigo-900 hover:text-amber-600 transition-colors gap-2">
          ⬅️ Volver al catálogo
        </Link>
      </div>

      {/* Contenedor Principal de la Ficha del Producto */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-2 gap-8 p-6 sm:p-8">
        
        {/* Columna Izquierda: Imagen del Artículo */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
          <img 
            src={anuncio.imagen} 
            alt={anuncio.titulo} 
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-indigo-900 text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm">
            {anuncio.tipo}
          </span>
        </div>

        {/* Columna Derecha: Información de Venta y Metadatos */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Cabecera, Título y Sistema de Calificación */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Publicado el {anuncio.fechaPublicacion}</span>
              <span>•</span>
              <span className="text-amber-500 font-bold">⭐ {anuncio.rating}</span>
            </div>
            
            <h1 className="text-3xl font-black text-gray-950 tracking-tight leading-tight">
              {anuncio.titulo}
            </h1>

            {/* Precio formateado con estilos de alta visibilidad */}
            <div className="mt-4 text-2xl font-black text-indigo-950">
              {anuncio.precio === 0 ? (
                <span className="text-emerald-600 uppercase tracking-wide bg-emerald-50 px-3 py-1 rounded-lg text-lg">Gratis / Regalo</span>
              ) : (
                `S/ ${anuncio.precio.toFixed(2)}`
              )}
            </div>

            <hr className="my-6 border-gray-100" />

            {/* Descripción del Producto */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Descripción del artículo</h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {anuncio.descripcion}
              </p>
            </div>
          </div>

          {/* Caja Informativa del Vendedor Universitario */}
          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Información del vendedor</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-gray-950 text-base">{anuncio.autor.nombre}</p>
                <p className="text-xs text-indigo-900 font-medium bg-indigo-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  🎓 Ingeniería de {anuncio.autor.carrera}
                </p>
              </div>
              
              {/* Bloque explicativo de experiencia de usuario */}
              <div className="text-right max-w-[200px]">
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  💬 Para negociar con {anuncio.autor.nombre}, usa la burbuja de chat abajo a la derecha.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =======================================================================
          🔥 INYECCIÓN DINÁMICA DEL WIDGET DE CHAT (MÓDULO 5)
          Pasamos el objeto 'anuncio' completo como propiedad. Al cambiar de página,
          el useEffect de Chatwoot actualizará las etiquetas en vivo con la data real.
          ======================================================================= */}
      <ChatwootWidget productoActual={anuncio} />
    </div>
  );
};

export default DetalleAnuncio;