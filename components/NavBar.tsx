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
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import AnimatedNumber from "./AnimatedNumber";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/AuthContext";
import { useInspector } from "../lib/InspectorContext";
import ThemeToggle from "./ThemeToggle";
import { executeUpsertUser } from "../lib/ExchangeService";

import { subscribe } from "@firebase/data-connect";
import { getUserProfileRef } from "@dataconnect/generated";

const UserBalance = ({ mobile = false }: { mobile?: boolean }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Subscribe to realtime updates for the authenticated user's profile and stock ownership
    const unsub = subscribe(
      getUserProfileRef(),
      (res) => {
        if (res.data) setData(res.data);
      },
      (err) => console.error("Navbar Balance Realtime Error:", err),
    );
    return () => unsub();
  }, []);

  const netWorth = useMemo(() => {
    if (!data?.user) return 0;
    const points = data.user.points || 0;
    const portfolioValue =
      data.user.stockOwnerships_on_user?.reduce(
        (acc: number, stock: any) =>
          acc + stock.shares * stock.emoji.currentPrice,
        0,
      ) || 0;
    return points + portfolioValue;
  }, [data]);

  if (!data?.user) {
    return (
      <div
        className={`flex flex-col ${mobile ? "text-left" : "text-right mr-4 border-r border-gray-300 dark:border-[#333] pr-4"} justify-center gap-1`}
      >
        <div className="w-16 h-3 bg-gray-200 dark:bg-[#222] animate-pulse rounded"></div>
        <div className="w-12 h-2 bg-gray-200 dark:bg-[#222] animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col ${mobile ? "text-left gap-1" : "text-right mr-4 border-r border-gray-300 dark:border-[#333] pr-4"}`}
    >
      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest leading-tight">
        Available currency
      </span>
      <span
        className={`text-sm font-bold text-emerald-600 dark:text-white font-mono flex gap-1 ${mobile ? "justify-start" : "justify-end"}`}
      >
        $<AnimatedNumber value={data.user.points} decimals={2} />
      </span>
      <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest leading-tight mt-1 lg:mt-0">
        Net Worth
      </span>
      <span
        className={`text-[10px] font-mono text-emerald-900 dark:text-emerald-400 leading-tight flex gap-1 ${mobile ? "justify-start" : "justify-end"}`}
      >
        <span className="text-emerald-600/50 dark:text-emerald-500/50">$</span>
        <AnimatedNumber value={netWorth} decimals={2} />
      </span>
    </div>
  );
};

export default function Navbar() {
  const { user, loading } = useAuth();
  const { isOpen, logs } = useInspector();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logEvent } = useInspector();

  const handleLogin = async () => {
    try {
      setIsSyncing(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      // Upsert (update or insert) a user's profile information upon successful login
      await executeUpsertUser(
        cred.user.displayName || "Anonymous",
        cred.user.photoURL || "",
        logEvent
      );
    } catch (error) {
      console.error("Login/Sync Error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileMenuOpen(false);
  };
  const isShifted = isOpen && logs.length > 0;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#222] transition-all duration-300 ${
        isShifted ? "w-full md:w-[calc(100%-450px)]" : "w-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-6 py-4">
        <div className="flex items-center gap-8 lg:gap-10">
          <Link
            href="/"
            className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white tracking-tighter flex items-center gap-2 group"
          >
            <span className="text-indigo-600 dark:text-indigo-500">❖</span>
            FRIENDLY
            <span className="text-gray-400 dark:text-gray-500">EXCHANGE</span>
          </Link>

          <div className="hidden lg:flex gap-6 font-medium text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/map"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Geo
            </Link>
            {!loading && user && (
              <Link
                href="/profile"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Profile
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <ThemeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="hidden lg:flex items-center">
            {!loading &&
              (user ? (
                <>
                  {!isSyncing && <UserBalance />}
                  <div className="flex items-center gap-5">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 group"
                    >
                      <div className="p-[2px] rounded-full bg-indigo-500 transition-all">
                        <img
                          src={
                            user.photoURL ||
                            "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png"
                          }
                          alt="Profile"
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors leading-tight">
                          {user.displayName}
                        </span>
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-500 uppercase tracking-widest leading-tight">
                          Active
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-[#333] text-gray-600 dark:text-gray-400 px-4 py-2 rounded-md text-xs font-mono tracking-wider uppercase hover:bg-gray-200 dark:hover:bg-[#222] transition-all active:scale-95"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  disabled={isSyncing}
                  className="bg-gray-900 text-white dark:bg-white dark:text-black px-6 py-2 rounded-md text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  {isSyncing ? "Syncing..." : "Sign In"}
                </button>
              ))}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-[#222] bg-white dark:bg-[#0a0a0a] px-4 py-6 space-y-6">
          <div className="flex flex-col gap-4 font-medium text-lg text-gray-800 dark:text-gray-200">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link href="/map" onClick={() => setIsMobileMenuOpen(false)}>
              Geo Map
            </Link>
            {!loading && user && (
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-indigo-600 dark:text-indigo-400"
              >
                Profile
              </Link>
            )}
          </div>

          {!loading && user ? (
            <div className="pt-6 border-t border-gray-200 dark:border-[#222] space-y-6">
              <UserBalance mobile={true} />
              <button
                onClick={handleLogout}
                className="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-200 dark:border-rose-500/20 py-3 rounded-md font-bold uppercase tracking-widest text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-6 border-t border-gray-200 dark:border-[#222]">
              <button
                onClick={handleLogin}
                disabled={isSyncing}
                className="w-full bg-gray-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-md text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
              >
                {isSyncing ? "Syncing..." : "Sign In"}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
