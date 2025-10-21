import React, { useEffect, useState } from 'react';
import formatVND from '../../utils/formatPrice';
import axiosInstance from '../../utils/axiosConfig';

export default function ProductDetailModal({ open, product, onClose }) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function load() {
            if (!open) return;
            setError(null);
            setLoading(true);

            const id = product && (product._id || product.id || product);
            if (!id) {
                const p = product || null;
                setDetail(p);
                setSelectedImage(p?.images?.[0] || null);
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get(`/products/${id}`);
                if (!mounted) return;
                setDetail(res.data);
                setSelectedImage(res.data?.images?.[0] || null);
            } catch (err) {
                console.error('ProductDetailModal load error', err);
                if (mounted) setError(err.message || 'Lỗi khi tải sản phẩm');
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [open, product]);

    // clear when modal closed
    useEffect(() => {
        if (!open) {
            setDetail(null);
            setSelectedImage(null);
            setError(null);
            setLoading(false);
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-4 overflow-auto animate-fadeIn">
                {/* Header */}
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Chi tiết sản phẩm</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {loading && <div className="text-gray-500">Đang tải...</div>}
                    {error && <div className="text-red-600">{error}</div>}

                    {!loading && !error && detail && (
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
                            {/* LEFT: Image */}
                            <div className="col-span-2">
                                <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt={detail.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-gray-400">Không có hình ảnh</div>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {detail.images && detail.images.length > 0 && (
                                    <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                                        {detail.images.map((src, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImage(src)}
                                                className={`p-1 rounded-md border transition-all ${selectedImage === src
                                                    ? 'border-lime-500 scale-100'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                    }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${detail.name}-${i}`}
                                                    className="w-20 h-20 object-contain rounded"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* RIGHT: Info */}
                            <div className="col-span-2 space-y-5">
                                <h4 className="text-3xl font-bold text-lime-700 tracking-wide hover:text-lime-800 transition-colors">
                                    {detail.name}
                                </h4>

                                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                                    {detail.description || 'Không có mô tả cho sản phẩm này.'}
                                </p>

                                <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-sm">
                                    <div>
                                        <span className="font-semibold">Giá:</span>{' '}
                                        <span className="text-lg text-green-600 font-bold">
                                            {formatVND(detail.price ?? 0)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Số lượng còn:</span>{' '}
                                        {detail.stock_quantity ?? 0}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Danh mục:</span>{' '}
                                        {detail.category || '—'}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Trọng lượng:</span>{' '}
                                        {detail.weight ?? '—'} g
                                    </div>
                                    {detail.dimensions && (
                                        <div className="col-span-2">
                                            <span className="font-semibold">Kích thước:</span>{' '}
                                            {`${detail.dimensions.length} × ${detail.dimensions.width} × ${detail.dimensions.height} cm`}
                                        </div>
                                    )}
                                    {detail.tags && detail.tags.length > 0 && (
                                        <div className="col-span-2">
                                            <span className="font-semibold">Tags:</span>{' '}
                                            {detail.tags.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 text-right">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
