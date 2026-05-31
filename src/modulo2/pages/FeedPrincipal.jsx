import { useState } from "react";
import { Link } from "react-router-dom";
import { mockAnuncios, mockUsuarioActual } from "../../data/mocks";

// COMPONENTE TARJETA: Maneja su propio estado interno para el corazón visual
const TarjetaAnuncio = ({ anuncio }) => {
  // Inicializamos el estado leyendo si ya es favorito en el mock
  const [esFavorito, setEsFavorito] = useState(
    mockUsuarioActual.favoritos.includes(anuncio.id)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img 
          src={anuncio.imagen} 
          alt={anuncio.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Etiqueta de Tipo */}
        <span className="absolute top-2 left-2 bg-indigo-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
          {anuncio.tipo}
        </span>

        {/* BOTÓN DE FAVORITO INTERACTIVO (¡Ahora sí cambia de color!) */}
        <button 
          onClick={() => setEsFavorito(!esFavorito)}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-sm p-1.5 rounded-full shadow-xs backdrop-blur-xs transition-transform active:scale-90 cursor-pointer"
          title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {esFavorito ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Calificación / Estrellas */}
          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-1">
            <span>⭐</span> {anuncio.rating.toFixed(1)}
          </div>

          {/* Título */}
          <h4 className="font-bold text-gray-950 text-base line-clamp-1 group-hover:text-indigo-900 transition-colors">
            {anuncio.titulo}
          </h4>

          {/* Descripción corta */}
          <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {anuncio.descripcion}
          </p>
        </div>

        {/* Precio y Acción */}
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Precio</span>
            <span className="text-lg font-black text-gray-900">
              {anuncio.precio === 0 ? (
                <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-md">Gratis</span>
              ) : (
                `S/. ${anuncio.precio.toFixed(2)}`
              )}
            </span>
          </div>

          <Link 
            to={`/detalle/${anuncio.id}`}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL
const FeedPrincipal = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const categorias = ["Todos", "Apuntes", "Libros", "Servicios", "Otros"];

  const anunciosFiltrados = categoriaSeleccionada === "Todos"
    ? mockAnuncios
    : mockAnuncios.filter(anuncio => 
        anuncio.tipo.toLowerCase().startsWith(categoriaSeleccionada.toLowerCase().substring(0, 4))
      );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* ================= BARRA LATERAL DE FILTROS ================= */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-20">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚙️</span> Filtrar por
          </h3>
          <hr className="border-gray-100 mb-4" />
          
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categorías</p>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  categoriaSeleccionada === cat
                    ? "bg-indigo-50 text-indigo-900 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {cat}
                {categoriaSeleccionada === cat && <span className="text-xs">●</span>}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ================= GRILLA DE PRODUCTOS ================= */}
      <section className="flex-1">
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Descubre publicaciones</h2>
            <p className="text-xs text-gray-500 mt-0.5">Viendo {anunciosFiltrados.length} productos disponibles</p>
          </div>
          <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-full">
            {categoriaSeleccionada}
          </span>
        </div>

        {anunciosFiltrados.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-bold text-gray-900">No se encontraron productos</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
              Prueba seleccionando otra categoría en la barra lateral o vuelve al inicio para ver todo el catálogo.
            </p>
            <button 
              onClick={() => setCategoriaSeleccionada("Todos")}
              className="mt-4 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Ver todas las publicaciones
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {anunciosFiltrados.map((anuncio) => (
              // Usamos el nuevo componente de tarjeta independiente
              <TarjetaAnuncio key={anuncio.id} anuncio={anuncio} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default FeedPrincipal;