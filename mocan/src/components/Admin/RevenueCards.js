import React from 'react';
import formatVND from '../../utils/formatPrice';

export default function RevenueCards({ data }) {
    const cards = [
        {
            label: 'Doanh thu hôm nay',
            value: formatVND(data.todayRevenue),
            color: 'bg-gradient-to-r from-lime-400 to-green-400',
            icon: '💸',
        },
        {
            label: 'Tháng này',
            value: formatVND(data.monthRevenue),
            color: 'bg-gradient-to-r from-blue-400 to-cyan-400',
            icon: '📈',
        },
        {
            label: 'Đơn hàng hôm nay',
            value: data.todayOrders,
            color: 'bg-gradient-to-r from-orange-400 to-yellow-300',
            icon: '🛒',
        },
        {
            label: 'Đơn hàng tháng này',
            value: data.monthOrders,
            color: 'bg-gradient-to-r from-purple-400 to-pink-400',
            icon: '📦',
        },
    ];
    return (
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className={`${card.color} p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-2xl`}
                >
                    <div className="text-4xl mb-2">{card.icon}</div>
                    <div className="text-lg font-semibold text-white drop-shadow mb-1">{card.label}</div>
                    <div className="text-3xl font-bold text-white drop-shadow mb-2">{card.value}</div>
                </div>
            ))}
        </div>
    );
}
