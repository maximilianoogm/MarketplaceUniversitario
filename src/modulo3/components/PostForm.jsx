import { useState } from 'react';
import CategorySelector from './CategorySelector';
import PriceField from './PriceField';

export default function PostForm({ initialData, isEditing = false }) {
  const [postData, setPostData] = useState(initialData || {
    titulo: '',
    categoria: 'Libros',
    descripcion: '',
    precio: ''
  });

  const [imagenes, setImagenes] = useState(initialData?.imagenes || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (imagenes.length + files.length > 3) {
      alert("Máximo 3 imágenes permitidas.");
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenes(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setImagenes(imagenes.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioSimulado = { id: "u_001", nombre: "Juan", carrera: "Sistemas" };
    
    const publicacionesGuardadas = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];

    if (isEditing) {
      const listaActualizada = publicacionesGuardadas.map((post) => 
        String(post.id) === String(initialData.id) ? { ...post, ...postData, imagenes } : post
      );
      localStorage.setItem('g3_publicaciones', JSON.stringify(listaActualizada));
      alert('¡Publicación actualizada con éxito!');
    } else {
      const nuevaPublicacion = {
        id: Date.now(), 
        tipo: postData.categoria,
        titulo: postData.titulo,
        descripcion: postData.descripcion,
        precio: Number(postData.precio) || 0,
        imagen: imagenes.length > 0 ? imagenes[0] : "https://via.placeholder.com/500",
        imagenesAdicionales: imagenes, 
        rating: 0, 
        autor: { 
          idAutor: usuarioSimulado.id, 
          nombre: usuarioSimulado.nombre, 
          carrera: usuarioSimulado.carrera 
        },
        fechaPublicacion: new Date().toISOString().split('T')[0]
      };

      publicacionesGuardadas.push(nuevaPublicacion);
      localStorage.setItem('g3_publicaciones', JSON.stringify(publicacionesGuardadas));
      alert('¡Anuncio publicado con éxito!');
      
      setPostData({ titulo: '', categoria: 'Libros', descripcion: '', precio: '' });
      setImagenes([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
          <CategorySelector value={postData.categoria} onChange={handleChange} />
          <PriceField value={postData.precio} onChange={handleChange} />
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

        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-bold rounded-lg text-sm px-5 py-3.5 shadow-lg transition-transform hover:-translate-y-0.5">
          {isEditing ? 'Guardar Cambios' : 'Publicar Anuncio'}
        </button>
      </form>
    </div>
  );
}