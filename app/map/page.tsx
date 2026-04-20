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
import { Map, Overlay } from "pigeon-maps";
import { useTheme } from "next-themes";
import { useInspector } from "../../lib/InspectorContext";
import { useToast } from "@/lib/ToastContext";

import { subscribe } from "@firebase/data-connect";
import {
  getTopEmojisByCityRef,
  getTrendingEmojisNearMeRef,
  getUserProfileRef,
} from "@dataconnect/generated";

export default function InsightsPage() {
  const { logEvent, isOpen, logs } = useInspector();
  const { resolvedTheme } = useTheme();

  const [profileData, setProfileData] = useState<any>(null);
  const [cityData, setCityData] = useState<any>(null);
  const [radarData, setRadarData] = useState<any>(null);
  const [radarLoading, setRadarLoading] = useState(true);

  const tacticalProvider = (x: number, y: number, z: number) => {
    const mapStyle = resolvedTheme === "dark" ? "dark_all" : "light_all";
    return `https://cartodb-basemaps-a.global.ssl.fastly.net/${mapStyle}/${z}/${x}/${y}.png`;
  };

  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
    name: "Awaiting Uplink...",
  });
  const [radiusKm, setRadiusKm] = useState(50);
  const [isUsingDevice, setIsUsingDevice] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Subscribe to realtime updates for the authenticated user's profile and stock ownership
    const unsub = subscribe(getUserProfileRef(), (res) => {
      if (res.data) setProfileData(res.data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Subscribe to realtime updates for top trending emojis partitioned by user city
    const unsub = subscribe(getTopEmojisByCityRef(), (res) => {
      if (res.data) setCityData(res.data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setRadarLoading(true);
    // Subscribe to realtime updates for trending emojis within a specified geographic radius
    const unsub = subscribe(
      getTrendingEmojisNearMeRef({
        userLat: coords.lat,
        userLng: coords.lng,
        radiusMeters: radiusKm * 1000,
      }),
      (res) => {
        if (res.data) setRadarData(res.data);
        setRadarLoading(false);
      },
    );
    return () => unsub();
  }, [coords.lat, coords.lng, radiusKm]);

  useEffect(() => {
    const radarLat = coords.lat !== 0 ? coords.lat.toFixed(4) : "36.1699";
    const radarLng = coords.lng !== 0 ? coords.lng.toFixed(4) : "-115.1398";

    const timer = setTimeout(() => {
      logEvent("GEO_TRENDS_SUB", { radarLng, radarLat, radiusKm });
    }, 300);

    return () => clearTimeout(timer);
  }, [logEvent, coords.lat, coords.lng, radiusKm]);

  useEffect(() => {
    if (profileData?.user && !isUsingDevice && coords.lat === 0) {
      setCoords({
        lat: profileData.user.latitude || 36.1699,
        lng: profileData.user.longitude || -115.1398,
        name: profileData.user.city
          ? `${profileData.user.city} (Base)`
          : "Default Coordinates",
      });
    }
  }, [profileData, isUsingDevice, coords.lat]);

  const engageLiveUplink = () => {
    if ("geolocation" in navigator) {
      setCoords((prev) => ({ ...prev, name: "Acquiring Satellites..." }));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: "Live Device Location",
          });
          setIsUsingDevice(true);

          logEvent("GEO_RADAR_SCAN", {
            radarLng: position.coords.longitude.toFixed(4),
            radarLat: position.coords.latitude.toFixed(4),
            radiusKm,
          });
        },
        () =>
          showToast(
            "Geolocation failed. Please allow location access in your browser.",
            "error",
          ),
      );
    }
  };

  const resetToProfile = () => {
    if (profileData?.user) {
      setIsUsingDevice(false);
      setCoords({
        lat: profileData.user.latitude || 36.1699,
        lng: profileData.user.longitude || -115.1398,
        name: `${profileData.user.city || "Las Vegas"} (Profile Base)`,
      });
    }
  };

  const cityTrends = cityData?.cityTrends || [];
  const regionalTrends = radarData?.regionalTrends || [];

  return (
    <main
      className={`min-h-screen bg-gray-100 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200 font-sans pb-20 relative overflow-hidden transition-all duration-300 ${
        isOpen && logs.length > 0 ? "xl:pr-[470px]" : "pr-0"
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes radar-sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } .radar-sweep { background: conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 0.4) 100%); animation: radar-sweep 4s linear infinite; } .pigeon-overlays { z-index: 10 !important; }`,
        }}
      />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 pt-4 sm:pt-12 relative z-10">
        <div className="space-y-6 sm:space-y-8 w-full">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 border-b border-gray-300 dark:border-[#333] pb-4 sm:pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-1 sm:mb-2">
                Geo
              </h1>
              <p className="text-gray-600 dark:text-gray-500 font-medium text-xs sm:text-sm md:text-base">
                Geographic emoji tracking using PostGIS.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none rounded-2xl p-4 flex flex-col w-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Local Radar Scanner
                  </h2>
                  <p className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px] sm:text-xs mt-1 truncate max-w-[200px] sm:max-w-none">
                    {coords.name}
                  </p>
                </div>
                <span className="text-[8px] sm:text-[9px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20 font-mono uppercase tracking-widest shrink-0 ml-2">
                  ST_DWithin
                </span>
              </div>

              <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto aspect-square bg-gray-50 dark:bg-[#050505] rounded-full border border-gray-200 dark:border-[#333] overflow-hidden flex items-center justify-center mb-4 shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                <div
                  className="absolute rounded-full border border-cyan-400/40 dark:border-cyan-900/40"
                  style={{
                    width: `${(radiusKm / 100) * 100}%`,
                    height: `${(radiusKm / 100) * 100}%`,
                  }}
                ></div>
                <div
                  className="absolute rounded-full border border-cyan-500/60 dark:border-cyan-800/60"
                  style={{
                    width: `${(radiusKm / 100) * 66}%`,
                    height: `${(radiusKm / 100) * 66}%`,
                  }}
                ></div>
                <div
                  className="absolute rounded-full border border-cyan-600/80 dark:border-cyan-500/80 shadow-[0_0_30px_rgba(6,182,212,0.1)] dark:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                  style={{
                    width: `${(radiusKm / 100) * 33}%`,
                    height: `${(radiusKm / 100) * 33}%`,
                  }}
                ></div>
                <div className="absolute inset-0 rounded-full radar-sweep mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-50"></div>
                <div className="absolute w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4] dark:shadow-[0_0_10px_#22d3ee]"></div>

                {!radarLoading &&
                  regionalTrends.slice(0, 5).map((trend: any, i: number) => {
                    const angle =
                      i *
                      (360 / Math.min(regionalTrends.length, 5)) *
                      (Math.PI / 180);
                    const distance = 60 + (i % 2 === 0 ? 20 : -15);
                    return (
                      <div
                        key={`radar-${trend.symbol}`}
                        className="absolute text-xl sm:text-2xl drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] dark:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500"
                        style={{
                          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                        }}
                      >
                        {trend.symbol}
                      </div>
                    );
                  })}
              </div>

              <div className="space-y-3 mt-auto border-t border-gray-200 dark:border-[#333] pt-3 sm:pt-4">
                <div className="flex flex-row gap-2">
                  <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] rounded border border-gray-300 dark:border-[#333] p-1.5 flex items-center focus-within:border-cyan-500 transition-colors">
                    <span className="text-gray-500 text-[10px] font-mono mr-2">
                      LAT
                    </span>
                    <input
                      type="number"
                      value={coords.lat}
                      onChange={(e) =>
                        setCoords({
                          ...coords,
                          lat: parseFloat(e.target.value) || 0,
                          name: "Manual Override",
                        })
                      }
                      className="bg-transparent text-gray-900 dark:text-white font-mono text-xs w-full outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-[#0a0a0a] rounded border border-gray-300 dark:border-[#333] p-1.5 flex items-center focus-within:border-cyan-500 transition-colors">
                    <span className="text-gray-500 text-[10px] font-mono mr-2">
                      LNG
                    </span>
                    <input
                      type="number"
                      value={coords.lng}
                      onChange={(e) =>
                        setCoords({
                          ...coords,
                          lng: parseFloat(e.target.value) || 0,
                          name: "Manual Override",
                        })
                      }
                      className="bg-transparent text-gray-900 dark:text-white font-mono text-xs w-full outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <button
                    onClick={resetToProfile}
                    className="flex-1 py-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest rounded border transition-colors bg-gray-100 dark:bg-[#111] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#333] hover:border-cyan-500 hover:text-cyan-700"
                  >
                    Profile Base
                  </button>
                  <button
                    onClick={engageLiveUplink}
                    className="flex-1 py-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest rounded border transition-colors bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white"
                  >
                    Live GPS Uplink
                  </button>
                </div>

                <div className="pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-gray-600 dark:text-gray-500 mb-1.5 uppercase tracking-widest">
                    <span>Scan Radius</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                      {radiusKm} KM
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(Number(e.target.value))}
                    className="w-full accent-cyan-600 dark:accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] shadow-sm dark:shadow-none rounded-2xl p-4 sm:p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Global Top Assets
                  </h3>
                  <span className="text-[8px] sm:text-[9px] bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 px-2 py-1 rounded border border-fuchsia-200 dark:border-fuchsia-500/20 font-mono">
                    RANK() OVER
                  </span>
                </div>

                <div className="relative w-full aspect-[4/3] lg:aspect-[2/1] bg-gray-100 dark:bg-[#050505] rounded-xl border border-gray-200 dark:border-[#333] mb-4 overflow-hidden shadow-inner shrink-0 z-0">
                  {isMounted && (
                    <Map
                      provider={tacticalProvider}
                      defaultCenter={[35, -40]}
                      defaultZoom={2}
                      metaWheelZoom={true}
                    >
                      {cityTrends.map((city: any) => {
                        const lat = Number(city.latitude);
                        const lng = Number(city.longitude);
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                          <Overlay
                            key={`${city.city}-${city.symbol}`}
                            anchor={[lat, lng]}
                            offset={[16, 32]}
                          >
                            <div className="relative flex justify-center group cursor-pointer hover:scale-150 transition-transform origin-bottom">
                              <span className="text-2xl sm:text-3xl drop-shadow-[0_0_8px_rgba(217,70,239,0.5)] dark:drop-shadow-[0_0_8px_rgba(217,70,239,1)]">
                                {city.symbol}
                              </span>
                              <div className="hidden group-hover:block absolute bottom-full mb-1 bg-white/95 dark:bg-black/90 text-[10px] p-2 rounded border border-gray-200 dark:border-[#333] shadow-lg whitespace-nowrap z-50 pointer-events-none">
                                <p className="font-bold text-gray-900 dark:text-white uppercase">
                                  {city.city}
                                </p>
                                <p className="text-fuchsia-600 dark:text-fuchsia-400 font-mono mt-0.5">
                                  {Number(city.total_shares).toLocaleString()}{" "}
                                  SHARES
                                </p>
                              </div>
                            </div>
                          </Overlay>
                        );
                      })}
                    </Map>
                  )}
                </div>

                <div className="space-y-2">
                  {cityTrends.map((insight: any) => (
                    <div
                      key={`${insight.city}-${insight.symbol}`}
                      className="flex justify-between items-center bg-gray-50 dark:bg-[#0a0a0a] p-2 rounded-lg border border-gray-200 dark:border-[#333] hover:border-fuchsia-400 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl">
                          {insight.symbol}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-[10px] sm:text-xs">
                            {insight.city}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-fuchsia-600 dark:text-fuchsia-400 font-bold font-mono text-[10px] sm:text-xs">
                          {Number(insight.total_shares).toLocaleString()} SH
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
