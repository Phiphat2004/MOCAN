import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function MonthlyChart({ monthly, year, onYearChange }) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = monthNames;
    const values = monthNames.map(m => (monthly && Object.prototype.hasOwnProperty.call(monthly, m) ? monthly[m] : 0));

    return (
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-lime-800">Doanh thu hàng tháng</h2>
                <div>
                    <label className="text-sm text-gray-600 mr-2">Năm</label>
                    <select
                        value={year}
                        onChange={(e) => onYearChange(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {Array.from({ length: 5 }).map((_, i) => {
                            const y = new Date().getFullYear() - i;
                            return (
                                <option key={y} value={y}>{y}</option>
                            );
                        })}
                    </select>
                </div>
            </div>

            {monthly ? (
                <Bar
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'Doanh thu (VND)',
                                data: values,
                                backgroundColor: 'rgba(34,197,94,0.8)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const val = context.parsed.y ?? context.parsed ?? 0;
                                        return 'Doanh thu: ' + new Intl.NumberFormat('vi-VN').format(val) + ' VNĐ';
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    callback: function (value) {
                                        return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
                                    }
                                }
                            }
                        }
                    }}
                    style={{ minHeight: 260 }}
                />
            ) : (
                <div>Loading chart...</div>
            )}
        </div>
    );
}
