import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../../utils/cart';
import { useToast } from '../../components/Toast/ToastProvider';
import formatVND from '../../utils/formatPrice';

export default function CartPage() {
    const [items, setItems] = useState([]);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [guest, setGuest] = useState({ name: '', phone: '', email: '', address: '', note: '' });
    const { addToast } = useToast();

    useEffect(() => {
        setItems(getCart());
    }, []);

    const onQtyChange = (id, qty) => {
        const updated = updateCartItem(id, qty);
        setItems(updated);
    };

    const onRemove = (id) => {
        const updated = removeFromCart(id);
        setItems(updated);
    };

    const onClear = () => {
        clearCart();
        setItems([]);
    };

    const openCheckout = () => setCheckoutOpen(true);
    const closeCheckout = () => setCheckoutOpen(false);

    const submitOrder = async (e) => {
        e.preventDefault();
        if (submitting) return; // prevent double submit

        // build order payload
        const cartItems = getCart();
        if (!cartItems || cartItems.length === 0) {
            addToast('Giỏ hàng rỗng', { type: 'error' });
            return;
        }

        // client-side validation: ensure every cart item has an id and positive quantity
        for (const it of cartItems) {
            if (!it.id) {
                addToast('Có sản phẩm trong giỏ thiếu id, vui lòng kiểm tra lại', { type: 'error' });
                return;
            }
            if (!it.quantity || Number(it.quantity) <= 0) {
                addToast('Số lượng sản phẩm không hợp lệ trong giỏ hàng', { type: 'error' });
                return;
            }
        }

        const order_detail = cartItems.map(it => ({ product_id: String(it.id), quantity: Number(it.quantity), unit_price: Number(it.price || 0), size: it.size || '', color: it.color || '' }));
        const payload = {
            guest: { name: guest.name, phone: guest.phone, email: guest.email || '', address: guest.address, note: guest.note },
            order_detail,
            payment_method: 'COD'
        };

        try {
            setSubmitting(true);
            await axiosInstance.post('/orders', payload);
            addToast('Đặt hàng thành công, thông tin về đơn hàng đã được gửi về email của bạn.', { type: 'success' });
            clearCart();
            setItems([]);
            closeCheckout();
        } catch (err) {
            // detailed logging to help debug server-side validation errors (400)
            console.error('Order failed', err);
            if (err?.response) {
                console.error('Order failed response data:', err.response.data);
            }
            const serverMessage = err?.response?.data?.message || (err?.response?.data ? JSON.stringify(err.response.data) : null);
            addToast(serverMessage || err?.message || 'Đặt hàng thất bại', { type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const total = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);

    if (!items || items.length === 0) return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your cart</h2>
            <p>Your cart is empty.</p>
            <div className="mt-4">
                <Link to="/products" className="text-lime-800 underline">Continue shopping</Link>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your cart</h2>
            <div className="space-y-4">
                {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between border p-3 rounded">
                        <div className="flex items-center gap-4">
                            <img src={it.image} alt={it.name} className="w-20 h-20 object-contain" />
                            <div>
                                <div className="font-medium">{it.name}</div>
                                <div className="text-sm text-gray-600">{formatVND(it.price)}</div>
                                {it.color && (
                                    <div className="text-xs mt-1 flex items-center gap-2">
                                        <span>Màu:</span>
                                        <span className="inline-block w-5 h-5 rounded border" style={{ background: it.color }} title={it.color}></span>
                                        <span className="ml-1">{it.color}</span>
                                    </div>
                                )}
                                {it.size && (
                                    <div className="text-xs mt-1">
                                        <span>Kích thước:</span> <span className="font-semibold">{it.size}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => onQtyChange(it.id, (it.quantity || 1) - 1)} className="px-2 py-1 border rounded" disabled={submitting}>-</button>
                            <div className="px-3">{it.quantity}</div>
                            <button
                                onClick={() => onQtyChange(it.id, (it.quantity || 1) + 1)}
                                className="px-2 py-1 border rounded"
                                disabled={submitting || (typeof it.stock === 'number' ? ((it.quantity || 0) >= it.stock) : false)}
                            >+</button>
                            <button onClick={() => onRemove(it.id)} className="ml-4 text-red-600" disabled={submitting}>Remove</button>
                            {typeof it.stock === 'number' && (
                                <div className="ml-4 text-sm text-gray-500">Stock: {it.stock}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div>
                    <button onClick={onClear} className="px-4 py-2 bg-gray-100 border rounded">Clear cart</button>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold">Total: {formatVND(total)}</div>
                    <div className="mt-2">
                        <button onClick={openCheckout} className="px-4 py-2 bg-lime-700 text-white rounded">Checkout</button>
                    </div>
                </div>
            </div>

            {/* Checkout modal */}
            {checkoutOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-auto">
                        <h3 className="text-lg font-semibold mb-4">Thông tin người nhận</h3>
                        <form onSubmit={submitOrder} className="space-y-3">
                            <div>
                                <label className="block text-sm">Họ tên</label>
                                <input required value={guest.name} onChange={e => setGuest({ ...guest, name: e.target.value })} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm">Số điện thoại</label>
                                <input required value={guest.phone} onChange={e => setGuest({ ...guest, phone: e.target.value })} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm">Email (tuỳ chọn)</label>
                                <input value={guest.email} onChange={e => setGuest({ ...guest, email: e.target.value })} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm">Địa chỉ giao hàng</label>
                                <input required value={guest.address} onChange={e => setGuest({ ...guest, address: e.target.value })} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm">Ghi chú (nếu có)</label>
                                <textarea value={guest.note} onChange={e => setGuest({ ...guest, note: e.target.value })} className="mt-1 block w-full border rounded px-3 py-2" />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={closeCheckout} className="px-4 py-2 border rounded" disabled={submitting}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-lime-700 text-white rounded flex items-center gap-2" disabled={submitting}>
                                    {submitting ? (
                                        <svg className="w-4 h-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                    ) : null}
                                    {submitting ? 'Đang xử lý...' : 'Place order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
