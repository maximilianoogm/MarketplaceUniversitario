import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];
    setAnuncios(guardadas.reverse());
  }, []);

  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 md:p-12 text-center shadow-xl text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Marketplace Universitario G3
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Compra, vende e intercambia libros, apuntes y recursos con otros estudiantes.
        </p>
        <Link to="/publicar" className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-50 transition transform hover:-translate-y-1">
          Comenzar a Vender
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">🔥 Últimos Anuncios Agregados</h2>
        
        {anuncios.length === 0 ? (
          <p className="text-gray-500 text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">Aún no hay anuncios. ¡Sé el primero en publicar!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {anuncios.map(anuncio => (
              <div key={anuncio.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col">
                <div className="h-48 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                  <img src={anuncio.imagen} alt={anuncio.titulo} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-blue-600/90 text-white backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    {anuncio.tipo}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{anuncio.titulo}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">{anuncio.descripcion}</p>
                  
                  <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-xs text-slate-500">Por:</span>
                    <span className="text-sm font-semibold text-slate-700">{anuncio.autor.nombre}</span>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-100">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {anuncio.precio === 0 ? "Gratis" : `S/ ${anuncio.precio.toFixed(2)}`}
                    </span>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}