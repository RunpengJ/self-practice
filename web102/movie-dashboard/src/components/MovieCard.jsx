// src/components/MovieCard.jsx
import React from 'react';
import { Star, Calendar, Users } from 'lucide-react';
import { getImageUrl } from '../utils/api';

const MovieCard = ({ movie, genres }) => {
  // Get genre names from IDs
  const getGenreNames = (genreIds) => {
    return genreIds
      .map(id => genres.find(genre => genre.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3); // Show only first 3 genres
  };

  // Get rating color based on score
  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 7) return 'text-yellow-600 bg-yellow-100';
    if (rating >= 6) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex">
        {/* Movie Poster */}
        <div className="w-24 h-36 flex-shrink-0">
          <img
            src={movie.poster_path ? getImageUrl(movie.poster_path, 'w200') : '/placeholder-movie.jpg'}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x300/cccccc/666666?text=No+Image';
            }}
          />
        </div>

        {/* Movie Information */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {movie.title}
            </h3>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getRatingColor(movie.vote_average)}`}>
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{movie.vote_count} votes</span>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {getGenreNames(movie.genre_ids).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Movie Overview */}
          <p className="text-sm text-gray-700 line-clamp-3">
            {movie.overview || 'No overview available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;