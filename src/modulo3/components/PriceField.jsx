export default function PriceField({ value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">Precio (S/)</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <span className="text-gray-500 font-medium">S/</span>
        </div>
        <input 
          type="number" 
          name="precio" 
          value={value} 
          onChange={onChange} 
          min="0"
          step="0.10"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 transition duration-200"
          placeholder="0.00 (Deja en 0 si es gratis)"
        />
      </div>
    </div>
  );
}