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
import AnimatedNumber from "../../components/AnimatedNumber";
import MarketPanel from "../../components/MarketPanel";
import { useInspector } from "../../lib/InspectorContext";
import { useToast } from "@/lib/ToastContext";
import {
  executeBuyStock,
  executeSellStock,
  executeUpdateLocation,
} from "../../lib/ExchangeService";

// import { subscribe } from "@firebase/data-connect";
// import { getUserProfileRef } from "@dataconnect/generated";

export default function ProfilePage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logEvent, isOpen, logs } = useInspector();
  const [quantities, setQuantities] = useState<Record<string, number | string>>(
    {},
  );

  const [city, setCity] = useState("Las Vegas");
  const [lat, setLat] = useState(36.1699);
  const [lng, setLng] = useState(-115.1398);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  const [isLocationInitialized, setIsLocationInitialized] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { showToast } = useToast();

useEffect(() => {
    // TODO: Subscribe to realtime updates for the authenticated user's profile (getUserProfileRef)
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (data?.user && !isLocationInitialized) {
      setCity(data.user.city || "Las Vegas");
      setLat(data.user.latitude || 36.1699);
      setLng(data.user.longitude || -115.1398);
      setIsLocationInitialized(true);
    }
  }, [data?.user, isLocationInitialized]);

  useEffect(() => {
    logEvent("PROFILE_SUB");
  }, [logEvent]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0a0a0a] flex justify-center items-center text-indigo-600 dark:text-indigo-500 font-mono text-sm sm:text-base animate-pulse uppercase tracking-widest">
        Loading Portfolio...
      </div>
    );

  if (!data?.user)
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0a0a0a] p-4 sm:p-8 text-center text-gray-500 font-mono pt-20">
        USER NOT FOUND
      </div>
    );

  const handleUpdateLocation = async () => {
    setIsUpdatingLocation(true);

    try {
      // Update a user's location
      await executeUpdateLocation(city, lat, lng);
      logEvent("USER_UPDATE_MUTATION", { city, lat, lng });
      showToast("Location updated successfully", "success");
    } catch (error: any) {
      showToast("Update failed: " + error.message, "error");
    } finally {
      setIsUpdatingLocation(false);
    }
  };

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

  const handleGetBrowserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(parseFloat(position.coords.latitude.toFixed(4)));
          setLng(parseFloat(position.coords.longitude.toFixed(4)));
          setCity("Home");
        },
        () =>
          showToast(
            "Location access denied. Please allow location permissions in your browser.",
            "error",
          ),
      );
    } else {
      showToast(
        "Location access denied. Please allow location permissions in your browser.",
        "info",
      );
    }
  };

  const handleBuy = async (stock: any) => {
    const amount = Number(quantities[stock.emoji.id]) || 1;
    setProcessingId(`${stock.emoji.id}-buy`);
    try {
      await executeBuyStock(stock.emoji, amount, false, data.user, logEvent);
      setQuantities((prev) => ({ ...prev, [stock.emoji.id]: 1 }));
    } catch (error: any) {
      showToast("Transaction failed: " + error.message, "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleSell = async (stock: any) => {
    const amount = Number(quantities[stock.emoji.id]) || 1;
    setProcessingId(`${stock.emoji.id}-sell`);
    try {
      await executeSellStock(
        stock.emoji,
        amount,
        stock.shares,
        data.user,
        logEvent,
      );
      setQuantities((prev) => ({ ...prev, [stock.emoji.id]: 1 }));
    } catch (error: any) {
      showToast("Transaction failed: " + error.message, "error");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <main
      className={`min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200 font-sans pb-20 relative transition-all duration-300 ${
        isOpen && logs.length > 0 ? "xl:pr-[470px]" : "pr-0"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 pt-6 sm:pt-12 grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-10">
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none rounded-2xl p-6 sm:p-10 mb-6 sm:mb-8 relative overflow-hidden">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <img
                src={
                  data.user.profileImage ||
                  "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                }
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 dark:border-[#333]"
              />
              <h1 className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-400 truncate">
                {data.user.username}&apos;s Portfolio
              </h1>
            </div>
            <p className="text-gray-500 font-mono text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">
              Available Currency
            </p>

            <p className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tighter truncate">
              <span className="text-xl sm:text-2xl font-medium text-gray-500 tracking-normal mr-1 sm:mr-2">
                $
              </span>
              <AnimatedNumber value={data.user.points} decimals={2} />
            </p>
          </div>

          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none rounded-2xl p-5 sm:p-6 mb-8 sm:mb-12 relative flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex-1 w-full">
              <div className="flex flex-row items-center gap-4 mb-4">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-widest font-mono">
                  My Location
                </h2>
                <button
                  onClick={handleGetBrowserLocation}
                  className="bg-cyan-50 dark:bg-[#222] hover:bg-cyan-100 dark:hover:bg-[#333] border border-cyan-200 dark:border-[#444] text-cyan-700 dark:text-cyan-400 px-3 py-1.5 rounded text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 active:scale-95"
                >
                  <svg
                    className="w-3 h-3 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Detect Location
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-600 dark:text-gray-500 font-mono uppercase tracking-widest">
                    Base City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] text-gray-900 dark:text-white p-2.5 rounded-md font-mono text-sm outline-none focus:border-cyan-500 transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-600 dark:text-gray-500 font-mono uppercase tracking-widest">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                    className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] text-gray-900 dark:text-white p-2.5 rounded-md font-mono text-sm outline-none focus:border-cyan-500 transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-600 dark:text-gray-500 font-mono uppercase tracking-widest">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lng}
                    onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                    className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] text-gray-900 dark:text-white p-2.5 rounded-md font-mono text-sm outline-none focus:border-cyan-500 transition-colors w-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto mt-2 lg:mt-0 pt-2 lg:pt-8">
              <button
                onClick={handleUpdateLocation}
                disabled={isUpdatingLocation}
                className="w-full lg:w-auto bg-cyan-50 dark:bg-[#222] hover:bg-cyan-100 dark:hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-[#333] hover:border-cyan-400 dark:hover:border-cyan-500/50 px-6 py-3 rounded-md font-mono text-xs uppercase tracking-widest font-bold transition-all disabled:opacity-50"
              >
                {isUpdatingLocation ? "Syncing..." : "Update Coordinates"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Owned Emojis
            </h2>
            <span className="text-[9px] sm:text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20 font-mono">
              @auth(level: USER)
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {data.user.stockOwnerships_on_user.length === 0 && (
              <div className="p-8 sm:p-12 border border-dashed border-gray-300 dark:border-[#333] rounded-2xl text-center bg-white dark:bg-[#111]">
                <p className="text-gray-500 font-mono text-xs sm:text-sm uppercase">
                  No assets owned. Visit the market to buy some!
                </p>
              </div>
            )}

            {data.user.stockOwnerships_on_user.map((stock: any) => {
              if (stock.shares === 0) return null;
              const amount = quantities[stock.emoji.id] || 1;
              const positionValue = stock.emoji.currentPrice * stock.shares;

              return (
                <div
                  key={stock.emoji.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 sm:p-6 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl hover:border-gray-400 dark:hover:border-[#444] shadow-sm dark:shadow-none transition-colors gap-4 sm:gap-6 group"
                >
                  <div className="flex justify-between w-full md:w-auto items-start">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-4xl sm:text-5xl">
                        {stock.emoji.symbol}
                      </span>
                      <div>
                        <p className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white truncate">
                          {stock.emoji.name}
                        </p>
                        <p className="text-gray-500 font-mono text-[10px] sm:text-sm mt-0.5 sm:mt-1">
                          {stock.shares} SH @ $
                          {stock.emoji.currentPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right block md:hidden shrink-0 ml-2">
                      <p className="text-gray-600 dark:text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-0.5">
                        Value
                      </p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        ${positionValue.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block text-right md:mr-4 shrink-0">
                    <p className="text-gray-600 dark:text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-0.5">
                      Total Value
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      ${positionValue.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center w-full md:w-auto gap-2 bg-gray-50 dark:bg-[#0a0a0a] p-1.5 rounded-lg border border-gray-300 dark:border-[#333] mt-2 md:mt-0">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={quantities[stock.emoji.id] ?? 1}
                      onChange={(e) =>
                        handleQuantityChange(stock.emoji.id, e.target.value)
                      }
                      onBlur={() => {
                        const currentVal = quantities[stock.emoji.id];
                        if (currentVal === "" || Number(currentVal) < 1) {
                          setQuantities((prev) => ({
                            ...prev,
                            [stock.emoji.id]: 1,
                          }));
                        }
                      }}
                      className="w-14 sm:w-16 bg-transparent text-gray-900 dark:text-white p-2 text-center font-mono text-sm outline-none focus:text-indigo-600 dark:focus:text-indigo-400"
                      disabled={processingId !== null}
                    />
                    <div className="flex gap-2 w-full">
                      <button
                        disabled={processingId !== null}
                        onClick={() => handleBuy(stock)}
                        className="flex-1 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-2 sm:px-4 py-2 rounded-md transition-all font-semibold text-xs sm:text-sm uppercase md:capitalize flex justify-center items-center active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === `${stock.emoji.id}-buy` ? (
                          <svg
                            className="animate-spin h-4 w-4 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          "Buy"
                        )}
                      </button>
                      <button
                        disabled={processingId !== null}
                        onClick={() => handleSell(stock)}
                        className="flex-1 bg-rose-50 dark:bg-rose-600/20 text-rose-600 dark:text-rose-500 hover:bg-rose-600 hover:text-white px-2 sm:px-4 py-2 rounded-md transition-all font-semibold text-xs sm:text-sm uppercase md:capitalize border flex justify-center items-center border-rose-200 dark:border-rose-500/30 hover:border-transparent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === `${stock.emoji.id}-sell` ? (
                          <svg
                            className="animate-spin h-4 w-4 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          "Sell"
                        )}
                      </button>
                    </div>
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
