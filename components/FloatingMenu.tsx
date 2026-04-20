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
import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { useInspector } from "../lib/InspectorContext";
import { useToast } from "@/lib/ToastContext";
import {
  executeManualBotTrade,
  executeUpdateRole,
} from "../lib/ExchangeService";

import { subscribe } from "@firebase/data-connect";
import { useGetDashboardData } from "@dataconnect/generated/react";
import { getUserProfileRef } from "@dataconnect/generated";

export default function FloatingMenu() {
  const { user } = useAuth();
  const { logEvent } = useInspector();
  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [profileData, setProfileData] = useState<any>(null);
  const [optimisticRole, setOptimisticRole] = useState<string | null>(null);

  const { data, refetch: refetchDashboard } = useGetDashboardData();

  useEffect(() => {
    if (!user) return;
    // Subscribe to realtime updates for the authenticated user's profile
    const unsub = subscribe(getUserProfileRef(), (res) => {
      if (res.data) {
        setProfileData(res.data);
        setOptimisticRole(null);
      }
    });
    return () => unsub();
  }, [user]);

  const userRole = optimisticRole || profileData?.user?.role || "USER";

  const handleUpdateRole = async (newRole: string) => {
    setIsProcessing(true);
    setOptimisticRole(newRole);

    try {
      // Update a user's role
      await executeUpdateRole(newRole, logEvent);
      showToast(`Authorization level updated to ${newRole}`, "success");
    } catch (err: any) {
      setOptimisticRole(null);
      showToast("Failed to update role: " + err.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMarketMakerTrade = async () => {
    if (!data?.emojis || data.emojis.length === 0) return;

    setIsProcessing(true);
    try {
      const randomEmoji =
        data.emojis[Math.floor(Math.random() * data.emojis.length)];

      // Execute a random market maker trade to artificially adjust an emoji's stock price
      const { isBuy, tradeAmount } = await executeManualBotTrade(
        randomEmoji,
        user?.displayName || "Unknown",
        logEvent,
      );

      showToast(
        `Created market event for ${randomEmoji.symbol}, prices went ${isBuy ? "up" : "down"} for $${tradeAmount.toFixed(2)}.`,
        "success",
      );
      refetchDashboard();
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-6 md:bottom-16 right-6 xl:right-[480px] z-50 flex flex-col items-end gap-4 transition-all duration-300">
      {isOpen && (
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] p-5 rounded-2xl shadow-2xl w-80 flex flex-col gap-5 text-gray-800 dark:text-gray-200 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <div className="pb-3 border-b border-gray-200 dark:border-[#333] flex justify-between items-center">
            <h2 className="font-bold text-gray-900 dark:text-white tracking-widest uppercase text-xs">
              Control Panel
            </h2>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-mono border uppercase tracking-widest transition-colors ${userRole === "ADMIN" ? "bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30" : "bg-gray-50 dark:bg-[#222] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-[#444]"}`}
            >
              Role: {userRole}
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-amber-600 dark:text-amber-500">
                Authorization & Market Controls
              </h3>
              <div className="flex gap-1">
                <span className="text-[9px] bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-500/30">
                  @transaction
                </span>
                <span className="text-[9px] bg-rose-50 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-500/30">
                  @check
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateRole("USER")}
                  disabled={isProcessing || userRole === "USER"}
                  className={`flex-1 text-xs py-2 rounded-md font-semibold transition-all ${userRole === "USER" ? "bg-indigo-600 text-white shadow-inner" : "bg-gray-100 dark:bg-[#222] text-gray-500 hover:bg-gray-200 dark:hover:bg-[#333]"}`}
                >
                  USER
                </button>
                <button
                  onClick={() => handleUpdateRole("ADMIN")}
                  disabled={isProcessing || userRole === "ADMIN"}
                  className={`flex-1 text-xs py-2 rounded-md font-semibold transition-all ${userRole === "ADMIN" ? "bg-amber-500 text-white shadow-inner" : "bg-gray-100 dark:bg-[#222] text-gray-500 hover:bg-gray-200 dark:hover:bg-[#333]"}`}
                >
                  ADMIN
                </button>
              </div>

              <button
                onClick={handleMarketMakerTrade}
                disabled={isProcessing}
                className="w-full bg-amber-50 dark:bg-amber-600/20 text-amber-700 dark:text-amber-500 border border-amber-200 dark:border-amber-600/50 font-semibold text-xs px-4 py-3 rounded-md hover:bg-amber-600 hover:text-white transition-colors disabled:opacity-50 uppercase tracking-wider"
              >
                Trigger random market activity
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95 ${isOpen ? "bg-gray-800 dark:bg-[#333] text-white" : "bg-indigo-600 text-white"}`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
