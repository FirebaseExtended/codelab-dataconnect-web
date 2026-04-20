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

import { setGlobalOptions } from "firebase-functions";
import {
  FirebaseContext,
  onGraphRequest,
} from "firebase-functions/dataconnect/graphql";
import { initializeApp, getApps } from "firebase-admin/app";
import { GoogleGenAI } from "@google/genai";
import { defineSecret } from "firebase-functions/params";
import { executeReadXPostTransaction } from "@dataconnect/generated";

const XToken = defineSecret("X_TOKEN");

setGlobalOptions({
  maxInstances: 10,
  region: "us-west4",
  secrets: [XToken],
});

if (getApps().length === 0) {
  initializeApp();
}

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GCLOUD_PROJECT || "n26-sql-connect",
  location: process.env.GCLOUD_LOCATION || "us-west4",
});

const headlineOpts = {
  schemaFilePath: "dataconnect/schema_generateTradeHeadline/schema.gql",
  resolvers: {
    mutation: {
      // Generate a satirical financial news headline for a stock trade using Vertex AI
      async generateTradeHeadline(
        _parent: unknown,
        args: Record<string, unknown>,
        _contextValue: FirebaseContext,
        _info: unknown,
      ): Promise<string> {
        const {
          emojiSymbol,
          emojiName,
          username,
          tradeAmount,
          tradeCost,
          tradeType,
        } = args;

        try {
          const prompt = `You are a hype-driven, satirical financial news bot. 
          A user named '${username}' just executed a massive ${tradeType} of ${tradeAmount} shares of ${emojiSymbol} (${emojiName}) for $${tradeCost}. 
          Write a single, punchy, dramatic news headline (under 12 words) about this market move, use puns wherever possible, but don't round or exagerate the numbers. Include the asset symbol.`;
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
          });

          if (!response.text) {
            throw new Error("No text returned from Vertex AI");
          }

          return response.text.trim();
        } catch (error) {
          console.error("Vertex AI generation failed:", error);
          return `BREAKING: Massive ${tradeType} detected on ${emojiSymbol}! Market reacting.`;
        }
      },
    },
  },
};

const extractEmoji = (text: string) => {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  const match = emojiRegex.exec(text);
  return match ? match[0] : null;
};

const readXopts = {
  schemaFilePath: "dataconnect/schema_readXpost/schema.gql",
  resolvers: {
    mutation: {
      // Validate an X.com post to apply a random price boost to an emoji stock
      async boostFromTweet(
        _parent: unknown,
        args: Record<string, unknown>,
        _contextValue: FirebaseContext,
        _info: unknown,
      ) {
        const tweetUrl = args.tweetUrl as string;
        const userId = args.userId as string;

        const tweetIdMatch = tweetUrl.match(/\/status\/(\d+)/);
        if (!tweetIdMatch) return { success: false, message: "Invalid X URL." };
        const tweetId = tweetIdMatch[1];

        try {
          const response = await fetch(
            `https://api.x.com/2/tweets/${tweetId}`,
            {
              headers: { Authorization: `Bearer ${XToken.value()}` },
            },
          );

          if (!response.ok) throw new Error("API Fetch Failed");
          const json = await response.json();

          if (!json.data || !json.data.text) {
            return { success: false, message: "Post not found or is private." };
          }

          const text = json.data.text;

          if (!text.toLowerCase().includes("#firebasesqlconnect")) {
            return {
              success: false,
              message: "Missing #FirebaseSQLConnect tag.",
            };
          }

          const symbol = extractEmoji(text);
          if (!symbol) {
            return { success: false, message: "No emoji found in tweet." };
          }

          const boostAmount = Number((Math.random() * (7 - 2) + 2).toFixed(2));

          // executeReadXPostTransaction mutation is explicitly called here using the generated SDK
          const transactionResult = await executeReadXPostTransaction({ 
            symbol: symbol, 
            boostAmount: boostAmount,
            tweetId: tweetId,
            userId: userId 
          });

          const rows = transactionResult.data?.readXPost as any[] | undefined;

          if (!rows || rows.length === 0) {
            return {
              success: false,
              message: `Emoji ${symbol} is not listed on the exchange, you have used your 3 attempts, or this X post has already been claimed!".`,
            };
          }
          return {
            success: true,
            symbol,
            boostAmount,
            message: "Boost applied!",
          };
        } catch (error: any) {
          console.error("X Post Error:", error);
          return { success: false, message: "Internal X Post Error" };
        }
      },
    },
  },
};

export const readXpost = onGraphRequest(readXopts);
export const generateTradeHeadline = onGraphRequest(headlineOpts);
