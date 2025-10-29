import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';

export default function OrderLookup() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const renderProductTitle = (item) => {
        if (!item) return '';
        if (item.product_name) return item.product_name;
        const pid = item.product_id;
        if (!pid) return '';
        if (typeof pid === 'object') return pid.name || pid._id || '';
        return String(pid);
    };

    const renderColor = (it) => {
        if (!it) return '-';
        const color = it.color;
        if (!color) return '-';
        // if color saved as object
        if (typeof color === 'object') return color.name || color.label || String(color.value || JSON.stringify(color));
        // try to resolve from populated product colors array
        const pid = it.product_id;
        if (pid && typeof pid === 'object' && Array.isArray(pid.colors)) {
            const found = pid.colors.find(c => {
                if (!c) return false;
                const code = (c.code || c.value || c.hex || c.name || '').toString().toLowerCase();
                return code === String(color).toLowerCase();
            });
            if (found) return found.name || String(found.code || found.value || color);
        }
        return String(color);
    };

    const renderItemImage = (it) => {
        if (!it) return '';
        if (it.image) return it.image;
        const pid = it.product_id;
        if (pid && typeof pid === 'object' && Array.isArray(pid.images) && pid.images.length > 0) return pid.images[0];
        return '';
    };

    const fetchOrders = async (pg = 1) => {
        if (!phone) return;
        setLoading(true);
        try {
            const res = await axiosInstance.get('/orders', { params: { phone, page: pg, limit } });
            // backward compatible: older response might return array
            if (Array.isArray(res.data)) {
                setOrders(res.data);
                setTotal(res.data.length);
                setTotalPages(1);
                setPage(1);
            } else {
                const data = res.data || {};
                setOrders(Array.isArray(data.orders) ? data.orders : []);
                setTotal(Number(data.total || 0));
                setTotalPages(Number(data.totalPages || 1));
                setPage(Number(data.page || pg));
            }
        } catch (err) {
            console.error('Failed to fetch orders by phone', err);
            setOrders([]);
            setTotal(0);
            setTotalPages(1);
            setPage(1);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch when page or limit changes (only if phone provided)
    useEffect(() => {
        if (phone) fetchOrders(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tra cứu đơn hàng</h2>

            <div className="bg-white p-4 rounded shadow">
                <label className="block text-sm">Nhập số điện thoại</label>
                <div className="flex gap-2 mt-2">
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="flex-1 border rounded px-3 py-2" />
                    <button onClick={fetchOrders} className="px-4 py-2 bg-lime-700 text-white rounded">Tìm</button>
                </div>
            </div>

            <div className="mt-6">
                {loading && <div>Đang tải...</div>}
                {Array.isArray(orders) && orders.length === 0 && <div>Không tìm thấy đơn hàng cho số này.</div>}
                {Array.isArray(orders) && orders.length > 0 && (
                    <div className="space-y-4">
                        {orders.map((o) => (
                            <div key={o._id} className="border p-3 rounded bg-white">
                                <div className="flex justify-between">
                                    <div>Mã đơn: <strong>{o._id}</strong></div>
                                    <div>{new Date(o.order_date).toLocaleString()}</div>
                                </div>
                                <div className="mt-2">Trạng thái: <strong>{o.status}</strong></div>
                                <div className="mt-2">Tổng: <strong>{o.total_amount?.toLocaleString() || 0}₫</strong></div>
                                <div className="mt-2">
                                    <div className="font-medium">Chi tiết:</div>
                                    <table className="w-full text-sm mt-2">
                                        <thead>
                                            <tr className="text-left text-gray-600">
                                                <th></th>
                                                <th>Sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Màu</th>
                                                <th>Kích thước</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(o.order_detail) && o.order_detail.map((it, i) => (
                                                <tr key={i} className="border-b items-center">
                                                    <td className="py-1 pr-2">
                                                        {renderItemImage(it) ? (
                                                            <img src={renderItemImage(it)} alt={renderProductTitle(it)} className="w-12 h-12 object-cover rounded" />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No</div>
                                                        )}
                                                    </td>
                                                    <td className="py-1 align-top">{renderProductTitle(it)}</td>
                                                    <td className="py-1 align-top">{it.quantity}</td>
                                                    <td className="py-1 align-top">{renderColor(it)}</td>
                                                    <td className="py-1 align-top">{it.size || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Pagination controls */}
                {Array.isArray(orders) && orders.length > 0 && (
                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-600">Tổng: {total} đơn - Trang {page} / {totalPages}</div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className={`px-3 py-1 rounded ${page <= 1 ? 'bg-gray-200 text-gray-500' : 'bg-white border'}`}>
                                Trước
                            </button>
                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, idx) => {
                                    const pg = idx + 1;
                                    // only show first, last and nearby pages
                                    if (totalPages > 7) {
                                        if (pg === 1 || pg === totalPages || Math.abs(pg - page) <= 1) {
                                            return (
                                                <button key={pg} onClick={() => setPage(pg)} className={`px-2 py-1 rounded ${pg === page ? 'bg-lime-700 text-white' : 'bg-white border'}`}>{pg}</button>
                                            );
                                        }
                                        if (pg === 2 && page > 4) return <span key={pg} className="px-2">...</span>;
                                        if (pg === totalPages - 1 && page < totalPages - 3) return <span key={pg} className="px-2">...</span>;
                                        return null;
                                    }
                                    return (
                                        <button key={pg} onClick={() => setPage(pg)} className={`px-2 py-1 rounded ${pg === page ? 'bg-lime-700 text-white' : 'bg-white border'}`}>{pg}</button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className={`px-3 py-1 rounded ${page >= totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white border'}`}>
                                Sau
                            </button>
                            <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }} className="ml-2 border rounded px-2 py-1">
                                {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n} / trang</option>)}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
