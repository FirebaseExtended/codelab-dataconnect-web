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
import { useToast } from "@/lib/ToastContext";
import { executeUpdateLocation } from "../lib/ExchangeService";

import { subscribe } from "@firebase/data-connect";
import { getTrendingEmojisNearMeRef } from "@dataconnect/generated";

export default function LocalRadar() {
  const { user } = useAuth();

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [isScanning, setIsScanning] = useState(false);
  const [localData, setLocalData] = useState<any>(null);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!location) return;
    setIsLoadingTrends(true);
    // TODO: Subscribe to realtime updates for trending emojis within a 50km radius (getTrendingEmojisNearMeRef)
    setIsLoadingTrends(false);
  }, [location?.lat, location?.lng]);

  const handleScanNetwork = () => {
    setIsScanning(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            // Update the user's current geographic location in the database
            await executeUpdateLocation("Current Location", lat, lng);
            setLocation({ lat, lng });
          } catch (e) {
            console.error("Failed to sync location:", e);
          } finally {
            setIsScanning(false);
          }
        },
        (error) => {
          showToast("Location access denied. Cannot use radar.", "error");
          setIsScanning(false);
        },
      );
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#111] border border-[#222] p-6 rounded-2xl flex flex-col mb-6 relative overflow-hidden">
      {isScanning && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-32 h-32 rounded-full border-2 border-emerald-500 animate-ping absolute"></div>
          <div
            className="w-64 h-64 rounded-full border border-emerald-500/50 animate-ping absolute"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      )}

      <div className="z-10 relative">
        <h2 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2 uppercase tracking-widest font-mono">
          📍 Geo-Radar (PostGIS)
        </h2>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">
          Queries users within a 50km radius using native{" "}
          <code className="text-indigo-400">ST_DWithin</code>.
        </p>

        {!location ? (
          <button
            onClick={handleScanNetwork}
            disabled={isScanning}
            className="w-full bg-[#222] hover:bg-[#333] border border-[#444] text-emerald-400 text-sm font-mono uppercase tracking-wider py-3 rounded-md transition-colors"
          >
            {isScanning ? "Scanning Satellites..." : "Scan Local Network"}
          </button>
        ) : (
          <div className="space-y-3 mt-4">
            <div className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase mb-2">
              Signal Acquired: {location.lat.toFixed(4)},{" "}
              {location.lng.toFixed(4)}
            </div>

            {isLoadingTrends && !localData ? (
              <div className="text-gray-500 font-mono text-sm animate-pulse">
                Calculating Vectors...
              </div>
            ) : localData?.regionalTrends?.length === 0 ? (
              <div className="text-gray-500 font-mono text-xs">
                No local trades detected in radius.
              </div>
            ) : (
              localData?.regionalTrends?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded bg-[#0a0a0a] border border-[#222]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.symbol}</span>
                    <span className="text-xs font-bold text-gray-200 uppercase">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-emerald-400 font-mono">
                      {item.regional_shares} Shares
                    </div>
                    <div className="text-[10px] text-gray-600 font-mono">
                      {item.regional_holders} Holders
                    </div>
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => {
                setLocation(null);
                setLocalData(null);
              }}
              className="text-xs text-gray-500 hover:text-white mt-2 underline transition-colors"
            >
              Reset Radar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
