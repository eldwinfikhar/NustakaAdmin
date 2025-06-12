import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });

    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed on server:', error);
    }
  };

  return (
      <nav className="bg-accent text-white shadow-lg">
        <div className="container mx-auto p-4 flex items-center">
          <img
            src="../nustaka.png" 
            alt="Nustaka Logo" 
            className="h-12 mr-5" 
          />
          <h1 className="text-xl font-bold">Nustaka Admin</h1>
          <div className="ml-auto space-x-4">
            <a href="/" className="hover:underline">Dashboard</a>
            <a href="/users" className="hover:underline">Users</a>
            <a href="/products" className="hover:underline">Products</a>
            <a href="/orders" className="hover:underline">Orders</a>
            <a href="/carts" className="hover:underline">Carts</a>
            <button onClick={handleLogout} className="bg-primary hover:bg-amber-900 px-4 py-1 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
};