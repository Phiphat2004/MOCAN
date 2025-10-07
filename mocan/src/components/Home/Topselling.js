import ProductCard from "../ProductCard";

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
            <ProductCard key={product.id} product={product} />
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
