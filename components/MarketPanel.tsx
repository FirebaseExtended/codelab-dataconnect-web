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
import { ResponsiveContainer, AreaChart, Area, YAxis } from "recharts";
import { motion } from "framer-motion";
import AnimatedNumber from "../components/AnimatedNumber";

import { subscribe } from "@firebase/data-connect";
import {
  getDashboardDataRef,
  getEmojiSparklinesRef,
} from "@dataconnect/generated";

const EmojiCard = ({
  emoji,
  index,
  chartData,
}: {
  emoji: any;
  index: number;
  chartData: any[];
}) => {
  const isUp = emoji.trend >= 0;
  const strokeColor = isUp ? "#10b981" : "#f43f5e";

  const displayData =
    chartData.length > 0
      ? chartData
      : [{ name: "Now", price: emoji.currentPrice }];

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
      className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none rounded-xl p-3 sm:p-4 overflow-hidden relative flex flex-col w-full group shrink-0"
    >
      <div className="flex justify-between items-start mb-4 z-10 relative">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 pr-2">
          <div className="text-xl sm:text-2xl shrink-0">{emoji.symbol}</div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                {emoji.name}
              </h3>
              <span className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-600 shrink-0">
                #{index + 1}
              </span>
            </div>
            <div className="mt-0.5 sm:mt-1">
              <span
                className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-gray-50 dark:bg-[#0a0a0a] border ${
                  isUp
                    ? "border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(emoji.trend).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            <AnimatedNumber
              value={emoji.currentPrice}
              decimals={2}
              prefix="$"
            />
          </p>
        </div>
      </div>

      <div className="h-12 sm:h-16 -mx-3 sm:-mx-4 -mb-3 sm:-mb-4 mt-auto relative z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData}>
            <YAxis domain={["dataMin", "dataMax"]} hide />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fill={strokeColor}
              fillOpacity={0.05}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default function MarketPanel() {
  const [data, setData] = useState<any>(null);
  const [sparklineRawData, setSparklineRawData] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to realtime updates for the main market dashboard data including top emojis and recent events
    const unsub = subscribe(
      getDashboardDataRef(),
      (res) => {
        if (res.data) setData(res.data);
      },
      (err) => console.error("Market Panel Realtime Error:", err),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    // Subscribe to realtime price history updates to render emoji sparkline charts
    const unsub = subscribe(
      getEmojiSparklinesRef(),
      (res) => {
        if (res.data?.emojiSparklines) {
          setSparklineRawData(res.data.emojiSparklines);
        }
      },
      (err) => console.error("Global Sparklines Error:", err),
    );
    return () => unsub();
  }, []);

  const groupedSparklines = useMemo(() => {
    const map: Record<string, any[]> = {};
    sparklineRawData.forEach((pt: any) => {
      if (!map[pt.emojiId]) {
        map[pt.emojiId] = [];
      }
      map[pt.emojiId].push({
        name: new Date(pt.recordedAt).toLocaleTimeString(),
        price: pt.price,
      });
    });
    return map;
  }, [sparklineRawData]);

  if (!data)
    return (
      <div className="text-gray-500 dark:text-gray-500 font-mono text-sm animate-pulse">
        Syncing...
      </div>
    );

  return (
    <aside className="w-full flex flex-col gap-3 sm:gap-4 sticky top-24">
      <div className="flex items-center justify-between border-b border-gray-300 dark:border-[#333] pb-2 shrink-0">
        <h2 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest font-mono">
          Live Market
        </h2>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 relative overflow-y-auto max-h-[calc(100vh-180px)] pr-2 pb-6 custom-scrollbar">
        {data.emojis.map((emoji: any, index: number) => (
          <EmojiCard
            key={emoji.id}
            emoji={emoji}
            index={index}
            chartData={groupedSparklines[emoji.id] || []}
          />
        ))}
      </div>
    </aside>
  );
}
