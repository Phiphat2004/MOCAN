import { useState } from "react";

export default function Filter({ onApply, onChange }) {
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("Default");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategoryClick = (c) => {
    setCategory(c);
    if (onChange) onChange({ category: c, price });
  };

  const handlePriceClick = (p) => {
    setPrice(p);
    if (onChange) onChange({ category, price: p });
  };

  const handleApply = () => {
    if (onApply) onApply({ category, price });
  };

  const handleReset = () => {
    const defaultCategory = "All";
    const defaultPrice = "Default";
    setCategory(defaultCategory);
    setPrice(defaultPrice);
    if (onChange) onChange({ category: defaultCategory, price: defaultPrice });
    if (onApply) onApply({ category: defaultCategory, price: defaultPrice });
  };

  return (
    <>
      {/* Mobile trigger - only visible on small screens */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 py-3 px-4 rounded-lg shadow-sm hover:shadow transition-all"
          aria-label="Open filters"
        >
          <span className="text-gray-700 font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 01.8 1.6L12 10.333V15a1 1 0 01-.447.832l-2 1.333A1 1 0 018 17V10.333L3.2 5.6A1 1 0 013 4z" />
            </svg>
            Lọc sản phẩm
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
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
      </div>

      {/* Mobile drawer/modal */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/25 transition-opacity" />

          {/* Panel */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-xl max-h-[90vh] overflow-auto transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Bộ lọc sản phẩm
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                aria-label="Đóng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Category */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Danh mục</h3>
              <div className="space-y-2">
                {["All", "Men", "Women", "Kid"].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCategoryClick(c)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      category === c
                        ? "bg-lime-50 text-lime-700 font-medium border border-lime-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-6"></div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Giá</h3>
              <div className="space-y-2">
                {[
                  ["Default", "Mặc định"],
                  ["From low to high", "Giá thấp đến cao"],
                  ["From high to low", "Giá cao đến thấp"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handlePriceClick(value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      price === value
                        ? "bg-lime-50 text-lime-700 font-medium border border-lime-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  handleApply();
                  setMobileOpen(false);
                }}
                className="flex-1 bg-lime-600 text-white py-3 rounded-lg font-medium hover:bg-lime-700 transition-colors"
              >
                Áp dụng
              </button>
              <button
                onClick={() => {
                  handleReset();
                  setMobileOpen(false);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:block bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Bộ lọc sản phẩm
        </h2>

        {/* Category */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-4">Danh mục</h3>
          <div className="space-y-2">
            {["All", "Men", "Women", "Kid"].map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  category === c
                    ? "bg-lime-50 text-lime-700 font-medium border border-lime-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Price */}
        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-4">Giá</h3>
          <div className="space-y-2">
            {[
              ["Default", "Mặc định"],
              ["From low to high", "Giá thấp đến cao"],
              ["From high to low", "Giá cao đến thấp"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => handlePriceClick(value)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  price === value
                    ? "bg-lime-50 text-lime-700 font-medium border border-lime-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Nút Filter */}
        <div className="pt-4 flex gap-3">
          <button
            onClick={handleApply}
            className="flex-1 bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700"
          >
            Apply Filter
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
