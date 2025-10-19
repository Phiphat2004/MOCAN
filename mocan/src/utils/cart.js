// Simple cart utility using localStorage
const CART_KEY = 'mocan_cart_v1';

function readCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to read cart', e);
        return [];
    }
}

function writeCart(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        try {
            // notify other parts of the app that cart changed
            window.dispatchEvent(new Event('cart_updated'));
        } catch (e) {
            // ignore in non-browser env
        }
    } catch (e) {
        console.error('Failed to write cart', e);
    }
}

export function getCart() {
    return readCart();
}

export function addToCart(item) {
    const cart = readCart();
    // if stock information provided, enforce it
    const stock = item.stock_quantity;
    if (typeof stock === 'number' && stock <= 0) {
        // cannot add out-of-stock
        return false;
    }

    const idx = cart.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
        const nextQty = (cart[idx].quantity || 0) + (item.quantity || 1);
        if (typeof stock === 'number' && nextQty > stock) {
            // cap to stock
            cart[idx].quantity = stock;
        } else {
            cart[idx].quantity = nextQty;
        }
    } else {
        const qty = item.stock_quantity || 1;
        if (typeof stock === 'number' && qty > stock) {
            if (stock <= 0) return false;
            cart.push({ ...item, quantity: stock });
        } else {
            cart.push({ ...item, quantity: qty });
        }
    }
    writeCart(cart);
    return cart;
}

export function updateCartItem(id, quantity) {
    const cart = readCart();
    const idx = cart.findIndex((i) => i.id === id);
    if (idx >= 0) {
        const stock = cart[idx].stock;
        if (quantity <= 0) cart.splice(idx, 1);
        else if (typeof stock === 'number' && quantity > stock) cart[idx].quantity = stock;
        else cart[idx].quantity = quantity;
        writeCart(cart);
    }
    return cart;
}

export function removeFromCart(id) {
    const cart = readCart().filter((i) => i.id !== id);
    writeCart(cart);
    return cart;
}

export function clearCart() {
    writeCart([]);
}

export function cartCount() {
    return readCart().reduce((s, i) => s + (i.quantity || 0), 0);
}

const cartApi = { getCart, addToCart, updateCartItem, removeFromCart, clearCart, cartCount };
export default cartApi;
