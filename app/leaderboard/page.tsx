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
import MarketPanel from "../../components/MarketPanel";
import { useInspector } from "../../lib/InspectorContext";

import { subscribe } from "@firebase/data-connect";
import { getTopTradersRef } from "@dataconnect/generated";

export default function LeaderboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { logEvent, isOpen, logs } = useInspector();

  useEffect(() => {
    // Subscribe to realtime updates for the global leaderboard ranking top traders by net worth
    const unsubscribe = subscribe(
      getTopTradersRef(),
      (res) => {
        if (res.data) setData(res.data);
        setIsLoading(false);
      },
      (err) => {
        console.error("Leaderboard Realtime Error:", err);
        setIsLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    logEvent("LEADERBOARD_SUB");
  }, [logEvent]);

  if (isLoading && !data)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex justify-center items-center text-indigo-500 font-mono text-sm sm:text-base animate-pulse uppercase tracking-widest">
        Executing Native SQL View...
      </div>
    );

  const leaderboard = data?.topTraders || [];

  return (
    <main
      className={`min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200 font-sans pb-20 relative transition-all duration-300 ${
        isOpen && logs.length > 0 ? "xl:pr-[470px]" : "pr-0"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 pt-6 sm:pt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-10">
        <div className="lg:col-span-3">
          <header className="mb-6 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 border-b border-gray-300 dark:border-[#333] pb-4 sm:pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-1 sm:mb-2">
                Global Rankings
              </h1>
              <p className="text-gray-600 dark:text-gray-500 font-medium text-xs sm:text-sm md:text-base">
                Calculated securely using PostgreSQL.
              </p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md">
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase flex items-center gap-2">
                @view
              </span>
            </div>
          </header>

          <div className="space-y-3 sm:space-y-4">
            {leaderboard.length === 0 && (
              <div className="p-8 sm:p-12 border border-dashed border-gray-300 dark:border-[#333] rounded-2xl text-center bg-white dark:bg-[#111]">
                <p className="text-gray-500 dark:text-gray-500 font-mono text-xs sm:text-sm uppercase">
                  No active wallets.
                </p>
              </div>
            )}

            {leaderboard.map((user: any) => {
              const isFirst = user.rank === 1;
              const bgClass = isFirst
                ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                : "bg-white dark:bg-[#111] border-gray-200 dark:border-[#222] hover:border-gray-300 dark:hover:border-[#444] shadow-sm dark:shadow-none";
              const rankColor = isFirst
                ? "text-amber-600 dark:text-amber-500"
                : user.rank && user.rank < 4
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-600";

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 sm:p-5 md:p-6 border rounded-xl transition-all group ${bgClass}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-2/3">
                    <div
                      className={`w-6 sm:w-8 md:w-12 text-center font-mono text-lg sm:text-2xl md:text-3xl font-extrabold shrink-0 ${rankColor}`}
                    >
                      #{user.rank}
                    </div>
                    <div className="relative shrink-0">
                      {isFirst && (
                        <div className="absolute -top-3 -right-2 sm:-right-3 text-base sm:text-xl z-10">
                          👑
                        </div>
                      )}
                      <img
                        src={
                          user.profileImage ||
                          "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                        }
                        alt="profile"
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 ${isFirst ? "border-amber-400 dark:border-amber-500" : "border-gray-200 dark:border-[#333]"}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white truncate">
                        {user.username}
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest hidden sm:block mt-1 truncate">
                        Ranked via COALESCE()
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-gray-500 dark:text-gray-500 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest mb-0.5 sm:mb-1">
                      Net Worth
                    </p>
                    <p
                      className={`text-base sm:text-xl md:text-2xl font-bold font-mono tracking-tight ${isFirst ? "text-amber-600 dark:text-amber-500" : "text-emerald-600 dark:text-emerald-500"}`}
                    >
                      ${user.netWorth?.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <MarketPanel />
        </div>
      </div>
    </main>
  );
}
