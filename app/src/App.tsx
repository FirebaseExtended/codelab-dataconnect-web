/**
 * Copyright 2024 Google LLC
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

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ActorPage from "./pages/Actor";
import MoviePage from "./pages/Movie";
import MyProfilePage from "./pages/MyProfile";
import VectorSearchPage from "./pages/VectorSearch";
import AdvancedSearchPage from "./pages/AdvancedSearch";
import NotFound from "./pages/NotFound";
import RootLayout from "./layout/RootLayout";

export default function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/vectorsearch" element={<VectorSearchPage />} />
          <Route path="/advancedsearch" element={<AdvancedSearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}
