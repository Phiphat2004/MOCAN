import React from 'react';
import formatVND from '../../utils/formatPrice';

export default function RevenueCards({ data }) {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded shadow">Doanh thu hôm nay: <strong>{formatVND(data.todayRevenue)}</strong></div>
            <div className="bg-white p-4 rounded shadow">Tháng này: <strong>{formatVND(data.monthRevenue)}</strong></div>
            <div className="bg-white p-4 rounded shadow">Đơn hàng hôm nay: <strong>{data.todayOrders}</strong></div>
            <div className="bg-white p-4 rounded shadow">Đơn hàng tháng này: <strong>{data.monthOrders}</strong></div>
        </div>
    );
}
