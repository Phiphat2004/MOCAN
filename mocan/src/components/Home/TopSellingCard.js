import { Link } from "react-router-dom";
import { useState } from "react";
import formatVND from "../../utils/formatPrice";

const truncate = (s, n = 120) => {
    if (!s) return "";
    return s.length > n ? s.slice(0, n).trimEnd() + "..." : s;
};

export default function TopSellingCard({ product }) {
    const [expanded, setExpanded] = useState(false);
    const image = product.image || (Array.isArray(product.images) && product.images[0]) || "/assets/placeholder.png";
    const desc = product.description || "";
    console.log('TopSellingCard product:', product);

    const displayed = expanded ? desc : truncate(desc, 120);

    return (
        <Link to={`/products/${product.id || product._id}`} className="block relative">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-start shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all h-full">
                {/* Image */}
                <div className="w-full flex items-center justify-center mb-4">
                    <img src={image} alt={product.name} className="max-h-44 object-contain w-full" />
                </div>

                {/* Name - larger */}
                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 w-full">{product.name}</h3>

                {/* Description - truncated with toggle */}
                {desc && (
                    <div className="text-sm text-gray-600 mb-3 w-full">
                        <p>{displayed}</p>
                        {desc.length > 120 && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setExpanded((s) => !s);
                                }}
                                className="text-xs text-lime-600 hover:underline mt-1"
                            >
                                {expanded ? "Rút gọn" : "Xem thêm"}
                            </button>
                        )}
                    </div>
                )}

                {/* Price */}
                <div className="w-full mt-auto">
                    <div className="text-base md:text-lg font-bold text-lime-700">{formatVND(product.price)}</div>
                </div>
            </div>
        </Link>
    );
}
