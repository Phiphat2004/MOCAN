import { useState } from "react";
import axiosInstance from "../../utils/axiosConfig"; // import config

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/auth/login", {
                username,
                password,
            });

            setMessage(res.data.message);
            setToken(res.data.token);

            // Lưu token vào localStorage
            localStorage.setItem("token", res.data.token);
            // Chuyển hướng người dùng đến trang dashboard
            window.location.href = "/dashboard";
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Đăng nhập thất bại");
            } else {
                setMessage("Không thể kết nối đến server");
            }
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-md w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Đăng nhập
                </button>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                )}
            </form>
        </div>
    );
}
