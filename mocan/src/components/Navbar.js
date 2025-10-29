import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartCount } from "../utils/cart";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  useEffect(() => {
    const updateCount = () => {
      try {
        setCount(cartCount());
      } catch (e) {
        setCount(0);
      }
    };

    updateCount();
    window.addEventListener("cart_updated", updateCount);

    // Đóng mobile menu khi click ra ngoài
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest("#mobile-menu") &&
        !event.target.closest("#mobile-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("cart_updated", updateCount);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/assets/logo.jpg"
                alt="Ecosoap Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-lime-700 tracking-tight">
                ECO SOAP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products" onClick={scrollToTop}
              className="text-gray-600 hover:text-lime-700 font-medium transition-colors"
            >
              Sản phẩm
            </Link>
            <Link
              to="/about" onClick={scrollToTop}
              className="text-gray-600 hover:text-lime-700 font-medium transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              to="/company-products" onClick={scrollToTop}
              className="text-gray-600 hover:text-lime-700 font-medium transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/support" onClick={scrollToTop}
              className="text-gray-600 hover:text-lime-700 font-medium transition-colors"
            >
              Hỗ trợ
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-lime-700 transition-colors"
              aria-label="Giỏ hàng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* View orders button */}
            <Link to="/orders/lookup" onClick={scrollToTop} className="px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-50">Xem đơn hàng</Link>

            {/* Admin Login Button */}
            <Link
              to="/login"
              className="bg-lime-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-lime-700 transition-colors"
            >
              Đăng nhập
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-btn"
              className="p-2 rounded-md text-gray-600 hover:text-lime-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Mở menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white">
          <Link
            to="/products"
            className="block px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Sản phẩm
          </Link>
          <Link
            to="/about"
            className="block px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Giới thiệu
          </Link>
          <Link
            to="/company-products"
            className="block px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Về chúng tôi
          </Link>
          <Link
            to="/support"
            className="block px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Hỗ trợ
          </Link>

          {/* Mobile Cart Link */}
          <Link
            to="/orders/lookup"
            onClick={() => setIsOpen(false)}
            className="block w-full text-left px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Xem đơn hàng
          </Link>

          <Link
            to="/cart"
            className="block px-4 py-3 text-gray-600 hover:text-lime-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            Giỏ hàng {count > 0 && `(${count})`}
          </Link>

          <div className="pt-2">
            <Link
              to="/login"
              className="block w-full px-4 py-3 text-center bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

    </nav>
  );
}
