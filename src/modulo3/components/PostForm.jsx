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

  // Las categorías reales del backend se cargan con useFetch (lectura)
  const { data: categorias } = useFetch(`${API_URL}/categories`);

  const [postData, setPostData] = useState(initialData || {
    titulo: '',
    categoryId: '',
    descripcion: '',
    precio: '',
    estado: 'Como nuevo'
  });

  const [imagenes, setImagenes] = useState(initialData?.imagenes || []);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  // ── ESTADO PARA EL TOAST FLOTANTE DE ÉXITO/ALERTA ──
  const [toast, setToast] = useState({ visible: false, mensaje: '', tipo: 'success' });

  // Función interna para disparar notificaciones temporales
  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setToast({ visible: true, mensaje, tipo });
  };

  // Efecto para desvanecer la notificación automáticamente tras 3 segundos
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, mensaje: '', tipo: 'success' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Cuando llegan las categorías, preseleccionamos la primera si no hay una elegida
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (imagenes.length + files.length > 3) {
      mostrarNotificacion("Máximo 3 imágenes permitidas.", "error");
      return;
    }
    const nuevasImagenes = files.map(file => URL.createObjectURL(file));
    setImagenes(prev => [...prev, ...nuevasImagenes]);
  };

  const removeImage = (indexToRemove) => {
    setImagenes(imagenes.filter((_, index) => index !== indexToRemove));
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

        // Retornamos a la vista de mis publicaciones después de 1.5 segundos para que vean el toast
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

      // Notificación de éxito elegante en lugar del alert nativo
      mostrarNotificacion('¡Anuncio publicado con éxito!', 'success');

      setPostData({
        titulo: '',
        categoryId: categorias?.[0]?.id ?? '',
        descripcion: '',
        precio: '',
        estado: 'Como nuevo'
      });
      setImagenes([]);
    } catch (err) {
      setError(err.message || 'No se pudo publicar el anuncio.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8">

      {/* ── ALERTA TOAST ELEGANTE EN TAILWIND ── */}
      {toast.visible && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 max-w-sm p-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 animate-bounce ${toast.tipo === 'success'
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

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Imágenes (Máx 3)</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2" />

            {imagenes.length > 0 && (
              <div className="flex gap-4 overflow-x-auto py-4">
                {imagenes.map((imgSrc, index) => (
                  <div key={index} className="relative w-24 h-24 flex-shrink-0">
                    <img src={imgSrc} alt="preview" className="w-full h-full object-cover rounded-md border shadow-sm" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold hover:bg-red-600">X</button>
                  </div>
                ))}
              </div>
            )}
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