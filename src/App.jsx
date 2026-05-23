import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./modulo1/pages/Login";
import Register from "./modulo1/pages/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Un encabezado global con Tailwind para comprobar que los estilos funcionan en toda la app */}
        <header className="bg-blue-800 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">Marketplace Universitario</h1>
        </header>

        {/* El contenedor central donde cambiarán las pantallas según la URL */}
        <main className="p-8 max-w-5xl mx-auto">
          <Routes>
            {/* Ruta Principal: El listado que hará el Desarrollador 2 */}
            <Route path="/" element={
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Módulo 2: Feed Principal</h2>
                <p className="text-gray-600 mt-2">Aquí irá el listado dinámico de anuncios. Usará la variable mockAnuncios.</p>
              </div>
            } />
            
            {/* Ruta de Cuentas: Que hará el Desarrollador 1 */}
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
             

            {/* Ruta de Detalle: Que hará el Desarrollador 3 */}
            <Route path="/detalle/:id" element={
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Módulo 3: Detalle del Anuncio</h2>
                <p className="text-gray-600 mt-2">Aquí se verá la información completa de un apunte o libro específico.</p>
              </div>
            } />

            {/* Ruta de Publicación: Que hará el Desarrollador 4 */}
            <Route path="/publicar" element={
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Módulo 4: Publicar Anuncio</h2>
                <p className="text-gray-600 mt-2">Formulario para crear una nueva oferta y sumarla a los mocks.</p>
              </div>
            } />

            {/* Ruta de Contacto: Que hará el Desarrollador 5 */}
            <Route path="/contacto" element={
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Módulo 5: Mensajería</h2>
                <p className="text-gray-600 mt-2">Sistema para contactar al vendedor simulando el envío de mensajes.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}



export default App;
