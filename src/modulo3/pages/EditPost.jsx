import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams(); // Capturamos el ID de la URL
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscamos la publicación en nuestra base de datos simulada
    const publicacionesGuardadas = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];
    const publicacionEncontrada = publicacionesGuardadas.find(post => String(post.id) === String(id));

    if (publicacionEncontrada) {
      // Si la encontramos, adaptamos los datos para el formulario
      setPostToEdit({
        ...publicacionEncontrada,
        categoria: publicacionEncontrada.tipo // Mapeamos "tipo" a "categoria" para el form
      });
    } else {
      alert("Publicación no encontrada");
      navigate('/mis-articulos');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-20 font-bold text-xl">Cargando...</div>;
  if (!postToEdit) return null;

  // Reutilizamos tu componente PostForm, pero le pasamos los datos iniciales y le decimos que está en modo "edición"
  return (
    <div>
      <PostForm initialData={postToEdit} isEditing={true} />
    </div>
  );
}