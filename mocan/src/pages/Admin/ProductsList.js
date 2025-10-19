import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import AddProductModal from '../../components/Admin/AddProductModal';
import UpdateProductModal from '../../components/Admin/UpdateProductModal';
import axiosInstance from '../../utils/axiosConfig';
import 'antd/dist/reset.css';
import { useToast } from '../../components/Toast/ToastProvider';
import formatVND from '../../utils/formatPrice';

export default function ProductsList() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get('/products');
            setProducts(res.data || []);
        } catch (err) {
            console.error('Failed to fetch products', err);
            setError(err?.response?.data?.message || err.message || 'Error fetching products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const { addToast } = useToast();

    const handleSuccess = (created) => {
        setOpen(false);
        // refresh the list after successful creation
        fetchProducts();
        if (created?.name) {
            // small feedback
            addToast(`Tạo ${created.name} thành công`, { type: 'success' });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            addToast('Đã xoá sản phẩm', { type: 'success' });
            fetchProducts();
        } catch (err) {
            console.error('Delete failed', err);
            addToast(err?.response?.data?.message || 'Xoá thất bại', { type: 'error' });
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <button onClick={() => setOpen(true)} className="px-3 py-2 bg-lime-700 text-white rounded">Add Product</button>
            </div>

            {loading && <p className="text-gray-600">Loading products...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <div className="mt-4">
                    {products.length === 0 ? (
                        <p className="text-gray-600">No products found.</p>
                    ) : (
                        <Table
                            rowKey={(record) => record._id}
                            dataSource={products}
                            pagination={{ pageSize: 10 }}
                            columns={[
                                {
                                    title: 'Image',
                                    dataIndex: 'images',
                                    key: 'image',
                                    width: 96,
                                    render: (images) => (
                                        images && images.length > 0 ? (
                                            <img src={images[0]} alt="thumb" className="w-16 h-12 object-cover rounded" />
                                        ) : (
                                            <div className="w-16 h-12 bg-gray-100 flex items-center justify-center text-gray-400">No</div>
                                        )
                                    ),
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                    render: (text, record) => (
                                        <div>
                                            <div className="font-medium">{text}</div>
                                            <div className="text-sm text-gray-500">{record.sku || ''}</div>
                                        </div>
                                    ),
                                },
                                {
                                    title: 'Price',
                                    dataIndex: 'price',
                                    key: 'price',
                                    render: (price) => formatVND(price),
                                },
                                {
                                    title: 'Category',
                                    dataIndex: 'category',
                                    key: 'category',
                                },
                                {
                                    title: 'Stock',
                                    dataIndex: 'stock_quantity',
                                    key: 'stock_quantity',
                                },
                                {
                                    title: 'Created',
                                    dataIndex: 'createdAt',
                                    key: 'createdAt',
                                    render: (val) => (val ? new Date(val).toLocaleString() : '-'),
                                },
                                {
                                    title: 'Actions',
                                    key: 'actions',
                                    render: (_, record) => (
                                        <Space>
                                            <Button type="link" onClick={() => { setSelected(record); setEditOpen(true); }}>Edit</Button>
                                            <Popconfirm title="Delete this product?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
                                                <Button type="link" danger>Delete</Button>
                                            </Popconfirm>
                                        </Space>
                                    ),
                                },
                            ]}
                        />
                    )}
                </div>
            )}

            <AddProductModal open={open} onClose={() => setOpen(false)} onSuccess={handleSuccess} />
            {selected && (
                <UpdateProductModal
                    open={editOpen}
                    product={selected}
                    onClose={() => { setEditOpen(false); setSelected(null); }}
                    onSuccess={(updated) => {
                        setEditOpen(false);
                        setSelected(null);
                        fetchProducts();
                        addToast('Cập nhật sản phẩm thành công', { type: 'success' });
                    }}
                />
            )}
        </div>
    );
}
