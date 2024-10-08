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

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder, MdStar } from "react-icons/md";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "@/lib/firebase";
import {
  handleAddFavoritedMovie,
  handleDeleteFavoritedMovie,
  handleGetIfFavoritedMovie,
} from "@/lib/MovieService";

interface MovieCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  rating?: number | null;
  genre?: string | null;
  tags?: string[] | null;
}

export default function MovieCard({
  id,
  title,
  imageUrl,
  rating,
  genre,
  tags,
}: MovieCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfFavorited() {
      try {
        const isFav = await handleGetIfFavoritedMovie(id);
        setIsFavorited(isFav);
      } catch (error) {
        console.error("Error checking if movie is favorited:", error);
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        checkIfFavorited();
      } else {
        setIsFavorited(false);
      }
    });

    return () => unsubscribe();
  }, [auth, id]);

  async function handleFavoriteToggle(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return;
    try {
      const isFav = await handleGetIfFavoritedMovie(id);
      if (isFav) {
        await handleDeleteFavoritedMovie(id);
      } else {
        await handleAddFavoritedMovie(id);
      }
      setIsFavorited(!isFav);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleCardClick() {
    navigate(`/movie/${id}`);
  }

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-1000 transform hover:scale-105 cursor-pointer w-64 h-[440px]"
      onClick={handleCardClick}
    >
      <div>
        <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
        <div className="p-4">
          <div className="font-bold text-lg mb-1 text-white whitespace-nowrap overflow-hidden overflow-ellipsis">
            {title}
          </div>
          <div className="flex flex-row gap-6 justify-between w-full">

          <div className="flex space-x-2 items-center">
            <button
              className="flex items-center justify-center p-1 text-red-500 hover:text-red-600 transition-colors duration-200"
              aria-label="Favorite"
              onClick={handleFavoriteToggle}
            >
              {isFavorited ? (
                <MdFavorite size={20} />
              ) : (
                <MdFavoriteBorder size={20} />
              )}
            </button>
          </div>
          <div className="flex items-center text-yellow-500">
            <MdStar className="text-yellow-500" size={20} />
            <span className="ml-1 text-gray-400">{rating ?? "N/A"}</span>
          </div>
          </div>
          <div className="mt-2 text-gray-400">
            {genre && (
              <Link
                to={`/genre/${genre.toLowerCase()}`}
                className="block mb-1 hover:underline"
              >
                {capitalize(genre)}
              </Link>
            )}
            <div className="flex flex-wrap gap-1">
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs"
                >
                  {capitalize(tag)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
