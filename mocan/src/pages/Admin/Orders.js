import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Select, Space, Tag } from 'antd';
import axiosInstance from '../../utils/axiosConfig';
import formatVND from '../../utils/formatPrice';
import ProductDetailModal from '../../components/Admin/ProductDetailModal';
import dayjs from 'dayjs';

const { Option } = Select;

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customerModal, setCustomerModal] = useState({ visible: false, guest: null });
    const [productModal, setProductModal] = useState({ visible: false, items: [] });
    const [productDetailModal, setProductDetailModal] = useState({ visible: false, product: null });
    const [noteModal, setNoteModal] = useState({ visible: false, note: '' });
    const [monthFilter, setMonthFilter] = useState(null);
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/orders');
                setOrders(res.data || []);
            } catch (err) {
                console.error('Failed to fetch orders', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const months = [
        { label: 'All', value: null },
        { label: 'Jan', value: 1 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 }, { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 }, { label: 'Aug', value: 8 }, { label: 'Sep', value: 9 }, { label: 'Oct', value: 10 }, { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 },
    ];

    const filteredOrders = orders.filter(o => {
        const date = dayjs(o.order_date || o.createdAt);
        if (!date.isValid()) return false;
        if (yearFilter && date.year() !== Number(yearFilter)) return false;
        if (monthFilter && date.month() + 1 !== Number(monthFilter)) return false;
        return true;
    });

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            render: id => <strong>{id}</strong>
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'order_date',
            key: 'order_date',
            render: d => d ? dayjs(d).format('DD/MM/YYYY HH:mm') : ''
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: v => formatVND(v)
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            render: (note) => {
                if (!note) return '-';
                const preview = note.length > 50 ? note.slice(0, 50) + '...' : note;
                return (
                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-700">{preview}</div>
                        {note.length > 50 && (
                            <Button size="small" onClick={() => setNoteModal({ visible: true, note })}>Xem</Button>
                        )}
                    </div>
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const colorMap = {
                    'đang xử lý': 'orange',
                    'đang giao': 'blue',
                    'đã giao': 'green',
                    'hủy': 'red'
                };
                const color = colorMap[status] || 'default';
                return <Tag color={color}>{status}</Tag>;
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button size="small" onClick={() => setCustomerModal({ visible: true, guest: record.guest && record.guest[0] })}>Xem khách</Button>
                    <Button size="small" onClick={() => setProductModal({ visible: true, items: record.order_detail || [] })}>Xem sản phẩm</Button>
                </Space>
            )
        }
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>

            <div className="mb-4 flex items-center space-x-4">
                <div>
                    <label className="block text-sm text-gray-600">Year</label>
                    <Select value={yearFilter} onChange={v => setYearFilter(v)} style={{ width: 120 }}>
                        {Array.from({ length: 5 }).map((_, i) => {
                            const y = new Date().getFullYear() - i;
                            return <Option key={y} value={y}>{y}</Option>;
                        })}
                    </Select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600">Month</label>
                    <Select value={monthFilter} onChange={v => setMonthFilter(v)} style={{ width: 140 }}>
                        {months.map(m => <Option key={String(m.value)} value={m.value}>{m.label}</Option>)}
                    </Select>
                </div>
            </div>

            <Table rowKey="_id" columns={columns} dataSource={filteredOrders} loading={loading} />

            <Modal
                title="Thông tin khách hàng"
                visible={customerModal.visible}
                onCancel={() => setCustomerModal({ visible: false, guest: null })}
                footer={null}
            >
                {customerModal.guest ? (
                    <div>
                        <p><strong>Tên khách hàng:</strong> {customerModal.guest.name}</p>
                        <p><strong>Email:</strong> {customerModal.guest.email}</p>
                        <p><strong>Số điện thoại:</strong> {customerModal.guest.phone}</p>
                        <p><strong>Địa chỉ:</strong> {customerModal.guest.address}</p>
                    </div>
                ) : (
                    <div>No guest data</div>
                )}
            </Modal>

            <Modal
                title="Chi tiết sản phẩm"
                visible={productModal.visible}
                onCancel={() => setProductModal({ visible: false, items: [] })}
                footer={null}
                width={800}
            >
                <div className="space-y-4">
                    {productModal.items && productModal.items.length ? (
                        productModal.items.map(item => {
                            const p = item.product_id || item.product;
                            return (
                                <div key={item._id} className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                        {p && p.images && p.images[0] ? (
                                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                        ) : null}
                                    </div>
                                    <div className="flex-1">
                                        <button onClick={() => setProductDetailModal({ visible: true, product: p || (item.product_id || item) })} className="text-left w-full">
                                            <div className="font-semibold text-lime-700 hover:underline">{p && p.name}</div>
                                            <div className="text-sm text-gray-600">Loại: {p && p.category}</div>
                                            <div className="text-sm text-gray-600">Giá: {formatVND(item.unit_price || (p && p.price))}</div>
                                            <div className="text-sm text-gray-600">Số lượng: {item.quantity}</div>
                                            <div className="text-sm text-gray-600">Tổng: {formatVND(item.total_price)}</div>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No items</div>
                    )}
                </div>
            </Modal>

            <ProductDetailModal
                open={productDetailModal.visible}
                product={productDetailModal.product}
                onClose={() => setProductDetailModal({ visible: false, product: null })}
            />
            <Modal
                title="Ghi chú"
                visible={noteModal.visible}
                onCancel={() => setNoteModal({ visible: false, note: '' })}
                footer={null}
            >
                <div>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{noteModal.note}</p>
                </div>
            </Modal>
        </div>
    );
}
