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
import { useTheme } from "next-themes";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 rounded-full bg-gray-200 dark:bg-[#222] animate-pulse"></div>
    );
  }

  const isDark = theme === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={() => setTheme(isDark ? "light" : "dark")}
      className={`${
        isDark ? "bg-indigo-600" : "bg-gray-300"
      } relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]`}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <span
        className={`${
          isDark ? "translate-x-8" : "translate-x-1"
        } inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform duration-300 shadow-sm`}
      >
        <span className="text-[10px] leading-none">{isDark ? "🌙" : "☀️"}</span>
      </span>
    </Switch>
  );
}
