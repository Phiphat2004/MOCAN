import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { addToCart } from '../../utils/cart';
import { useToast } from '../../components/Toast/ToastProvider';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
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

    const { images = [], name, price, description, stock_quantity, category, dimensions = {}, createdAt } = product;
    const inStock = (stock_quantity ?? 0) > 0;
    const statusText = inStock ? 'còn hàng' : 'hết hàng';

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-4">
                <Link to="/product" aria-label="Back to products" className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-lime-700 text-lime-700 rounded shadow-sm hover:bg-lime-700 hover:text-white transition">
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
                    <div className="text-xl text-black font-semibold mb-4">${price}</div>

                    <p className="text-gray-700 mb-4">{description || 'No description provided.'}</p>

                    <div className="mb-2">
                        <span className="font-medium">Status: </span>
                        <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>{statusText}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium">Stock: </span>
                        <span className="text-sm text-gray-700">{stock_quantity ?? 'N/A'}</span>
                    </div>

                    <div className="mb-2">
                        <span className="font-medium">Category: </span>
                        <span className="text-sm text-gray-700">{category || 'N/A'}</span>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-medium">Dimensions</h3>
                        <div className="text-sm text-gray-700">
                            Length: {dimensions.length ?? 0} | Width: {dimensions.width ?? 0} | Height: {dimensions.height ?? 0}
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">Created: {createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}</div>
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

                                const item = {
                                    id: product._id || product.id,
                                    name,
                                    price,
                                    image: selectedImage || (images && images[0]) || '',
                                    quantity,
                                    stock: stock_quantity,
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
