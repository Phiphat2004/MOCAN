import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../../utils/cart';

export default function CartPage() {
    const [items, setItems] = useState([]);

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

    const total = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);

    if (!items || items.length === 0) return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your cart</h2>
            <p>Your cart is empty.</p>
            <div className="mt-4">
                <Link to="/product" className="text-blue-600">Continue shopping</Link>
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
                                <div className="text-sm text-gray-600">${it.price}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => onQtyChange(it.id, (it.quantity || 1) - 1)} className="px-2 py-1 border rounded">-</button>
                            <div className="px-3">{it.quantity}</div>
                            <button
                                onClick={() => onQtyChange(it.id, (it.quantity || 1) + 1)}
                                className="px-2 py-1 border rounded"
                                disabled={typeof it.stock === 'number' ? ((it.quantity || 0) >= it.stock) : false}
                            >+</button>
                            <button onClick={() => onRemove(it.id)} className="ml-4 text-red-600">Remove</button>
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
                    <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
                    <div className="mt-2">
                        <button className="px-4 py-2 bg-lime-700 text-white rounded">Checkout (demo)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
