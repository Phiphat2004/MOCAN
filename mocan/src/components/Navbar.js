import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  useEffect(() => {
    const shopBtn = document.getElementById("shop-btn");
    const shopMenu = document.getElementById("shop-menu");
    const mobileBtn = document.getElementById("mobile-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleShop = (e) => {
      e.stopPropagation();
      shopMenu.classList.toggle("hidden");
    };

    const toggleMobile = (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    };

    if (shopBtn) shopBtn.addEventListener("click", toggleShop);
    if (mobileBtn) mobileBtn.addEventListener("click", toggleMobile);

    // cleanup
    return () => {
      if (shopBtn) shopBtn.removeEventListener("click", toggleShop);
      if (mobileBtn) mobileBtn.removeEventListener("click", toggleMobile);
    };
  }, []);


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <div className="text-4xl font-extrabold">
            <Link to="/" className="text-lime-700">MỘC AN</Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            {/* <div className="relative">
              <button
                id="shop-btn"
                className="text-lime-700 flex items-center hover:text-orange-600"
              >
                Shop
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown */}
            {/* <div
                id="shop-menu"
                className="hidden absolute mt-2 w-40 bg-white border rounded-lg shadow-lg"
              >
                <a href="" className="block px-4 py-2 hover:bg-orange-600">
                  Men
                </a>
                <a href="" className="block px-4 py-2 hover:bg-orange-600">
                  Women
                </a>
                <a href="" className="block px-4 py-2 hover:bg-orange-600">
                  Kids
                </a>
              </div> 
            </div> */}
            <Link to="/product" className="text-lime-700 hover:text-orange-600">
              Shop
            </Link>
            <Link to="/sale" className="text-lime-700 hover:text-orange-600">
              On Sale
            </Link>
            <Link to="/new-arrivals" className="text-lime-700 hover:text-orange-600">
              New Arrivals
            </Link>
            <Link to="/brands" className="text-lime-700 hover:text-orange-600">
              Brands
            </Link>
          </div>

          {/* Admin Login & Mobile button */}
          <div className="flex items-center space-x-4">
            {/* Admin Login Button */}
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="hidden md:flex items-center px-4 py-2 bg-lime-700 text-white rounded-lg hover:bg-lime-800 transition-colors duration-200">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Admin Login
            </button>

            {/* Mobile button */}
            <div className="md:hidden">
              <button id="mobile-btn" className="p-2 rounded-md focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="md:hidden hidden px-4 pb-4">
        <a href="#" className="block px-3 py-2 hover:bg-orange-600">
          Shop
        </a>
        <a href="#" className="block px-3 py-2 hover:bg-orange-600">
          On Sale
        </a>
        <a href="#" className="block px-3 py-2 hover:bg-orange-600">
          New Arrivals
        </a>
        <a href="#" className="block px-3 py-2 hover:bg-orange-600">
          Brands
        </a>
        {/* Admin Login for mobile */}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="flex items-center w-full px-3 py-2 text-lime-700 hover:bg-lime-50 rounded-md">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Admin Login
          </button>
        </div>
      </div>
    </nav>
  );
}
