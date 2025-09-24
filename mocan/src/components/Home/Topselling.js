export default function TopSelling() {
  const products = [
    {
      id: 1,
      name: "Vertical Striped Shirt",
      image: "/assets/Xaphong1.jpg",
      price: 212,
      oldPrice: 232,
      discount: "-20%",
      rating: 5.0,
    },
    {
      id: 2,
      name: "Courage Graphic T-shirt",
      image: "/assets/xaphong2.jpg",
      price: 145,
      rating: 4.0,
    },
    {
      id: 3,
      name: "Loose Fit Bermuda Shorts",
      image: "/assets/xaphong3.jpg",
      price: 80,
      rating: 3.0,
    },
    {
      id: 4,
      name: "Faded Skinny Jeans",
      image: "/assets/xaphong4.jpg",
      price: 210,
      rating: 4.5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-10">TOP SELLING</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-contain mb-4"
              />

              {/* Name */}
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.975 2.885a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.975-2.885a1 1 0 00-1.175 0l-3.975 2.885c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.518-4.674z"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)}/5
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-black">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                    <span className="text-red-500 text-xs bg-red-100 px-2 py-0.5 rounded-full">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10">
          <button className="px-6 py-2 border rounded-full text-gray-700 font-medium hover:bg-gray-100 transition">
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
