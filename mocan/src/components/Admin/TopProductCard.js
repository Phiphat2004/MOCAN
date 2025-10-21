import React, { useState } from 'react';
import formatVND from '../../utils/formatPrice';
import ProductDetailModal from './ProductDetailModal';

export default function Top5ProductCard({ topProducts = [] }) {
    const items = Array.isArray(topProducts) ? topProducts.slice(0, 5) : [];
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const openDetail = (product) => {
        setSelected(product);
        setOpen(true);
    };

    const closeDetail = () => {
        setOpen(false);
        setSelected(null);
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-lime-800 mb-4">Top 5 sản phẩm bán chạy</h2>
            {items.length === 0 && <p className="text-gray-600">Không có dữ liệu sản phẩm bán chạy.</p>}
            <ul className="space-y-3">
                {items.map((it, idx) => (
                    <li key={it._id || idx} onClick={() => openDetail(it)} className={`cursor-pointer flex items-center gap-3 p-3 rounded ${idx === 0 ? 'bg-lime-50 ring-2 ring-lime-300 shadow-md' : idx === 1 ? 'bg-lime-25 shadow-sm' : idx === 2 ? 'bg-white shadow-sm' : 'bg-white'}`}>
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex-shrink-0 relative">
                                <div className={`flex items-center justify-center font-bold text-white ${idx === 0 ? 'w-14 h-14 text-xl rounded-full bg-yellow-500' : idx === 1 ? 'w-12 h-12 text-lg rounded-full bg-sky-500' : idx === 2 ? 'w-11 h-11 text-md rounded-full bg-emerald-500' : 'w-10 h-10 text-sm rounded-full bg-gray-300'}`}>
                                    #{idx + 1}
                                </div>
                                <div className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs text-gray-600 border">{it.totalSold}</div>
                                {idx === 0 && (
                                    <div className="absolute -left-3 -top-3 bg-yellow-400 text-xs text-white px-2 py-1 rounded transform rotate-12">Top 1</div>
                                )}
                            </div>
                            <img src={it.product?.images?.[0] || it.productImage || ''} alt={it.product?.name || it.productName} className={`${idx === 0 ? 'w-20 h-20' : 'w-14 h-14'} object-cover rounded`} />
                            <div className="flex-1">
                                <div className={`font-medium ${idx === 0 ? 'text-lg' : 'text-base'} text-gray-800`}>{it.product?.name || it.productName}</div>
                                <div className="text-sm text-gray-500">Giá: {formatVND(it.product?.price ?? it.productPrice ?? 0)}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Doanh thu</div>
                                <div className={`font-semibold ${idx === 0 ? 'text-xl text-yellow-600' : 'text-lime-800'}`}>{formatVND(it.totalAmount)}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <ProductDetailModal open={open} product={selected?.product || selected} onClose={closeDetail} />
        </div>
    );
}