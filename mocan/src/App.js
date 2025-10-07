
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './pages/Product/ProductPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Admin/DashboardPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<ProductPage />} />
        {/* <Route path="/product/:id" element={<ProductPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}
