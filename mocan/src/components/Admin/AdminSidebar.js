import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const items = [
        { to: '/admin/dashboard', label: 'Dashboard' },
        { to: '/admin/products', label: 'Products' },
        { to: '/admin/orders', label: 'Orders' },
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/settings', label: 'Settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-screen sticky top-0">
            <div className="p-4">
                <h2 className="text-lg font-bold text-lime-700">Admin</h2>
                <p className="text-xs text-gray-500">MỘC AN control</p>
            </div>

            <nav className="mt-4 px-2">
                {items.map((it) => {
                    const active = pathname === it.to;
                    return (
                        <Link
                            key={it.to}
                            to={it.to}
                            className={`block px-4 py-2 rounded my-1 ${active ? 'bg-lime-700 text-white' : 'text-gray-700 hover:bg-lime-50'}`}
                        >
                            {it.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto p-4 space-y-2">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 rounded text-sm text-red-600 hover:bg-red-50"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
