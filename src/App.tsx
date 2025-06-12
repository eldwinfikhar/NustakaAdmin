import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';
import Carts from './components/Carts';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="carts" element={<Carts />} />
        </Route>
      </Route>
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
}

export default App;