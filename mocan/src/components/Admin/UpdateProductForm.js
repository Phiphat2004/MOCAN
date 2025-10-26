import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { useToast } from '../Toast/ToastProvider';

export default function UpdateProductForm({ product, onSuccess, onCancel }) {
    const [colors, setColors] = useState(product?.colors || []);
    const [colorInput, setColorInput] = useState('');
    const [tags, setTags] = useState(product?.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [images, setImages] = useState([]); // new files
    const [existingImages, setExistingImages] = useState(product?.images || []);
    const [removedImages, setRemovedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setColors(product?.colors || []);
        setTags(product?.tags || []);
        setExistingImages(product?.images || []);
        setRemovedImages([]);
    }, [product]);

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        const withPreview = files.map((f) => Object.assign(f, { preview: URL.createObjectURL(f) }));
        setImages((prev) => [...prev, ...withPreview]);
    };

    const removeImage = (idx) => {
        setImages((prev) => {
            const file = prev[idx];
            if (file && file.preview) URL.revokeObjectURL(file.preview);
            return prev.filter((_, i) => i !== idx);
        });
    };
    const removeExistingImage = (idx) => {
        const url = existingImages[idx];
        if (!url) return;
        setExistingImages((s) => s.filter((_, i) => i !== idx));
        setRemovedImages((s) => [...s, url]);
    };

    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const form = new FormData(e.target);
            const body = {};
            // collect fields from form
            ['name', 'category', 'description', 'price', 'stock_quantity', 'manufacture_date', 'expiry_date', 'scent', 'skin_type', 'ingredients'].forEach(k => {
                const v = form.get(k);
                if (v !== null && v !== '') body[k] = v;
            });
            // collect size as array
            body.size = form.getAll('size');
            // collect colors and tags
            body.colors = colors;
            body.tags = tags;

            body.colors = colors;
            body.tags = tags;

            let res;
            if (images.length > 0) {
                const fd = new FormData();
                Object.keys(body).forEach(key => {
                    const val = body[key];
                    if (val === undefined) return;
                    if (typeof val === 'object') fd.append(key, JSON.stringify(val));
                    else fd.append(key, String(val));
                });
                images.forEach(file => fd.append('images', file));
                // include removed images list so server can delete them
                if (removedImages.length > 0) fd.append('remove_images', JSON.stringify(removedImages));
                res = await axiosInstance.put(`/products/${product._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                if (removedImages.length > 0) body.remove_images = removedImages;
                res = await axiosInstance.put(`/products/${product._id}`, body);
            }

            // If parent supplied an onSuccess handler it will likely show feedback
            // (e.g. ProductsList shows a toast). Avoid duplicate toasts by
            // delegating success feedback to the parent when onSuccess exists.
            if (onSuccess) {
                onSuccess(res.data);
            } else {
                addToast('Cập nhật sản phẩm thành công', { type: 'success' });
            }
        } catch (err) {
            console.error('Update product error', err);
            const text = err?.response?.data?.message || err?.message || 'Failed to update';
            addToast(text, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // revoke objectURL previews when images change/unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            images.forEach(f => {
                if (f && f.preview) URL.revokeObjectURL(f.preview);
            });
        };
    }, [images]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm">Name</label>
                    <input name="name" defaultValue={product?.name} required className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Category</label>
                    <select name="category" defaultValue={product?.category || ''} required className="mt-1 block w-full border rounded px-3 py-2">
                        <option value="">Select category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kid">Kid</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Description</label>
                    <textarea name="description" defaultValue={product?.description} className="mt-1 block w-full border rounded px-3 py-2" rows={3} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm">Ingredients (Thành phần, cách nhau dấu phẩy)</label>
                    <input name="ingredients" defaultValue={Array.isArray(product?.ingredients) ? product.ingredients.join(', ') : (product?.ingredients || '')} className="mt-1 block w-full border rounded px-3 py-2" placeholder="Ví dụ: Dầu dừa, Tinh dầu tràm, ..." />
                </div>
                <div>
                    <label className="block text-sm">Loại da phù hợp (Skin type)</label>
                    <input name="skin_type" defaultValue={product?.skin_type || ''} className="mt-1 block w-full border rounded px-3 py-2" placeholder="Ví dụ: Da dầu, Da khô, Da nhạy cảm..." />
                </div>
                <div>
                    <label className="block text-sm">Mùi hương (Scent)</label>
                    <input name="scent" defaultValue={product?.scent || ''} className="mt-1 block w-full border rounded px-3 py-2" placeholder="Ví dụ: Hương tràm, Hương cam, ..." />
                </div>
                <div>
                    <label className="block text-sm">Price</label>
                    <input name="price" type="number" defaultValue={product?.price} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Stock quantity</label>
                    <input name="stock_quantity" type="number" defaultValue={product?.stock_quantity} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm">Kích thước (Size)</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="size" value="Lớn" defaultChecked={product?.size?.includes('Lớn')} /> Lớn
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="size" value="Nhỏ" defaultChecked={product?.size?.includes('Nhỏ')} /> Nhỏ
                        </label>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Colors</label>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {["#FFFFFF", "#000000", "#F44336", "#E91E63", "#9C27B0", "#3F51B5", "#2196F3", "#4CAF50", "#FFEB3B", "#FF9800"].map(sw => (
                            <button key={sw} type="button" onClick={() => { if (!colors.includes(sw)) setColors([...colors, sw]); }} className={`w-8 h-8 rounded border ${colors.includes(sw) ? 'ring-2 ring-lime-600' : ''}`} style={{ background: sw }} />
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <input value={colorInput || ''} onChange={e => setColorInput(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="#hex or name" />
                        <button type="button" onClick={() => { const v = (colorInput ?? '').trim(); if (v && !colors.includes(v)) { setColors([...colors, v]); setColorInput(''); } }} className="px-3 py-2 bg-lime-700 text-white rounded">Add</button>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {colors.map((c, i) => (
                            <span key={i} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">{c}<button type="button" onClick={() => setColors(colors.filter((_, idx) => idx !== i))} className="text-red-500">x</button></span>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Tags</label>
                    <div className="flex gap-2 mt-1">
                        <input value={tagInput || ''} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (tagInput && !tags.includes(tagInput)) { setTags([...tags, tagInput]); setTagInput(''); } } }} className="flex-1 border rounded px-3 py-2" placeholder="Add tag and press Enter" />
                        <button type="button" onClick={() => { if (tagInput && !tags.includes(tagInput)) { setTags([...tags, tagInput]); setTagInput(''); } }} className="px-3 py-2 bg-lime-700 text-white rounded">Add</button>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {tags.map((t, i) => (
                            <span key={i} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">{t}<button type="button" onClick={() => setTags(tags.filter((_, idx) => idx !== i))} className="text-red-500">x</button></span>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm">Tags</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {tags.map((t, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded">{t}</span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm">Existing Images</label>
                <div className="mt-3 grid grid-cols-3 gap-3">
                    {existingImages && existingImages.length === 0 && (
                        <div className="text-gray-500">No existing images</div>
                    )}
                    {existingImages.map((url, i) => (
                        <div key={i} className="relative border rounded overflow-hidden">
                            <img src={url} alt={`img-${i}`} className="object-cover w-full h-24" />
                            <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600">×</button>
                        </div>
                    ))}
                </div>

                <label className="block text-sm mt-4">Add Images (optional)</label>
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
                <button type="submit" disabled={loading} className="px-4 py-2 bg-lime-700 text-white rounded">{loading ? 'Updating...' : 'Update product'}</button>
            </div>
        </form>
    );
}
