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
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getDataConnect,
  connectDataConnectEmulator,
} from "firebase/data-connect";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectorConfig } from "@dataconnect/generated";

const firebaseConfig = {
  // TODO: your firebase configs here
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const dataConnect = getDataConnect(app, connectorConfig);
const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  //   connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399, false);
  //   connectAuthEmulator(auth, "http://127.0.0.1:9099");
  // connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export { app, auth, dataConnect, functions };
