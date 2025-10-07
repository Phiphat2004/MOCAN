import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-lime-50">
            <div className="flex">
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-lime-800">Dashboard</h1>
                    <p className="mt-2 text-gray-600">Welcome to the admin dashboard. Use the sidebar to navigate.</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">Total Products: <strong>—</strong></div>
                        <div className="bg-white p-4 rounded shadow">Pending Orders: <strong>—</strong></div>
                        <div className="bg-white p-4 rounded shadow">Users: <strong>—</strong></div>
                    </div>
                </main>
            </div>
        </div>
    );
}

