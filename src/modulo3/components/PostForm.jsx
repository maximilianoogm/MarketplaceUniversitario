import { useState, useEffect, useContext } from 'react';
import PriceField from './PriceField';
import { AuthContext } from '../../modulo1/context/AuthContext';
import useFetch from '../../hooks/useFetch';

/* ══════════════════════════════════════════
   URLs de la API
   ══════════════════════════════════════════ */
const API_URL = "http://localhost:3000";

export default function PostForm({ initialData, isEditing = false }) {
  const { user } = useContext(AuthContext);

  const { data: categorias } = useFetch(`${API_URL}/categories`);

  const [postData, setPostData] = useState(initialData || {
    titulo: '',
    categoryId: '',
    descripcion: '',
    precio: '',
    estado: 'Como nuevo'
  });

  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success' });

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, mensaje: '', tipo: 'success' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setPostData((prev) => ({
        ...prev,
        categoryId: prev.categoryId || categorias[0].id,
      }));
    }
  }, [categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isEditing) {
      setEnviando(true);
      try {
        const res = await fetch(`${API_URL}/products/${postData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: postData.titulo,
            descripcion: postData.descripcion,
            precio: Number(postData.precio) || 0,
            categoryId: Number(postData.categoryId),
            estado: postData.estado,
            ciclo: 1,
            stock: 1,
          }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.error || "No se pudo actualizar el anuncio.");
        }

        mostrarNotificacion('¡Anuncio actualizado con éxito!', 'success');

        setTimeout(() => {
          window.location.href = '/mis-articulos';
        }, 1500);

      } catch (err) {
        setError(err.message || 'No se pudo actualizar el anuncio.');
      } finally {
        setEnviando(false);
      }
      return;
    }

    if (!user?.id) {
      setError('Debes iniciar sesión para publicar.');
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: postData.titulo,
          descripcion: postData.descripcion,
          precio: Number(postData.precio) || 0,
          autorId: user.id,
          categoryId: Number(postData.categoryId),
          estado: postData.estado,
          ciclo: 1,
          stock: 1,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || "No se pudo publicar el anuncio.");
      }

      mostrarNotificacion('¡Anuncio publicado con éxito!', 'success');

      setPostData({
        titulo: '',
        categoryId: categorias?.[0]?.id ?? '',
        descripcion: '',
        precio: '',
        estado: 'Como nuevo'
      });
    } catch (err) {
      setError(err.message || 'No se pudo publicar el anuncio.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8">

      {toast.visible && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 max-w-sm p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 animate-bounce ${
          toast.tipo === 'success'
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
            : 'bg-red-50 border-red-100 text-red-800'
        }`}>
          <span className="text-xl">{toast.tipo === 'success' ? '✅' : '⚠️'}</span>
          <p className="text-sm font-bold">{toast.mensaje}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">
            {isEditing ? '✏️ Editar Publicación' : '📢 Crear Nueva Publicación'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Título de la publicación</label>
            <input type="text" name="titulo" value={postData.titulo} onChange={handleChange} required
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Ej. Libro de Cálculo 1 - Stewart" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Categoría</label>
              <select
                name="categoryId"
                value={postData.categoryId}
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200"
              >
                {!categorias && <option value="">Cargando...</option>}
                {categorias && categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <PriceField value={postData.precio} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Estado del producto</label>
            <select
              name="estado"
              value={postData.estado}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Como nuevo">Como nuevo</option>
              <option value="Buen estado">Buen estado</option>
              <option value="Usado">Usado</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Descripción detallada</label>
            <textarea name="descripcion" value={postData.descripcion} onChange={handleChange} required rows="4"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Describe el estado del recurso..." />
          </div>

          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button type="submit" disabled={enviando} className="w-full text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-60 font-bold rounded-lg text-sm px-5 py-3.5 shadow-lg transition-transform hover:-translate-y-0.5">
            {enviando ? 'Publicando...' : isEditing ? 'Guardar Cambios' : 'Publicar Anuncio'}
          </button>
        </form>
      </div>
    </div>
  );
}