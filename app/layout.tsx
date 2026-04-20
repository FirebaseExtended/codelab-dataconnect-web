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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";
import { InspectorProvider } from "../lib/InspectorContext";
import { ToastProvider } from "../lib/ToastContext";
import Navbar from "../components/NavBar";
import FloatingMenu from "../components/FloatingMenu";
import LiveInspector from "@/components/LiveInspector";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <InspectorProvider>{children}</InspectorProvider>
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-200 min-h-screen selection:bg-indigo-500/30">
        <Providers>
          <Navbar />
          <LiveInspector />
          {children}
          <FloatingMenu />
        </Providers>
      </body>
    </html>
  );
}
