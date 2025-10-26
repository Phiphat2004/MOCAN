import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ProductCard from '../../components/ProductCard';
import { addToCart } from '../../utils/cart';
import { useToast } from '../../components/Toast/ToastProvider';
import axiosInstance from '../../utils/axiosConfig';


export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quickOpen, setQuickOpen] = useState(false);
    const [quickProduct, setQuickProduct] = useState(null);
    const [qpColor, setQpColor] = useState('');
    const [qpSize, setQpSize] = useState('');
    const [qpQty, setQpQty] = useState(1);
    const { addToast } = useToast();

    useEffect(() => {
        let mounted = true;
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosInstance.get('/products');
                if (!mounted) return;
                const data = Array.isArray(res.data) ? res.data : (res.data?.products || []);
                // map backend shape to ProductCard expected shape
                const mapped = data.map((p) => ({
                    id: p._id || p.id,
                    name: p.name,
                    image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.image || '/assets/Xaphong1.jpg'),
                    price: p.price || 0,
                    stock_quantity: typeof p.stock_quantity !== 'undefined' ? p.stock_quantity : (p.stock || 0),
                    colors: Array.isArray(p.colors) ? p.colors : (p.colors ? [p.colors] : []),
                    size: Array.isArray(p.size) ? p.size : (p.size ? [p.size] : []),
                    // normalize category: backend may return string, object, or tags array
                    category: (typeof p.category === 'string') ? p.category : (p.category?.name || p.category?.title || (Array.isArray(p.tags) && p.tags[0]) || null),
                    oldPrice: p.oldPrice || p.previous_price || null,
                    discount: p.discount || null,
                    rating: (typeof p.rating === 'number') ? p.rating : (p.rating ? Number(p.rating) : 0),
                }));
                // place in-stock products first, out-of-stock last
                const inStock = mapped.filter(p => (p.stock_quantity ?? 0) > 0);
                const outStock = mapped.filter(p => (p.stock_quantity ?? 0) <= 0);
                const grouped = [...inStock, ...outStock];
                setAllProducts(grouped);
                setProducts(grouped);
            } catch (err) {
                console.error('Failed to fetch products', err);
                const text = err?.response?.data?.message || err?.message || 'Failed to load products';
                setError(text);

            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
        return () => { mounted = false; };
    }, []);

    const applyFilters = ({ category, price }) => {
        // category: "All" | "Men" | "Women" | "Kid"
        // price: "Default" | "From low to high" | "From high to low"
        let filtered = [...allProducts];

        if (category && category !== 'All') {
            const cat = category.toLowerCase();
            // normalize and match: category may be 'men', 'male', 'for men', etc. Use inclusive checks
            filtered = filtered.filter((p) => {
                const prodCat = p.category ? String(p.category).toLowerCase() : '';
                if (!prodCat && p.name) {
                    return p.name.toLowerCase().includes(cat);
                }
                // direct match
                if (prodCat === cat) return true;
                // inclusive checks for common synonyms
                if (cat === 'men' && (prodCat.includes('men') || prodCat.includes('male'))) return true;
                if (cat === 'women' && (prodCat.includes('women') || prodCat.includes('female') || prodCat.includes("women's"))) return true;
                if (cat === 'kid' && (prodCat.includes('kid') || prodCat.includes('children') || prodCat.includes('child') || prodCat.includes('baby'))) return true;
                // fallback substring
                if (prodCat.includes(cat)) return true;
                // fallback name match
                if (p.name && p.name.toLowerCase().includes(cat)) return true;
                return false;
            });
        }

        if (price === 'From low to high') {
            filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (price === 'From high to low') {
            filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        }

        // ensure in-stock items appear first while preserving the ordering within each group
        const inStock = filtered.filter(p => (p.stock_quantity ?? 0) > 0);
        const outStock = filtered.filter(p => (p.stock_quantity ?? 0) <= 0);
        setProducts([...inStock, ...outStock]);
    };

    return (
        <div className="p-5 flex gap-6">
            {/* Filter */}
            <div className="w-1/5">
                <Filter onApply={applyFilters} />
            </div>
            {/* product */}
            <div className="w-4/5">
                <h1 className="font-bold text-2xl mb-4">Products</h1>
                {loading && <p className="text-gray-600">Loading products...</p>}
                {error && <p className="text-red-600">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickAdd={(p) => { setQuickProduct(p); setQuickOpen(true); setQpColor(''); setQpSize(p.size && p.size.length > 0 ? p.size[0] : ''); setQpQty(1); }} />
                    ))}
                </div>

                {/* Quick-add modal at page level */}
                {quickOpen && quickProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-3">Thêm {quickProduct.name}</h3>
                            {Array.isArray(quickProduct.colors) && quickProduct.colors.length > 0 && (
                                <div className="mb-3">
                                    <div className="text-sm font-medium mb-1">Màu</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setQpColor('')} className={`w-8 h-8 rounded border flex items-center justify-center ${qpColor === '' ? 'ring-2 ring-lime-600' : ''}`}><span className="text-gray-400">×</span></button>
                                        {quickProduct.colors.map((c, i) => (
                                            <button key={i} type="button" onClick={() => setQpColor(c)} className={`w-8 h-8 rounded border ${qpColor === c ? 'ring-2 ring-lime-600' : ''}`} style={{ background: c }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {Array.isArray(quickProduct.size) && quickProduct.size.length > 0 && (
                                <div className="mb-3">
                                    <div className="text-sm font-medium mb-1">Kích thước</div>
                                    <div className="flex gap-3">
                                        {quickProduct.size.map((s, i) => (
                                            <label key={i} className={`px-2 py-1 border rounded cursor-pointer ${qpSize === s ? 'bg-gray-100' : ''}`}>
                                                <input type="radio" name="qp_size" value={s} checked={qpSize === s} onChange={() => setQpSize(s)} className="hidden" />
                                                {s}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="mb-3 flex items-center gap-2">
                                <div className="text-sm">Số lượng</div>
                                <div className="ml-auto flex items-center gap-2">
                                    <button onClick={() => setQpQty(q => Math.max(1, q - 1))} className="px-2 py-1 border rounded">-</button>
                                    <div className="px-3">{qpQty}</div>
                                    <button onClick={() => setQpQty(q => q + 1)} className="px-2 py-1 border rounded">+</button>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setQuickOpen(false)} className="px-3 py-1 border rounded">Hủy</button>
                                <button onClick={() => {
                                    // validation
                                    if (Array.isArray(quickProduct.colors) && quickProduct.colors.length > 0 && !qpColor) { addToast('Vui lòng chọn màu', { type: 'error' }); return; }
                                    if (Array.isArray(quickProduct.size) && quickProduct.size.length > 0 && !qpSize) { addToast('Vui lòng chọn kích thước', { type: 'error' }); return; }
                                    const item = { id: quickProduct.id || quickProduct._id, name: quickProduct.name, price: quickProduct.price, image: quickProduct.image, quantity: qpQty, stock: quickProduct.stock_quantity, color: qpColor, size: qpSize };
                                    const res = addToCart(item);
                                    if (!res) addToast('Không thể thêm vào giỏ hàng', { type: 'error' });
                                    else addToast('Đã thêm vào giỏ hàng', { type: 'success' });
                                    setQuickOpen(false);
                                }} className="px-3 py-1 bg-lime-700 text-white rounded">Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
