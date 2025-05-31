import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';
import Carts from './components/Carts';
import LoginPage from './components/LoginPage';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {/* Show navbar only when logged in */}
      {token && <Navbar />}

      <main className="container mx-auto p-4">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/carts" element={<Carts />} />
              {/* Redirect any unknown path to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            /* If not logged in, redirect everything except /login to /login */
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
