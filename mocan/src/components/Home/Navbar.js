import { useEffect } from "react";

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
            <span className="text-lime-700">MỘC AN</span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            <div className="relative">
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
              <div
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
            </div>
            <a href="" className="text-lime-700 hover:text-orange-600">
              On Sale
            </a>
            <a href="#" className="text-lime-700 hover:text-orange-600">
              New Arrivals
            </a>
            <a href="#" className="text-lime-700 hover:text-orange-600">
              Brands
            </a>
          </div>

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
      </div>
    </nav>
  );
}
