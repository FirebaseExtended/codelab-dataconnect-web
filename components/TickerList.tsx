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
import { Fragment } from "react";

interface TickerListProps {
  feed?: any[];
}

export default function TickerList({ feed }: TickerListProps) {
  if (!feed || feed.length === 0) return null;

  return (
    <div className="flex items-center gap-10 px-5 w-max">
      {feed.map((item, index) => (
        <Fragment key={`ticker-item-${index}`}>
          {item.type === "PRICE" && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl">{item.symbol}</span>
              <span className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                {item.name}
              </span>
              <span className="font-mono text-gray-900 dark:text-gray-100 text-sm ml-2">
                ${item.currentPrice.toFixed(2)}
              </span>
              <span
                className={`font-mono text-xs ${item.trend >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
              >
                {item.trend >= 0 ? "▲" : "▼"}
                {Math.abs(item.trend).toFixed(2)}
              </span>
            </div>
          )}
          {item.type === "NEWS" && (
            <div
              className={`flex items-center gap-3 shrink-0 px-4 py-1.5 rounded border ${
                item.description.includes("MARKET CRASH")
                  ? "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30"
                  : "bg-fuchsia-50 dark:bg-fuchsia-500/10 border-fuchsia-200 dark:border-fuchsia-500/30"
              }`}
            >
              <span className="text-xl">{item.symbol}</span>
              <span
                className={`font-bold text-sm uppercase tracking-wide flex items-center gap-2 ${
                  item.description.includes("MARKET CRASH")
                    ? "text-rose-600 dark:text-rose-500"
                    : "text-fuchsia-600 dark:text-fuchsia-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    item.description.includes("MARKET CRASH")
                      ? "bg-rose-500"
                      : "bg-fuchsia-500"
                  }`}
                ></span>
                {item.description.includes("MARKET CRASH")
                  ? "CRASH ALERT"
                  : "BREAKING NEWS"}
              </span>
              <span className="font-mono text-gray-800 dark:text-gray-200 text-xs tracking-wide">
                {item.description
                  .replace("GEMINI REPORT:", "")
                  .replace("MARKET CRASH:", "")}
              </span>
            </div>
          )}

          <span className="text-gray-300 dark:text-gray-600 font-black">|</span>
        </Fragment>
      ))}
    </div>
  );
}
