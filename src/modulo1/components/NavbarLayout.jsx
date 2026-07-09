import { Outlet } from "react-router-dom";

const NavbarLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* El Outlet es vital: aquí es donde React Router inyectará el Feed, el Detalle, etc. */}
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarLayout;