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

import { LogEventKey } from "./InspectorContext";
import {
  upsertUser,
  buyStock,
  sellStock,
  generateTradeHeadline,
  triggerEvent,
  panicSellPortfolio,
  updateUserLocation,
  triggerMarketCrash,
  marketMakerTrade,
  triggerSocialBoost,
  updateUserRole,
} from "@dataconnect/generated";

// Upsert (update or insert) a user's profile information and log the event
export const executeUpsertUser = async (
  username: string,
  profileImage: string,
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<void> => {
  logEvent("UPSERT_USER_MUTATION", { username });
  
  await upsertUser({
    username,
    profileImage,
  });
};

// Update a user's role and log the event
export const executeUpdateRole = async (
  role: string,
  logEvent: (key: LogEventKey, params?: any) => void
): Promise<void> => {
  logEvent("UPDATE_USER_ROLE_MUTATION", { role });
  await updateUserRole({ role });
};

// Update a user's city and geographic coordinates
export const executeUpdateLocation = async (
  city: string,
  latitude: number,
  longitude: number,
): Promise<void> => {
  await updateUserLocation({ city, latitude, longitude });
};

// Execute a random market maker trade and adjust an emoji's stock price
export const executeManualBotTrade = async (
  randomEmoji: any,
  username: string,
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<{ isBuy: boolean; tradeAmount: number }> => {
  logEvent("MARKET_MAKER_TRADE");
  const isBuy = Math.random() > 0.5;
  const tradeAmount = Number((Math.random() * (10 - 2) + 2).toFixed(2));

  await marketMakerTrade({
    emojiId: randomEmoji.id,
    priceImpact: isBuy ? tradeAmount : -tradeAmount,
    shareDelta: isBuy ? 10 : -10,
    eventDesc: `Admin ${username} triggered market event: ${randomEmoji.symbol} went ${isBuy ? "up" : "down"} by $${tradeAmount.toFixed(2)}.`,
    newPrice: Math.max(
      0.01,
      randomEmoji.currentPrice + (isBuy ? tradeAmount : -tradeAmount),
    ),
  });

  return { isBuy, tradeAmount };
};

// Execute a stock purchase, validating limits and potentially generating an AI news headline for large trades
export const executeBuyStock = async (
  emoji: any,
  amount: number,
  isDiscounted: boolean,
  user: any,
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<void> => {
  const MAX_AMOUNT = 100;

  if (!Number.isInteger(amount) || amount <= 0 || amount > MAX_AMOUNT) {
    throw new Error(`Amount must be an integer between 1 and ${MAX_AMOUNT}.`);
  }
  const singleSharePrice = isDiscounted
    ? emoji.currentPrice * 0.5
    : emoji.currentPrice;
  const estimatedCost = singleSharePrice * amount;
  const estimatedImpact = emoji.currentPrice * 0.05 * amount;

  logEvent("BUY_STOCK_TRANSACTION", { amount, symbol: emoji.symbol });

  const response = await buyStock({
    emojiId: emoji.id,
    amount: amount,
    isDiscounted: isDiscounted,
  });

  const buyResult = response.data?.buyStock as any;

  if (
    !buyResult ||
    buyResult === 0 ||
    (Array.isArray(buyResult) && buyResult.length === 0)
  ) {
    throw new Error(
      "Transaction denied: Insufficient funds or price mismatch.",
    );
  }

  const actualCost = Array.isArray(buyResult)
    ? buyResult[0].actual_cost
    : estimatedCost;
  const actualImpact = Array.isArray(buyResult)
    ? buyResult[0].actual_impact
    : estimatedImpact;

  if (amount >= 10 && user) {
    setTimeout(() => {
      logEvent("GENERATE_HEADLINE_RESOLVER");
    }, 2000);

    const headlineResult = await generateTradeHeadline({
      emojiSymbol: emoji.symbol,
      emojiName: emoji.name,
      username: user.displayName || "Anonymous Whale",
      tradeAmount: amount,
      tradeCost: actualCost.toFixed(2),
      tradeType: "BUY",
    });
    await triggerEvent({
      emojiId: emoji.id,
      impact: actualImpact.toFixed(2),
      description: `GEMINI REPORT: ${headlineResult.data?.aiHeadline}`,
      now: new Date().toISOString(),
    });
  }
};

// Execute a stock sale, validating ownership and potentially generating an AI news headline for large trades
export const executeSellStock = async (
  emoji: any,
  amount: number,
  ownedShares: number,
  user: any,
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<void> => {
  const MAX_AMOUNT = 100;

  if (!Number.isInteger(amount) || amount <= 0 || amount > MAX_AMOUNT) {
    throw new Error(`Amount must be an integer between 1 and ${MAX_AMOUNT}.`);
  }
  if (amount > ownedShares) {
    throw new Error(
      "INSUFFICIENT SHARES: You cannot sell more shares than you own.",
    );
  }

  const estimatedRevenue = emoji.currentPrice * amount;
  const dropRatePerShare = 0.05;
  const targetPrice =
    emoji.currentPrice * Math.pow(1 - dropRatePerShare, amount);
  const estimatedImpact = Math.max(0.01, targetPrice) - emoji.currentPrice;

  logEvent("SELL_STOCK_TRANSACTION", { amount, symbol: emoji.symbol });

  const response = await sellStock({
    emojiId: emoji.id,
    amount: amount,
  });

  const sellResult = response.data?.sellStock as any;

  if (
    !sellResult ||
    sellResult === 0 ||
    (Array.isArray(sellResult) && sellResult.length === 0)
  ) {
    throw new Error("Transaction denied: Insufficient shares.");
  }

  const actualRevenue = Array.isArray(sellResult)
    ? sellResult[0].actual_revenue
    : estimatedRevenue;
  const actualImpact = Array.isArray(sellResult)
    ? sellResult[0].actual_impact
    : estimatedImpact;

  if (amount >= 10 && user) {
    const headlineResult = await generateTradeHeadline({
      emojiSymbol: emoji.symbol,
      emojiName: emoji.name,
      username: user.displayName || "Anonymous Whale",
      tradeAmount: amount,
      tradeCost: actualRevenue.toFixed(2),
      tradeType: "SELL",
    });

    await triggerEvent({
      emojiId: emoji.id,
      impact: actualImpact.toFixed(2),
      description: `GEMINI REPORT: ${headlineResult.data?.aiHeadline}`,
      now: new Date().toISOString(),
    });
  }
};

// Trigger a market price boost for an emoji based on an X.com post URL
export const executeSocialBoost = async (tweetUrl: string, userId: string) => {
  try {
    const response = await triggerSocialBoost({ tweetUrl, userId });
    return response;
  } catch (error: any) {
    console.error("Failed to trigger Social Boost:", error);
    throw error;
  }
};

// Liquidate a user's entire stock portfolio and log the event
export const executePanicSell = async (
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<void> => {
  await panicSellPortfolio();
  logEvent("PANIC_SELL_EXECUTE");
};

// Trigger a massive market crash for all emojis matching a specific category tag
export const executeMarketCrash = async (
  crashTag: string,
  logEvent: (key: LogEventKey, params?: any) => void,
): Promise<void> => {
  await triggerMarketCrash({ tag: crashTag.toLowerCase() });
  logEvent("MARKET_CRASH_EXECUTE", { crashTag });
};
