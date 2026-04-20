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
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  Area,
  Line,
  Tooltip,
  ComposedChart,
} from "recharts";
import { useInspector } from "../lib/InspectorContext";

// import { subscribe } from "@firebase/data-connect";
// import {
//   getEmojiHistoryStatsRef,
//   getEmojiWhaleStatsRef,
// } from "@dataconnect/generated";

interface EmojiModalProps {
  emoji: any | null;
  onClose: () => void;
}

export default function EmojiModal({ emoji, onClose }: EmojiModalProps) {
  const { logEvent } = useInspector();

  const [statsData, setStatsData] = useState<any>(null);
  const [whaleData, setWhaleData] = useState<any>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!emoji?.id) return;
    setStatsLoading(true);
    // TODO: Subscribe to realtime historical price and moving average statistics (getEmojiHistoryStatsRef)
    setStatsLoading(false);
  }, [emoji?.id]);

  useEffect(() => {
    // TODO: Subscribe to realtime whale statistics to identify top shareholders (getEmojiWhaleStatsRef)
  }, []);

  useEffect(() => {
    if (emoji) {
      logEvent("EMOJI_HISTORY_SUB", { symbol: emoji.symbol });
    }
  }, [emoji, logEvent]);

  const chartData = useMemo(() => {
    if (!statsData?.emojiHistoryStats) return [];
    return statsData.emojiHistoryStats.map((pt: any, i: number) => ({
      name: i,
      price: pt.price,
      movingAverage: pt.movingAverage,
    }));
  }, [statsData]);

  const currentWhale = whaleData?.emojiWhaleStats.find(
    (w: any) => w.emojiId === emoji?.id,
  );

  if (!emoji) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-2xl shadow-2xl w-full max-w-3xl relative z-10 flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#222] flex justify-between items-center bg-white dark:bg-[#111] sticky top-0 z-20">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-5xl">{emoji.symbol}</span>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">
                  {emoji.name}
                </h2>
                <div className="flex gap-2 mt-0.5 sm:mt-1">
                  <span className="text-[10px] sm:text-xs font-mono text-gray-500 bg-gray-100 dark:bg-black px-1.5 sm:px-2 py-0.5 rounded border border-gray-200 dark:border-[#333]">
                    ID: {emoji.id.split("-")[0]}...
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ml-2"
            >
              ✕
            </button>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
                <div className="min-w-0 flex-1 w-full">
                  <p className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">
                    Current Price
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white break-all leading-tight">
                    $
                    {emoji.currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-gray-700 dark:text-gray-300 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="w-2 sm:w-3 h-0.5 bg-indigo-500"></div> Raw
                    Price
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 sm:w-3 h-0.5 bg-fuchsia-500"></div>{" "}
                    5-Tick Avg
                  </div>
                </div>
              </div>

              <div className="h-48 sm:h-64 w-full bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-xl p-2 sm:p-4">
                {statsLoading ? (
                  <div className="h-full w-full flex items-center justify-center text-indigo-500 font-mono text-xs sm:text-sm animate-pulse">
                    Executing SQL View...
                  </div>
                ) : chartData.length === 0 ? (
                  <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-600 font-mono text-[10px] sm:text-xs">
                    No trade history recorded.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#000",
                          borderColor: "#333",
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                        itemStyle={{ color: "#fff" }}
                        labelStyle={{ display: "none" }}
                      />
                      <Area
                        type="stepAfter"
                        dataKey="price"
                        stroke="#6366f1"
                        strokeWidth={2}
                        fill="#6366f1"
                        fillOpacity={0.1}
                      />
                      <Line
                        type="monotone"
                        dataKey="movingAverage"
                        stroke="#d946ef"
                        strokeWidth={2}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 sm:p-5 h-full flex flex-col">
                <h3 className="text-[10px] sm:text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
                  Largest Holder
                </h3>

                {currentWhale ? (
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <img
                      src={
                        currentWhale.whaleProfileImage ||
                        "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                      }
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 dark:border-amber-500/50 mb-3 sm:mb-4 self-center object-cover shrink-0"
                      alt="Whale"
                    />
                    <p className="text-center font-bold text-base sm:text-lg text-gray-900 dark:text-white truncate px-2 w-full">
                      {currentWhale.whaleUsername}
                    </p>

                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-start border-b border-amber-200 dark:border-amber-500/10 pb-2 gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-mono shrink-0 mt-0.5">
                          Holding
                        </span>
                        <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-bold font-mono break-all text-right leading-tight">
                          {Number(currentWhale.whaleShares).toLocaleString()} SH
                        </span>
                      </div>
                      <div className="flex justify-between items-start border-b border-amber-200 dark:border-amber-500/10 pb-2 gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-mono shrink-0 mt-0.5">
                          Total Supply
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono break-all text-right leading-tight">
                          {Number(currentWhale.totalSupply).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1 gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-500 font-mono shrink-0">
                          Control
                        </span>
                        <span className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 font-bold font-mono break-all text-right leading-tight">
                          {currentWhale.whalePercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center py-4">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-mono">
                      Awaiting initial distribution.
                      <br />
                      No major holders detected.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
