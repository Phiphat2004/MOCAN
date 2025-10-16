
import Homepage from './pages/Homepage';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
>>>>>>> b72931a69dafecfad17abbc7b6d2eec7d0692fc2
import ProductPage from './pages/Product/ProductPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Auth/LoginPage';
<<<<<<< HEAD
import AdminLayout from './components/Admin/AdminLayout';
import DashboardPage from './pages/Admin/DashboardPage';
import ProductsList from './pages/Admin/ProductsList';
import Orders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import Settings from './pages/Admin/Settings';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}

=======
import DashboardPage from './pages/Admin/DashboardPage';

export default function App() {
  return (
    <Router>
      <Navbar />
>>>>>>> b72931a69dafecfad17abbc7b6d2eec7d0692fc2
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<ProductPage />} />
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD

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
      <AppContent />
=======
        <Route path='/dashboard' element={<DashboardPage />} />

      </Routes>
      <Footer />
>>>>>>> b72931a69dafecfad17abbc7b6d2eec7d0692fc2
    </Router>
  );
}
