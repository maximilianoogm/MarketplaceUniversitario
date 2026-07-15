import { useState, useEffect } from "react";

/* ══════════════════════════════════════════
   HOOK: useFetch genérico
   Recibe una URL, hace la petición al montar
   y devuelve { data, loading, error }.
   ══════════════════════════════════════════ */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay URL (ej. todavía no sabemos el id del usuario), no pedimos nada
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(`Error: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
