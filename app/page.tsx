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
import { motion } from "framer-motion";
import { useAuth } from "../lib/AuthContext";
import { useInspector } from "../lib/InspectorContext";
import EmojiModal from "../components/EmojiModal";
import TickerList from "../components/TickerList";
import { useToast } from "@/lib/ToastContext";
import { executeBuyStock, executeSellStock } from "../lib/ExchangeService";

import { subscribe } from "@firebase/data-connect";
import {
  getDashboardDataRef,
  searchEmojisRef,
  // vectorSearchEmojisRef,
  getChronologicalTickerRef,
  getUserProfileRef,
} from "@dataconnect/generated";

export default function Home() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const [tickerData, setTickerData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const [searchData, setSearchData] = useState<any[] | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<"TEXT" | "VECTOR">("TEXT");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [flashKeyword, setFlashKeyword] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number | string>>(
    {},
  );
  const [selectedEmoji, setSelectedEmoji] = useState<any | null>(null);

  const [processingId, setProcessingId] = useState<string | null>(null);

  const { user, loading } = useAuth();
  const { logEvent, isOpen, logs } = useInspector();
  const { showToast } = useToast();

  useEffect(() => {
    // Subscribe to realtime updates for the main market dashboard data including top emojis and recent events
    const unsubscribe = subscribe(
      getDashboardDataRef(),
      (res) => {
        if (res.data) setDashboardData(res.data);
        setIsDashboardLoading(false);
      },
      (err) => {
        console.error("Dashboard Realtime Error:", err);
        setIsDashboardLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    // Subscribe to a realtime chronological ticker feed combining recent price updates and major news events
    const unsubscribe = subscribe(
      getChronologicalTickerRef(),
      (res) => {
        if (res.data) setTickerData(res.data);
      },
      (err) => console.error("Ticker Realtime Error:", err),
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || !user) return;
    // Subscribe to realtime updates for the authenticated user's profile and stock ownership
    const unsubscribe = subscribe(
      getUserProfileRef(),
      (res) => {
        if (res.data) setProfileData(res.data);
      },
      (err) => console.error("Profile Error:", err),
    );
    return () => unsubscribe();
  }, [user, loading]);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchData(null);
      return;
    }
    
    // Subscribe to realtime full-text search results for emojis based on user input
    const unsubscribe = subscribe(
      searchEmojisRef({ query: debouncedSearch }),
      (res) => {
        if (res.data) setSearchData(res.data.emojis_search);
        setIsSearchLoading(false);
      },
      (err) => {
        console.error("Text Search Error:", err);
        setIsSearchLoading(false);
      },
    );

    return () => unsubscribe();
  }, [debouncedSearch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm) {
        logEvent(searchMode === "TEXT" ? "TEXT_SEARCH" : "VECTOR_SEARCH", {
          searchTerm,
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, searchMode, logEvent]);

  useEffect(() => {
    const keywords = ["food", "animal", "face", "nature", "sports", "tech"];
    setFlashKeyword(keywords[Math.floor(Math.random() * keywords.length)]);
    logEvent("DASHBOARD_SUB");
    logEvent("TICKER_SUB");
  }, [logEvent]);

  const sortedEvents = useMemo(() => {
    if (!dashboardData?.events) return [];
    return [...dashboardData.events].sort((a: any, b: any) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }, [dashboardData]);

  const sortedTicker = useMemo(() => {
    if (!tickerData?.tickerFeeds) return [];
    return [...tickerData.tickerFeeds].sort((a: any, b: any) => {
      const timeA = a.eventTime ? new Date(a.eventTime).getTime() : 0;
      const timeB = b.eventTime ? new Date(b.eventTime).getTime() : 0;
      return timeB - timeA;
    });
  }, [tickerData]);

  const ownedSharesMap = useMemo(() => {
    const map: Record<string, number> = {};
    if (profileData?.user?.stockOwnerships_on_user) {
      profileData.user.stockOwnerships_on_user.forEach((stock: any) => {
        map[stock.emoji.id] = stock.shares;
      });
    }
    return map;
  }, [profileData]);

  const handleQuantityChange = (id: string, value: string) => {
    if (value === "") {
      setQuantities((prev) => ({ ...prev, [id]: "" }));
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      setQuantities((prev) => ({
        ...prev,
        [id]: Math.min(100, parsed),
      }));
    }
  };

  const handleBuy = async (emoji: any, isDiscounted: boolean) => {
    const amount = Number(quantities[emoji.id]) || 1;
    setProcessingId(`${emoji.id}-buy`);
    try {
      await executeBuyStock(emoji, amount, isDiscounted, user, logEvent);
      setQuantities((prev) => ({ ...prev, [emoji.id]: 1 }));
    } catch (error: any) {
      showToast(error.message || "Transaction denied.", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleSell = async (emoji: any) => {
    const amount = Number(quantities[emoji.id]) || 1;
    const ownedShares = ownedSharesMap[emoji.id] || 0;
    setProcessingId(`${emoji.id}-sell`);
    try {
      await executeSellStock(emoji, amount, ownedShares, user, logEvent);
      setQuantities((prev) => ({ ...prev, [emoji.id]: 1 }));
    } catch (error: any) {
      showToast(error.message || "Transaction denied.", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const isSearching = debouncedSearch.trim() !== "";
  const displayedEmojis = isSearching ? searchData : dashboardData?.emojis;
  const formatCompactCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);

  const formatCompactNumber = (num: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);

  if (isDashboardLoading && !dashboardData)
    return (
      <div className="min-h-screen flex justify-center items-center font-mono text-sm uppercase tracking-widest text-indigo-500">
        Syncing Realtime Market...
      </div>
    );

  return (
    <main
      className={`min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-200 font-sans pb-6 md:pb-24 relative transition-all duration-300 ${
        isOpen && logs.length > 0 ? "xl:pr-[470px]" : "pr-0"
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } } .animate-marquee { display: flex; width: max-content; animation: marquee 240s linear infinite; } .animate-marquee:hover { animation-play-state: paused; }`,
        }}
      />

      <EmojiModal
        emoji={selectedEmoji}
        onClose={() => setSelectedEmoji(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 flex flex-col gap-6">
            <div>
              {flashKeyword && (
                <div className="bg-fuchsia-50 dark:bg-[#111] border border-fuchsia-200 dark:border-fuchsia-500/50 text-fuchsia-700 dark:text-fuchsia-400 p-4 rounded-md mb-4 sm:mb-6 font-mono text-[10px] sm:text-sm uppercase tracking-widest shadow-sm">
                  NETWORK EVENT: Locate assets tagged "{flashKeyword}" for 50%
                  discount.
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder={`Query database via ${searchMode == "TEXT" ? "full-text search" : "semantic vector search"}...`}
                  className="flex-1 w-full bg-white dark:bg-[#111] border border-gray-300 dark:border-[#333] text-gray-900 dark:text-white p-4 sm:p-5 rounded-md text-base sm:text-lg focus:border-indigo-500 outline-none transition-all font-mono placeholder-gray-400 dark:placeholder-gray-600 shadow-sm"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value.trim() !== "") setIsSearchLoading(true);
                    else {
                      setIsSearchLoading(false);
                      setSearchData(null);
                    }
                  }}
                />

                <div className="flex bg-gray-200 dark:bg-[#222] p-1.5 rounded-lg shrink-0 border border-gray-300 dark:border-[#333] w-full md:w-auto">
                  <button
                    onClick={() => {
                      setSearchMode("TEXT");
                      if (searchTerm) setIsSearchLoading(true);
                    }}
                    className={`flex-1 md:flex-none px-3 py-3 sm:px-4 rounded-md font-mono text-xs sm:text-sm uppercase tracking-wider transition-all ${
                      searchMode === "TEXT"
                        ? "bg-white dark:bg-[#0a0a0a] text-indigo-600 dark:text-indigo-400 shadow-sm font-bold"
                        : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    TEXT
                  </button>
                  <button
                    onClick={() => {
                      setSearchMode("VECTOR");
                      if (searchTerm) setIsSearchLoading(true);
                    }}
                    className={`flex-1 md:flex-none px-3 py-3 sm:px-4 rounded-md font-mono text-xs sm:text-sm uppercase tracking-wider transition-all ${
                      searchMode === "VECTOR"
                        ? "bg-white dark:bg-[#0a0a0a] text-fuchsia-600 dark:text-fuchsia-400 shadow-sm font-bold"
                        : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    VECTOR
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start content-start">
              {isSearchLoading ? (
                <div className="col-span-1 sm:col-span-2 p-12 text-center text-indigo-500 font-mono animate-pulse text-sm">
                  {searchMode === "TEXT"
                    ? "Querying Database..."
                    : "Generating Embeddings via Vertex AI..."}
                </div>
              ) : (
                displayedEmojis?.map((emoji: any) => {
                  const isDiscounted =
                    emoji?.description?.toLowerCase().includes(flashKeyword) ||
                    emoji?.name?.toLowerCase().includes(flashKeyword);
                  const displayPrice = isDiscounted
                    ? emoji?.currentPrice * 0.5
                    : emoji?.currentPrice;
                  const isUp = emoji.trend >= 0;
                  const ownedShares = ownedSharesMap[emoji.id] || 0;
                  const canSell = user && ownedShares > 0;

                  return (
                    <motion.div
                      layout
                      key={emoji.id}
                      className={`bg-white dark:bg-[#111] border rounded-2xl p-5 sm:p-6 relative flex flex-col w-full transition-colors cursor-pointer shadow-sm dark:shadow-none group ${
                        isDiscounted
                          ? "border-fuchsia-400 dark:border-fuchsia-500/50"
                          : "border-gray-200 dark:border-[#222]"
                      }`}
                    >
                      <div
                        onClick={() => setSelectedEmoji(emoji)}
                        className="flex justify-between items-start mb-6 gap-2"
                      >
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 mr-2">
                          <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform shrink-0 mt-1">
                            {emoji.symbol}
                          </div>
                          <div className="min-w-0 flex-1 flex flex-col items-start">
                            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200 truncate w-full">
                              {emoji.name}
                            </h2>

                            <div className="mt-1 max-w-full">
                              <span
                                className={`inline-block text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 bg-gray-50 dark:bg-[#0a0a0a] border rounded-sm max-w-full truncate ${
                                  isUp
                                    ? "border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                    : "border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400"
                                }`}
                                title={`${isUp ? "+" : "-"}${Math.abs(emoji.trend).toLocaleString()}`}
                              >
                                {isUp ? "▲" : "▼"}{" "}
                                {formatCompactNumber(Math.abs(emoji.trend))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2 flex flex-col items-end max-w-[45%] min-w-0">
                          {isDiscounted ? (
                            <>
                              <span className="text-gray-400 dark:text-gray-600 line-through text-[10px] block truncate w-full">
                                {formatCompactCurrency(emoji.currentPrice)}
                              </span>
                              <span className="text-base sm:text-lg font-bold text-fuchsia-600 dark:text-fuchsia-400 truncate w-full">
                                {formatCompactCurrency(displayPrice)}
                              </span>
                            </>
                          ) : (
                            <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-200 truncate w-full">
                              {formatCompactCurrency(displayPrice)}
                            </p>
                          )}
                          {user && (
                            <p className="text-[9px] sm:text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest w-full">
                              Own:{" "}
                              <span
                                className={
                                  ownedShares > 0
                                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                                    : "text-gray-400"
                                }
                              >
                                {formatCompactNumber(ownedShares)}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex gap-2 sm:gap-3 z-10 w-full">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={quantities[emoji.id] ?? 1}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            handleQuantityChange(emoji.id, e.target.value)
                          }
                          onBlur={() => {
                            const currentVal = quantities[emoji.id];
                            if (currentVal === "" || Number(currentVal) < 1) {
                              setQuantities((prev) => ({
                                ...prev,
                                [emoji.id]: 1,
                              }));
                            }
                          }}
                          className="w-14 sm:w-16 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] text-gray-900 dark:text-white rounded-md text-center font-mono text-sm outline-none focus:border-indigo-500 disabled:opacity-50"
                          disabled={!user || processingId !== null}
                        />
                        <div className="flex flex-1 gap-2">
                          <button
                            disabled={!user || processingId !== null}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuy(emoji, isDiscounted);
                            }}
                            className={`flex-1 font-semibold px-1 py-2 sm:px-2 rounded-md transition-all uppercase text-[10px] sm:text-xs flex justify-center items-center ${user ? "bg-gray-900 text-white dark:bg-white dark:text-black" : "bg-gray-200 text-gray-400 dark:bg-[#222]"} disabled:opacity-50`}
                          >
                            Buy
                          </button>
                          <button
                            disabled={!canSell || processingId !== null}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSell(emoji);
                            }}
                            className={`flex-1 font-semibold px-1 py-2 sm:px-2 rounded-md transition-all uppercase text-[10px] sm:text-xs border flex justify-center items-center ${
                              canSell
                                ? "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-600/20 dark:text-rose-500 dark:border-rose-500/30 hover:border-transparent"
                                : "bg-gray-50 text-gray-400 border-gray-200 dark:bg-[#1a1a1a] dark:border-[#333]"
                            } disabled:opacity-50`}
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </section>

          <section className="space-y-6 flex flex-col mt-6 lg:mt-0">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] p-5 sm:p-6 rounded-2xl max-h-[600px] lg:max-h-[800px] lg:sticky lg:top-24 overflow-y-auto shadow-sm">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-300 mb-4 font-mono uppercase tracking-widest">
                Market Activity
              </h2>
              <div className="space-y-3">
                {sortedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-3 items-start p-2 sm:p-3 rounded-md hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition"
                  >
                    <div className="text-xl sm:text-2xl mt-0.5">
                      {event.emoji.symbol}
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-300 truncate max-w-[100px] sm:max-w-none">
                          {event.user.username}
                        </p>
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-gray-50 dark:bg-[#0a0a0a] border ${
                            event.impact >= 0
                              ? "border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                              : "border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {event.impact > 0 ? "+" : ""}
                          {event.impact.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-500 leading-tight">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="hidden md:flex fixed bottom-0 left-0 w-full bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-[#333] h-12 items-center overflow-hidden z-40">
        <div className="animate-marquee">
          <TickerList feed={sortedTicker} />
          <TickerList feed={sortedTicker} />
        </div>
      </div>
    </main>
  );
}
