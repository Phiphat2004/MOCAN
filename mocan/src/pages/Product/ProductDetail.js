import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { addToCart } from '../../utils/cart';
import { useToast } from '../../components/Toast/ToastProvider';
import formatVND from '../../utils/formatPrice';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { addToast } = useToast();

    useEffect(() => {
        let mounted = true;
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const res = await axiosInstance.get(`/products/${id}`);
                if (!mounted) return;
                setProduct(res.data);
                // initialize selected image when product data arrives
                if (res.data && res.data.images && res.data.images.length > 0) {
                    setSelectedImage(res.data.images[0]);
                }
                // set default size to first element if available
                if (res.data && Array.isArray(res.data.size) && res.data.size.length > 0) {
                    setSelectedSize(res.data.size[0]);
                }
            } catch (err) {
                console.error('Failed to fetch product', err);
                setError(err?.response?.data?.message || err?.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div className="p-6">Loading product...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!product) return <div className="p-6">No product found.</div>;

    const { images = [], name, price, description, stock_quantity, category, dimensions = {}, createdAt, ingredients, skin_type, scent, colors = [], size = [] } = product;
    const inStock = (stock_quantity ?? 0) > 0;
    const statusText = inStock ? 'còn hàng' : 'hết hàng';

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-4">
                <Link to="/products" aria-label="Back to products" className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-lime-700 text-lime-700 rounded shadow-sm hover:bg-lime-700 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Back to products</span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 bg-white p-4 rounded shadow">
                    {selectedImage ? (
                        <img src={selectedImage} alt={name} className="w-full h-96 object-contain" />
                    ) : (
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center">No image</div>
                    )}

                    {images && images.length > 0 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto">
                            {images.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(src)}
                                    className={`p-1 rounded border ${selectedImage === src ? 'border-blue-500' : 'border-gray-200'}`}
                                >
                                    <img src={src} alt={`${name}-${i}`} className="w-20 h-20 object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:w-1/2 bg-white p-6 rounded shadow">
                    <h1 className="text-2xl font-bold mb-2">{name}</h1>
                    <div className="text-xl text-black font-semibold mb-4">{formatVND(price)}</div>

                    <p className=" mb-4">Mô tả: <span className="text-gray-700">{description || 'No description provided.'}</span></p>

                    <div className="mb-2">
                        <span className="font-medium">Trạng thái: </span>
                        <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>{statusText}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium">Số lượng trong kho: </span>
                        <span className="text-sm text-gray-700">{stock_quantity ?? 'N/A'}</span>
                    </div>


                    <div className="mb-2">
                        <span className="font-medium">Danh mục: </span>
                        <span className="text-sm text-gray-700">{category || 'N/A'}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium">Thành phần: </span>
                        <span className="text-sm text-gray-700">{
                            Array.isArray(ingredients)
                                ? ingredients.filter(Boolean).map(ing => String(ing).replace(/\[|\]|"/g, '').trim()).join(', ')
                                : (typeof ingredients === 'string'
                                    ? ingredients.replace(/\[|\]|"/g, '').split(',').map(s => s.trim()).filter(Boolean).join(', ')
                                    : 'N/A')
                        }</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Loại da phù hợp: </span>
                        <span className="text-sm text-gray-700">{skin_type || 'N/A'}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Mùi hương: </span>
                        <span className="text-sm text-gray-700">{scent || 'N/A'}</span>
                    </div>

                    {/* Chọn màu */}
                    {Array.isArray(colors) && colors.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-medium">Chọn màu <span className="text-red-600">*</span></h3>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <button type="button" onClick={() => setSelectedColor('')} className={`w-8 h-8 rounded border flex items-center justify-center bg-white ${selectedColor === '' ? 'ring-2 ring-lime-600' : ''}`}
                                    title="Không chọn màu">
                                    <span className="text-gray-400 text-xl">×</span>
                                </button>
                                {colors.map((c, i) => (
                                    <button key={i} type="button" onClick={() => setSelectedColor(c)} className={`w-8 h-8 rounded border ${selectedColor === c ? 'ring-2 ring-lime-600' : ''}`} style={{ background: c }} />
                                ))}
                            </div>
                            {selectedColor && <div className="mt-1 text-sm">Đã chọn: <span className="font-semibold">{selectedColor}</span></div>}
                            {!selectedColor && <div className="mt-1 text-sm text-red-600">Vui lòng chọn màu trước khi thêm vào giỏ hàng.</div>}
                        </div>
                    )}
                    {/* Chọn size */}
                    {Array.isArray(size) && size.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-medium">Chọn kích thước</h3>
                            <div className="flex gap-4 mt-2">
                                {size.map((s, i) => (
                                    <label key={i} className="flex items-center gap-2">
                                        <input type="radio" name="size" value={s} checked={selectedSize === s} onChange={() => setSelectedSize(s)} /> {s}
                                    </label>
                                ))}
                            </div>
                            {selectedSize && <div className="mt-1 text-sm">Đã chọn: <span className="font-semibold">{selectedSize}</span></div>}
                        </div>
                    )}

                    <div className="mt-4 text-xs text-gray-500">Ngày tạo: {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}</div>
                    {/* Quantity & Add to Cart */}
                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center border rounded">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-1"
                                disabled={!inStock}
                            >-</button>
                            <div className="px-4">{quantity}</div>
                            <button
                                onClick={() => setQuantity((q) => {
                                    const max = stock_quantity ?? Infinity;
                                    const next = q + 1;
                                    return next > max ? max : next;
                                })}
                                className="px-3 py-1"
                                disabled={!inStock || ((stock_quantity ?? Infinity) <= quantity)}
                            >+</button>
                        </div>

                        <button
                            onClick={() => {
                                if (!inStock) {
                                    addToast('Sản phẩm đã hết hàng, không thể thêm vào giỏ.', { type: 'error' });
                                    return;
                                }
                                if ((Array.isArray(colors) && colors.length > 0 && !selectedColor) || (Array.isArray(size) && size.length > 0 && !selectedSize)) {
                                    addToast('Vui lòng chọn màu và kích thước trước khi thêm vào giỏ.', { type: 'error' });
                                    return;
                                }
                                const item = {
                                    id: product._id || product.id,
                                    name,
                                    price,
                                    image: selectedImage || (images && images[0]) || '',
                                    quantity,
                                    stock: stock_quantity,
                                    color: selectedColor,
                                    size: selectedSize,
                                };
                                const updated = addToCart(item);
                                if (!updated) {
                                    addToast('Không thể thêm vào giỏ hàng (hết hàng).', { type: 'error' });
                                } else {
                                    addToast('Đã thêm vào giỏ', { type: 'success' });
                                }
                            }}
                            className={`px-4 py-2 text-white rounded ${inStock ? 'bg-lime-700' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!inStock}
                        >
                            {inStock ? 'Add to cart' : 'Out of stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
