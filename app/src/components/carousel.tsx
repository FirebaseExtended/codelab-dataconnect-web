/**
 * Copyright 2024 Google Inc. All Rights Reserved.
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
import MovieCard from '@/components/moviecard';

interface CarouselProps {
  title: string;
  movies: {
    id: string;
    title?: string;
    imageUrl?: string;
    rating?: number | null;
    genre?: string | null;
    tags?: string[] | null;
  }[];
}

export default function Carousel({ title, movies }: CarouselProps) {
  return (
    <section className="carousel py-8">
      <h2 className="text-gray-200 text-2xl font-bold mb-4">{title}</h2>
      <div className="carousel__container flex overflow-x-auto space-x-4 overflow-y-clip">
        {movies.map((movie) => (
          <div className="flex-shrink-0" key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title || 'TBA'}
              imageUrl={movie.imageUrl}
              rating={movie.rating}
              genre={movie.genre}
              tags={movie.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
