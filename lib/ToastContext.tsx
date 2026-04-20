/**
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

type ToastType = "error" | "success" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  timestamp: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "error") => {
    const id = Date.now();
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
    
    setToasts((prev) => [...prev, { id, message, type, timestamp }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-md px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-full flex flex-col px-4 py-3 bg-[#050505] dark:bg-[#050505] border pointer-events-auto animate-in slide-in-from-top-5 fade-in duration-200 shadow-2xl font-mono text-xs backdrop-blur-md ${
              toast.type === "error"
                ? "border-l-4 border-l-rose-500 shadow-rose-500/10"
                : toast.type === "success"
                ? "border-l-4 border-l-emerald-500 shadow-emerald-500/10"
                : "border-l-4 border-l-cyan-500 shadow-cyan-500/10"
            }`}
          >
            <div className="flex justify-between items-center text-gray-500 mb-2 opacity-80 uppercase tracking-widest text-[10px]">
              <span>[ {toast.timestamp} ]</span>
              <span
                className={`font-bold ${
                  toast.type === "error"
                    ? "text-rose-500"
                    : toast.type === "success"
                    ? "text-emerald-500"
                    : "text-cyan-500"
                }`}
              >
                {toast.type === "error"
                  ? "ERR_PAYMENT"
                  : toast.type === "success"
                  ? "SYS_ACK_200"
                  : "NET_LOG_100"}
              </span>
            </div>
            
            <p className={`tracking-wide font-medium leading-relaxed ${
                toast.type === "error"
                  ? "text-rose-100"
                  : toast.type === "success"
                  ? "text-emerald-100"
                  : "text-cyan-100"
              }`}>
              &gt; {toast.message}
            </p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
