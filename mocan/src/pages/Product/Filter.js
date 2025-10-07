import { useState } from "react";

export default function Filter() {

    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState("Default");
    const [color, setColor] = useState("#000000"); // mặc định màu đen


    const handleFilter = () => {
        // Xử lý filter ở đây
        console.log("Filter applied:", { category, price, color });
        alert(`Category: ${category}\nPrice: ${price}\nColor: ${color}`);
    };
    return (
        <div className="space-y-6 border p-4 rounded-lg shadow">
            <h1 className="font-bold text-2xl">Filter</h1>
            <hr />
            {/* Category */}
            <div>
                <h2 className="font-semibold mb-2 text-2xl">Category</h2>
                <div className="flex flex-col gap-3">
                    {["All", "Men", "Women", "Kids"].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-3 py-1 rounded ${category === c ? "bg-lime-700 text-white" : "bg-gray-200"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            <hr />
            {/* Price */}
            <div>
                <h2 className="font-semibold mb-2 text-2xl">Price</h2>
                <div className="flex flex-col gap-3">
                    {["Default", "From low to high", "From high to low"].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPrice(p)}
                            className={`px-3 py-1 rounded ${price === p ? "bg-lime-700 text-white" : "bg-gray-200"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <hr />
            {/* Color */}
            <div>
                <h2 className="font-semibold mb-2 text-2xl">Color</h2>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-20 h-12 border rounded cursor-pointer"
                />
            </div>

            {/* Nút Filter */}
            <div className="pt-4">
                <button
                    onClick={handleFilter}
                    className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    )
}