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

setGlobalOptions({
  maxInstances: 10,
  region: "us-west4",
});

if (getApps().length === 0) {
  initializeApp();
}

const ai = new GoogleGenAI({
  vertexai: true,
  project: process.env.GCLOUD_PROJECT || "your-app-id",
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
          // TODO: Construct a prompt and call ai.models.generateContent() to generate a satirical headline.
          // Return the generated text string.
          
          return `BREAKING: Massive ${tradeType} detected on ${emojiSymbol}! Market reacting.`;
        } catch (error) {
          console.error("Vertex AI generation failed:", error);
          return `BREAKING: Massive ${tradeType} detected on ${emojiSymbol}! Market reacting.`;
        }
      },
    },
  },
};

export const generateTradeHeadline = onGraphRequest(headlineOpts);
