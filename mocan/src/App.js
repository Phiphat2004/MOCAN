
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProductPage from './pages/Product/ProductPage';
import ProductDetail from './pages/Product/ProductDetail';
import CartPage from './pages/Cart/CartPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Auth/LoginPage';
import AdminLayout from './components/Admin/AdminLayout';
import DashboardPage from './pages/Admin/DashboardPage';
import ProductsList from './pages/Admin/ProductsList';
import Orders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import Settings from './pages/Admin/Settings';
import ToastProvider from './components/Toast/ToastProvider';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes (use AdminLayout to show sidebar on all admin pages) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}
