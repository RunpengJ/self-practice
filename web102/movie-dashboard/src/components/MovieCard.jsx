// src/components/MovieCard.jsx
import React from 'react';
import { Star, Calendar, Users, Play, Heart, BookmarkPlus } from 'lucide-react';
import { getImageUrl } from '../utils/api';

const MovieCard = ({ movie, genres }) => {
  // Get genre names from IDs - Fixed to avoid optional chaining
  const getGenreNames = (genreIds) => {
    return genreIds
      .map(id => {
        const genre = genres.find(genre => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .slice(0, 3); // Show only first 3 genres
  };

  // Get rating style based on score
  const getRatingStyle = (rating) => {
    if (rating >= 8) return 'rating-excellent';
    if (rating >= 7) return 'rating-good';
    if (rating >= 6) return 'rating-average';
    return 'rating-poor';
  };

  // Get popularity badge
  const getPopularityBadge = (voteCount) => {
    if (voteCount >= 10000) return { text: 'BLOCKBUSTER', class: 'bg-gradient-danger' };
    if (voteCount >= 5000) return { text: 'POPULAR', class: 'bg-gradient-warning' };
    if (voteCount >= 1000) return { text: 'TRENDING', class: 'bg-gradient-primary' };
    return { text: 'INDIE', class: 'bg-gradient-success' };
  };

  const popularityBadge = getPopularityBadge(movie.vote_count);

  return (
    <div className="movie-card group">
      <div className="flex flex-col lg:flex-row">
        {/* Movie Poster */}
        <div className="relative w-full lg:w-32 h-48 lg:h-48 flex-shrink-0 overflow-hidden">
          <img
            src={movie.poster_path ? getImageUrl(movie.poster_path, 'w300') : '/placeholder-movie.jpg'}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/1e293b/60a5fa?text=No+Poster';
            }}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-white animate-pulse" />
          </div>

          {/* Rating badge */}
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white ${getRatingStyle(movie.vote_average)} shadow-lg`}>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* Popularity badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold text-white ${popularityBadge.class} shadow-lg`}>
            {popularityBadge.text}
          </div>
        </div>

        {/* Movie Information */}
        <div className="flex-1 p-6 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                {movie.title}
              </h3>
              
              {/* Release year and popularity */}
              <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 ml-4">
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-all duration-300 group/btn">
                <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
              </button>
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-all duration-300 group/btn">
                <BookmarkPlus className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {getGenreNames(movie.genre_ids).map((genre, index) => (
              <span
                key={index}
                className="genre-tag transform hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Movie Overview */}
          <p className="text-slate-300 line-clamp-3 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors duration-300">
            {movie.overview || 'No overview available for this movie.'}
          </p>

          {/* Rating breakdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Star rating visual */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-4 h-4 transition-colors duration-300 ${
                      star <= Math.round(movie.vote_average / 2) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-slate-600'
                    }`}
                  />
                ))}
                <span className="text-sm text-slate-400 ml-2 font-medium">
                  {movie.vote_average}/10
                </span>
              </div>
            </div>

            {/* Watch button */}
            <button className="btn-primary group/watch flex items-center space-x-2 text-sm py-2 px-4">
              <Play className="w-4 h-4 group-hover/watch:scale-110 transition-transform duration-300" />
              <span>Watch Now</span>
            </button>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>

      {/* Card border glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <div className="w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"></div>
      </div>
    </div>
  );
};

export default MovieCard;