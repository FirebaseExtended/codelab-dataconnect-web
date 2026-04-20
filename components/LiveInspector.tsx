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
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInspector } from "../lib/InspectorContext";

const highlightCode = (code: string) => {
  let html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = html.replace(/(\/\*[\s\S]*?\*\/|#.*)/g, "___GRAY___$1___END___");
  html = html.replace(
    /(""".*?"""|"[^"]*"|'[^']*')/gs,
    "___GREEN___$&___END___",
  );
  html = html.replace(
    /(@[a-zA-Z0-9_]+|\bUUID\b|\bString\b|\bFloat\b|\bInt\b|\bBoolean\b|\bTimestamp\b|\bAny\b)/g,
    "___FUCHSIA___$1___END___",
  );
  html = html.replace(/(\$[a-zA-Z0-9_]+|\$[0-9]+)/g, "___AMBER___$1___END___");
  const keywords =
    "query|mutation|type|SELECT|FROM|WHERE|JOIN|WITH|UPDATE|SET|INSERT|INTO|VALUES|RETURNING|GROUP BY|ORDER BY|PARTITION BY|LIMIT|OVER|RANK|AVG|COUNT|SUM|COALESCE|GREATEST|ST_DWithin|ST_MakePoint|AS|ON|AND|OR|DESC|ASC|const|await|async|let|throw|new|if";
  const keywordRegex = new RegExp(`\\b(${keywords})\\b`, "g");
  html = html.replace(keywordRegex, "___BLUE___$1___END___");
  html = html.replace(
    /___GRAY___/g,
    '<span class="!text-gray-500 dark:!text-gray-500">',
  );
  html = html.replace(
    /___GREEN___/g,
    '<span class="!text-emerald-600 dark:!text-emerald-400">',
  );
  html = html.replace(
    /___FUCHSIA___/g,
    '<span class="text-fuchsia-600 dark:text-fuchsia-400">',
  );
  html = html.replace(
    /___AMBER___/g,
    '<span class="text-amber-600 dark:text-amber-400">',
  );
  html = html.replace(
    /___BLUE___/g,
    '<span class="text-blue-600 dark:text-blue-400">',
  );
  html = html.replace(/___END___/g, "</span>");
  return { __html: html };
};

export default function LiveInspector() {
  const { logs, clearLogs, isOpen, toggleInspector } = useInspector();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  if (logs.length === 0) return null;

  return (
    <>
      <button
        onClick={toggleInspector}
        className={`fixed top-24 z-[60] bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] border-r-0 px-4 py-2.5 rounded-l-lg transition-all duration-300 shadow-xl flex items-center justify-center ${
          isOpen
            ? "right-0 md:right-[450px] opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
            : "right-0 opacity-100 pointer-events-auto hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
        }`}
      >
        <span className="font-mono text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 animate-pulse flex items-center gap-2">
          LOGS
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[450px] bg-gray-50 dark:bg-[#050505] border-l border-gray-200 dark:border-[#333] z-[60] flex flex-col shadow-2xl pointer-events-auto"
          >
            <div className="bg-white dark:bg-[#111] p-4 pt-6 md:pt-6 border-b border-gray-200 dark:border-[#333] flex justify-between items-center shrink-0">
              <h3 className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                SQL Connect Logs
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearLogs}
                  className="text-[10px] text-gray-500 hover:text-gray-900 dark:hover:text-white uppercase tracking-widest font-mono transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={toggleInspector}
                  className="md:hidden text-gray-400 hover:text-gray-800 dark:hover:text-white p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="p-4 bg-gray-50 dark:bg-[#0a0a0a] flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-24"
            >
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-end gap-2">
                      <p className="text-gray-600 dark:text-gray-400 font-mono text-xs max-w-[65%] sm:max-w-[70%] leading-tight truncate">
                        {log.title}
                      </p>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded border font-mono uppercase tracking-widest shrink-0 ${
                          log.type === "NATIVE_SQL"
                            ? "text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10"
                            : log.type === "TRANSACTION"
                              ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10"
                              : log.type === "CUSTOM_RESOLVER"
                                ? "text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10"
                                : "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10"
                        }`}
                      >
                        {log.type}
                      </span>
                    </div>
                    <pre className="text-gray-800 dark:text-gray-200 font-mono text-[10px] sm:text-xs leading-relaxed p-3 bg-white dark:bg-black rounded border border-gray-200 dark:border-[#222] overflow-x-auto whitespace-pre custom-scrollbar">
                      <code dangerouslySetInnerHTML={highlightCode(log.code)} />
                    </pre>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
