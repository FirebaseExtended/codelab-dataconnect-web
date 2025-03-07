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

import React from 'react';
import Carousel from '@/components/carousel';
import { OrderDirection } from '@/lib/dataconnect-sdk';
import { useHandleLatestMovies, useHandleTopMovies } from '@/lib/MovieService';

export default function HomePage() {
  const { data: topMoviesData, isLoading: topMoviesLoading } = useHandleTopMovies(10, OrderDirection.DESC );
  const { data: latestMoviesData, isLoading: latestMoviesLoading } = useHandleLatestMovies(10, OrderDirection.DESC);

  if(topMoviesLoading || latestMoviesLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white shadow-md min-h-screen">
      <Carousel title="Top 10 Movies" movies={topMoviesData!.movies} />
      <Carousel title="Latest Movies" movies={latestMoviesData!.movies} />
    </div>
  );
}


