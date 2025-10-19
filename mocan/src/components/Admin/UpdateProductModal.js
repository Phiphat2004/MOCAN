import React from 'react';
import UpdateProductForm from './UpdateProductForm';

export default function UpdateProductModal({ open, product, onClose, onSuccess }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-full max-w-3xl rounded shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Update Product</h3>
                    <button onClick={onClose} className="text-gray-600">✕</button>
                </div>
                <UpdateProductForm product={product} onSuccess={onSuccess} onCancel={onClose} />
            </div>
        </div>
    );
}
