import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import RevenueCards from '../../components/Admin/RevenueCards';
import MonthlyChart from '../../components/Admin/MonthlyChart';
import TopProductCard from '../../components/Admin/TopProductCard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function DashboardPage() {
    const [data, setData] = useState({
        todayRevenue: 0,
        monthRevenue: 0,
        todayOrders: 0,
        monthOrders: 0,
        top5Product: [],
    });

    // Fetch data from the API
    useEffect(() => {
        // Example API call
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/dashboard/stats');
                // Assuming the response data structure matches
                const stats = response.data;
                // avoid mutating state directly — create a new object
                setData(prev => ({ ...prev, ...stats }));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    // Fetch monthly data for chart (selectable year)
    const [monthly, setMonthly] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchMonthly = async () => {
            try {
                const res = await axiosInstance.get(`/dashboard/monthly/${year}`);
                setMonthly(res.data);
            } catch (err) {
                console.error('Error fetching monthly data', err);
                setMonthly(null);
            }
        };
        fetchMonthly();
    }, [year]);

    const topProducts = Array.isArray(data.top5Product) ? data.top5Product : [];


    return (
        <div className="min-h-screen bg-lime-50">
            <div className="flex flex-col">
                <main className="flex-1 px-8">
                    <h1 className="text-3xl font-bold text-lime-800">Dashboard</h1>
                    <p className="mt-2 text-gray-600">Đây là trang tổng quan của quản trị viên.</p>

                    <RevenueCards data={data} />
                </main>
                <div className="px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    <MonthlyChart monthly={monthly} year={year} onYearChange={setYear} />
                    <TopProductCard topProducts={topProducts} />
                </div>
            </div>
        </div>
    );
}