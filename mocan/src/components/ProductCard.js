import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cart';
import { useToast } from './Toast/ToastProvider';

export default function ProductCard({ product }) {
    const stock = typeof product.stock_quantity !== 'undefined' ? product.stock_quantity : (product.stock || 0);
    const { addToast } = useToast();
    const onAdd = (e) => {
        // prevent Link navigation when clicking Add to cart
        if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }

        const item = {
            id: product.id || product._id,
            name: product.name,
            price: product.price,
            image: product.image,
        };
        const res = addToCart({ ...item, stock });
        if (!res) addToast('Không thể thêm vào giỏ hàng (có thể đã hết hàng).', { type: 'error' });
        else addToast('Đã thêm vào giỏ hàng', { type: 'success' });
    };

    return (
        <Link to={`/product/${product.id}`} className="block">
            <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col items-center shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all w-44 sm:w-48 md:w-52"
            >
                {stock <= 0 && (
                    <div className="absolute mt-2 ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded">Hết hàng</div>
                )}
                {/* Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 md:w-36 md:h-36 object-contain mb-3"
                />

                {/* Name - emphasized */}
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 whitespace-normal break-words text-center">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="w-full flex items-center justify-center mt-auto px-3">
                    <div className="text-sm md:text-base font-bold text-lime-700">{product.price ? new Intl.NumberFormat('vi-VN').format(product.price) + ' VNĐ' : '0 VNĐ'}</div>
                </div>

                {/* Add to cart full width button */}
                <div className="w-full mt-3 px-3">
                    <button
                        onClick={onAdd}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 ${stock > 0 ? 'bg-lime-600 hover:bg-lime-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} rounded-md shadow-sm`}
                        aria-label={`Add ${product.name} to cart`}
                        disabled={stock <= 0}
                    >
                        {/* cart + plus icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 16v6m3-3h-6" />
                        </svg>
                        <span className="text-sm font-medium">{stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}