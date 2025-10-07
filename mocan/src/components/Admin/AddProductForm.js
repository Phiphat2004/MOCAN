import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { message } from 'antd';

export default function AddProductForm({ onSuccess, onCancel }) {
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const addColor = (value) => {
        const v = (value ?? colorInput).trim();
        if (!v) return;
        if (!colors.includes(v)) setColors((s) => [...s, v]);
        setColorInput('');
    };
    const removeColor = (idx) => setColors((s) => s.filter((_, i) => i !== idx));

    const addTagLocal = () => {
        const v = tagInput.trim();
        if (!v) return;
        if (!tags.includes(v)) setTags((s) => [...s, v]);
        setTagInput('');
    };
    const removeTag = (idx) => setTags((s) => s.filter((_, i) => i !== idx));

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        const withPreview = files.map((f) => Object.assign(f, { preview: URL.createObjectURL(f) }));
        setImages((prev) => [...prev, ...withPreview]);
    };
    const removeImage = (idx) => setImages((s) => s.filter((_, i) => i !== idx));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(event.target);
            const ingredientsRaw = formData.get('ingredients') || '';
            const ingredients = (typeof ingredientsRaw === 'string') ? ingredientsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

            const product = {
                name: formData.get('name'),
                price: Number(formData.get('price')) || 0,
                category: formData.get('category') || '',
                description: formData.get('description') || '',
                ingredients,
                weight: Number(formData.get('weight')) || 0,
                dimensions: {
                    length: Number(formData.get('length')) || 0,
                    width: Number(formData.get('width')) || 0,
                    height: Number(formData.get('height')) || 0,
                },
                skin_type: formData.get('skin_type') || '',
                colors,
                scent: formData.get('scent') || '',
                manufacture_date: formData.get('manufacture_date') || undefined,
                expiry_date: formData.get('expiry_date') || undefined,
                tags,
            };

            if (images && images.length > 0) {
                const fd = new FormData();
                // append scalar and object fields
                Object.keys(product).forEach((key) => {
                    const val = product[key];
                    if (val === undefined) return;
                    // arrays/objects should be sent as JSON strings
                    if (typeof val === 'object') fd.append(key, JSON.stringify(val));
                    else fd.append(key, String(val));
                });
                // append files (File objects) under `images` field
                images.forEach((file) => fd.append('images', file));

                // When sending FormData, ensure the request has multipart/form-data.
                // Let axios/browser set the proper boundary by specifying the header.
                const res = await axiosInstance.post('/products', fd, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success(`Created ${res.data?.name || 'product'}`);
                onSuccess && onSuccess(res.data);
            } else {
                const res = await axiosInstance.post('/products', product);
                message.success(`Created ${res.data?.name || 'product'}`);
                onSuccess && onSuccess(res.data);
            }
            // clean
            images.forEach((f) => { if (f && f.preview) URL.revokeObjectURL(f.preview); });
            setImages([]);
            setTags([]);
            setColors([]);
            event.target.reset();
        } catch (err) {
            console.error('Create product error', err);
            alert(err.response?.data?.message || err.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm">Name</label>
                    <input name="name" required className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Category</label>
                    <input name="category" className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Description</label>
                    <textarea name="description" className="mt-1 block w-full border rounded px-3 py-2" rows={3} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Ingredients (comma separated)</label>
                    <input name="ingredients" className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Price</label>
                    <input name="price" type="number" className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Stock quantity</label>
                    <input name="stock_quantity" type="number" className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
            </div>

            <div>
                <label className="block text-sm">Colors</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {["#FFFFFF", "#000000", "#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#2196F3", "#4CAF50", "#FFEB3B", "#FF9800"].map(sw => (
                        <button key={sw} type="button" onClick={() => addColor(sw)} className={`w-8 h-8 rounded border ${colors.includes(sw) ? 'ring-2 ring-lime-600' : ''}`} style={{ background: sw }} />
                    ))}
                </div>
                <div className="flex gap-2 mt-2">
                    <input value={colorInput} onChange={e => setColorInput(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="#hex or name" />
                    <button type="button" onClick={() => addColor()} className="px-3 py-2 bg-lime-700 text-white rounded">Add</button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {colors.map((c, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">{c}<button type="button" onClick={() => removeColor(i)} className="text-red-500">x</button></span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm">Tags</label>
                <div className="flex gap-2 mt-1">
                    <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTagLocal(); } }} className="flex-1 border rounded px-3 py-2" placeholder="Add tag and press Enter" />
                    <button type="button" onClick={addTagLocal} className="px-3 py-2 bg-lime-700 text-white rounded">Add</button>
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {tags.map((t, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">{t}<button type="button" onClick={() => removeTag(i)} className="text-red-500">x</button></span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm">Images</label>
                <input type="file" multiple accept="image/*" onChange={onImagesChange} className="mt-1" />
                <div className="mt-3 grid grid-cols-3 gap-3">
                    {images.map((file, i) => (
                        <div key={i} className="relative border rounded overflow-hidden">
                            <img src={file.preview} alt={`img-${i}`} className="object-cover w-full h-24" />
                            <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600">×</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-lime-700 text-white rounded">{loading ? 'Creating...' : 'Create product'}</button>
            </div>
        </form>
    );
}
