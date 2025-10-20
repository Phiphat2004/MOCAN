import { useEffect, useState } from "react";
import TopSellingCard from "./TopSellingCard";
import axios from "../../utils/axiosConfig";
import { useToast } from "../Toast/ToastProvider";

export default function TopSelling() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const resp = await axios.get("/products/top-selling");
        // resp.data is expected to be [{ product, totalSold }, ...]
        const mapped = (resp.data || []).map((it) => {
          const p = it.product || it; // defensive
          return {
            id: p._id || p.id,
            _id: p._id || p.id,
            name: p.name,
            price: p.price,
            image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.image || "/assets/placeholder.png"),
            stock_quantity: typeof p.stock_quantity !== 'undefined' ? p.stock_quantity : (p.stock || 0),
            description: p.description || "",
            totalSold: it.totalSold || 0,
          };
        });
        if (mounted) setItems(mapped);
      } catch (err) {
        console.error("Failed to load top-selling", err);
        addToast("Không tải được sản phẩm bán chạy", { type: "error" });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [addToast]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6">TOP SELLING</h2>

        {loading ? (
          <div className="py-12">Đang tải...</div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {items.map((product) => (
                <TopSellingCard key={product.id || product._id} product={product} />
              ))}
            </div>

            {/* Button */}
            <div className="mt-10">
              <a href="/products" className="px-6 py-2 border rounded-full text-gray-700 font-medium hover:bg-gray-100 transition inline-block">
                Xem tất cả
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
