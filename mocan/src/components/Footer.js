import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + text */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold mb-4">ECOSOAP.COMPANY</h2>
          <p className="text-sm text-gray-600 mb-4">
            Chúng tôi có những sản phẩm xà phòng phù hợp với phong cách của bạn
            và khiến bạn tự hào khi sử dụng. Dành cho cả nam và nữ.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61581265658896"
              className="p-2 rounded-full bg-white shadow hover:shadow-md"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@mocan.naturalsoap"
              className="p-2 rounded-full bg-white shadow hover:shadow-md"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .593.057.87.168V9.07a6.37 6.37 0 0 0-1-.083c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25 6.25-2.8 6.25-6.25V7.81a7.795 7.795 0 0 0 4.382 1.357h.568V5.69h-.568a4.82 4.82 0 0 1-.567-.032Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">CÔNG TY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" onClick={scrollToTop}>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/features" onClick={scrollToTop}>
                Tính năng
              </Link>
            </li>
            <li>
              <Link to="/company-products" onClick={scrollToTop}>
                Sản phẩm
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-3">HỖ TRỢ</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/support" onClick={scrollToTop}>
                Hỗ trợ khách hàng
              </Link>
            </li>
            <li>
              <Link to="/delivery-info" onClick={scrollToTop}>
                Chi tiết giao hàng
              </Link>
            </li>
            <li>
              <Link to="/terms" onClick={scrollToTop}>
                Điều khoản & Điều kiện
              </Link>
            </li>
            <li>
              <Link to="/privacy" onClick={scrollToTop}>
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="font-semibold mb-3">CÂU HỎI THƯỜNG GẶP</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq/account" onClick={scrollToTop}>
                Tài khoản
              </Link>
            </li>
            <li>
              <Link to="/faq/delivery" onClick={scrollToTop}>
                Quản lý giao hàng
              </Link>
            </li>
            <li>
              <Link to="/faq/orders" onClick={scrollToTop}>
                Đơn hàng
              </Link>
            </li>
            <li>
              <Link to="/faq/payment" onClick={scrollToTop}>
                Thanh toán
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>EcoSoap.Shop © 2004-2025, Đã đăng ký bản quyền</p>
      </div>
    </footer>
  );
}
