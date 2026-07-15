import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

const API_URL = "https://backend-unimarket.onrender.com";

export default function EditPost() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("🛠️ Intentando editar producto con ID:", id);
        
        const res = await fetch(`${API_URL}/products/${id}`);
        console.log("📡 Respuesta del servidor:", res.status);

        if (!res.ok) {
          throw new Error("El anuncio no existe en la base de datos.");
        }
        const data = await res.json();
        console.log("📦 Datos del producto obtenidos:", data);
        
        setPostToEdit({
          id: data.id,
          titulo: data.titulo,
          categoryId: data.categoryId,
          descripcion: data.descripcion,
          precio: data.precio,
          estado: data.detalles?.estado || 'Como nuevo',
          imagenes: data.imagen ? [data.imagen] : []
        });
      } catch (error) {
        console.error("❌ Error cargando publicación:", error);
        alert("Publicación no encontrada o error de conexión con el servidor.");
        navigate('/mis-articulos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-20 font-bold text-xl text-gray-500">Cargando datos del anuncio...</div>;
  if (!postToEdit) return null;

  return (
    <div>
      <PostForm initialData={postToEdit} isEditing={true} />
    </div>
  );
}