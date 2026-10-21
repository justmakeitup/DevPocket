'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((msg: string, d?: number) => addToast(msg, 'success', d), [addToast]);
  const error = useCallback((msg: string, d?: number) => addToast(msg, 'error', d), [addToast]);
  const info = useCallback((msg: string, d?: number) => addToast(msg, 'info', d), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-xl backdrop-blur-md border text-sm font-medium ${
                item.type === 'success'
                  ? 'bg-neutral-900/90 text-white border-neon-cyan/40 shadow-neon-cyan/10'
                  : item.type === 'error'
                  ? 'bg-neutral-900/90 text-white border-red-500/50 shadow-red-500/10'
                  : 'bg-neutral-900/90 text-white border-neon-violet/40 shadow-neon-violet/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0" />}
                {item.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                {item.type === 'info' && <Info className="w-4 h-4 text-neon-violet shrink-0" />}
                <span>{item.message}</span>
              </div>
              <button
                onClick={() => removeToast(item.id)}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
