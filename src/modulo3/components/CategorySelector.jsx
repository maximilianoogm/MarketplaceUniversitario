export default function CategorySelector({ value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Categoría</label>
      <select
        name="categoria"
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition duration-200"
      >
        <option value="Libros">📚 Libros</option>
        <option value="Apuntes">📝 Apuntes</option>
        <option value="Servicios">🛠️ Servicios</option>
        <option value="Otros">📦 Otros</option>
      </select>
    </div>
  );
}