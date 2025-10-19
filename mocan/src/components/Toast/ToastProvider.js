import React, { createContext, useContext, useCallback, useState } from 'react';

const ToastContext = createContext(null);

function Toast({ id, message, type = 'info', onClose }) {
    // Larger, more prominent toast styling
    const base = 'px-6 py-3 rounded-lg shadow-lg flex items-start gap-4 transform transition-all duration-200';
    const color = type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-white border-gray-200 text-gray-800';

    return (
        <div className={`${base} border ${color} max-w-md`} role="status" aria-live="polite">
            <div className="flex-shrink-0 mt-0.5">
                {type === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" /></svg>
                ) : type === 'error' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 102 0zm0 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v2H2V5z" /><path fillRule="evenodd" d="M2 9h14v4a2 2 0 01-2 2H4a2 2 0 01-2-2V9zm5 2a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                )}
            </div>
            <div className="flex-1 text-base leading-normal font-medium">
                {message}
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-3 text-lg">✕</button>
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, opts = {}) => {
        const { type = 'info', duration = 3000 } = opts;
        const id = Date.now() + Math.random();
        setToasts((t) => [...t, { id, message, type }]);
        if (duration > 0) {
            setTimeout(() => {
                setToasts((t) => t.filter((x) => x.id !== id));
            }, duration);
        }
        return id;
    }, []);

    const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
                {toasts.map((t) => (
                    <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within a ToastProvider');
    return ctx;
}

export default ToastProvider;
