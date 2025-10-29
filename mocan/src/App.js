
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProductPage from './pages/Product/ProductPage';
import ProductDetail from './pages/Product/ProductDetail';
import CartPage from './pages/Cart/CartPage';

import AboutPage from './pages/Company/AboutPage';
import FeaturesPage from './pages/Company/FeaturesPage';
import CompanyProductsPage from './pages/Company/CompanyProductsPage';
import Navbar from './components/Navbar';

// Help Pages
import CustomerSupport from './pages/Support/CustomerSupport';
import DeliveryDetails from './pages/Support/DeliveryDetails';
import TermsAndConditions from './pages/Support/TermsAndConditions';
import PrivacyPolicy from './pages/Support/PrivacyPolicy';
import AccountFAQ from './pages/FAQ/AccountFAQ';
import DeliveryFAQ from './pages/FAQ/DeliveryFAQ';
import OrderFAQ from './pages/FAQ/OrderFAQ';
import PaymentFAQ from './pages/FAQ/PaymentFAQ';
import Footer from './components/Footer';
import LoginPage from './pages/Auth/LoginPage';
import AdminLayout from './components/Admin/AdminLayout';
import DashboardPage from './pages/Admin/DashboardPage';
import ProductsList from './pages/Admin/ProductsList';
import Orders from './pages/Admin/Orders';
import OrderLookup from './pages/Order/OrderLookup';
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/company-products" element={<CompanyProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders/lookup" element={<OrderLookup />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Help Routes */}
        <Route path="/support" element={<CustomerSupport />} />
        <Route path="/delivery-info" element={<DeliveryDetails />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* FAQ Routes */}
        <Route path="/faq/account" element={<AccountFAQ />} />
        <Route path="/faq/delivery" element={<DeliveryFAQ />} />
        <Route path="/faq/orders" element={<OrderFAQ />} />
        <Route path="/faq/payment" element={<PaymentFAQ />} />

        {/* Admin routes (use AdminLayout to show sidebar on all admin pages) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="orders" element={<Orders />} />
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
