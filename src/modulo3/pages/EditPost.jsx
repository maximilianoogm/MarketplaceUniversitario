import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicacionesGuardadas = JSON.parse(localStorage.getItem('g3_publicaciones')) || [];
    const publicacionEncontrada = publicacionesGuardadas.find(post => String(post.id) === String(id));

    if (publicacionEncontrada) {
      setPostToEdit({
        ...publicacionEncontrada,
        categoria: publicacionEncontrada.tipo 
      });
    } else {
      alert("Publicación no encontrada");
      navigate('/mis-articulos');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-20 font-bold text-xl">Cargando...</div>;
  if (!postToEdit) return null;

  return (
    <div>
      <PostForm initialData={postToEdit} isEditing={true} />
    </div>
  );
}