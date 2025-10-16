import { useState } from "react";

export default function Filter({ onApply, onChange }) {

    const [category, setCategory] = useState("All");
    const [price, setPrice] = useState("Default");

    const handleCategoryClick = (c) => {
        setCategory(c);
        if (onChange) onChange({ category: c, price });
    };

    const handlePriceClick = (p) => {
        setPrice(p);
        if (onChange) onChange({ category, price: p });
    };

    const handleApply = () => {
        if (onApply) onApply({ category, price });
    };

    const handleReset = () => {
        const defaultCategory = 'All';
        const defaultPrice = 'Default';
        setCategory(defaultCategory);
        setPrice(defaultPrice);
        if (onChange) onChange({ category: defaultCategory, price: defaultPrice });
        if (onApply) onApply({ category: defaultCategory, price: defaultPrice });
    };

    return (
        <div className="space-y-6 border p-4 rounded-lg shadow">
            <h1 className="font-bold text-2xl">Filter</h1>
            <hr />
            {/* Category */}
            <div>
                <h2 className="font-semibold mb-2 text-2xl">Category</h2>
                <div className="flex flex-col gap-3">
                    {["All", "Men", "Women", "Kid"].map((c) => (
                        <button
                            key={c}
                            onClick={() => handleCategoryClick(c)}
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
                            onClick={() => handlePriceClick(p)}
                            className={`px-3 py-1 rounded ${price === p ? "bg-lime-700 text-white" : "bg-gray-200"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <hr />

            {/* Nút Filter */}
            <div className="pt-4 flex gap-3">
                <button
                    onClick={handleApply}
                    className="flex-1 bg-lime-600 text-white py-2 rounded-lg hover:bg-lime-700"
                >
                    Apply Filter
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}