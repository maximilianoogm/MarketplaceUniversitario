import { useParams, Link } from "react-router-dom";
import { mockAnuncios } from "../../data/mocks";

const DetalleAnuncio = () => {
  // Capturamos el id desde la URL (ejemplo: /detalle/2)
  const { id } = useParams();

  // Buscamos el anuncio específico que coincida con ese ID
  const anuncio = mockAnuncios.find((item) => item.id === parseInt(id));

  // Manejo de caso por si el usuario escribe un ID que no existe en la URL
  if (!anuncio) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm max-w-xl mx-auto mt-10">
        <span className="text-4xl block mb-3">⚠️</span>
        <h3 className="text-lg font-bold text-gray-900">Publicación no encontrada</h3>
        <p className="text-sm text-gray-400 mt-1">
          El artículo o servicio que estás buscando no existe o fue retirado.
        </p>
        <Link 
          to="/" 
          className="mt-4 inline-block bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 animate-fade-in">
      {/* Botón de retorno rápido */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-900 hover:text-indigo-700 mb-6 transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a descubrir publicaciones
      </Link>

      {/* Tarjeta de Contenedor Principal (Estilo Vista de Producto Expandido) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        
        {/* Columna Izquierda: Imagen de stock limpia */}
        <div className="relative rounded-xl overflow-hidden bg-gray-50 max-h-[350px]">
          <img 
            src={anuncio.imagen} 
            alt={anuncio.titulo} 
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-indigo-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
            {anuncio.tipo}
          </span>
        </div>

        {/* Columna Derecha: Información Detallada del Mock */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Calificación y Fecha */}
            <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-3">
              <div className="flex items-center gap-1 text-amber-500 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                <span>⭐</span> {anuncio.rating.toFixed(1)}
              </div>
              <span>Publicado: {anuncio.fechaPublicacion}</span>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-black text-gray-950 leading-snug mb-3">
              {anuncio.titulo}
            </h2>

            {/* Caja de Precio Resaltada */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100">
              <span className="text-xs text-gray-400 block font-medium mb-0.5">Valor estimado</span>
              <span className="text-2xl font-black text-gray-950">
                {anuncio.precio === 0 ? (
                  <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg text-lg font-bold">Gratis / Intercambio</span>
                ) : (
                  `S/. ${anuncio.precio.toFixed(2)}`
                )}
              </span>
            </div>

            {/* Descripción Completa */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Detalles del anuncio</h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {anuncio.descripcion}
              </p>
            </div>
          </div>

          {/* Información del Vendedor / Autor */}
          <div className="pt-4 border-t border-gray-100 bg-indigo-900 text-white p-4 rounded-xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200 block">Anunciante</span>
              <span className="font-bold text-base block">👤 {anuncio.autor.nombre}</span>
              <span className="text-xs text-indigo-200 block">Carrera: {anuncio.autor.carrera}</span>
            </div>

            {/* ESPACIO EXCLUSIVO: Aquí es donde tu compañero acoplará su botón de chat */}
            <div className="bg-white/10 px-3 py-2 rounded-lg text-xs text-indigo-100 border border-white/10 text-center max-w-[150px]">
              <span className="block font-semibold">Módulo 5</span>
              <span>Listo para conectar chat</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetalleAnuncio;