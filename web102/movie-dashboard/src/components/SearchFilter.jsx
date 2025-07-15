// src/components/SearchFilter.jsx
import React from 'react';
import { Search, Filter, Star } from 'lucide-react';

const SearchFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  ratingRange, 
  setRatingRange, 
  genres 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Genre Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Range Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600">
              Rating: {ratingRange[0]} - {ratingRange[1]}
            </span>
          </div>
          <div className="flex space-x-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={ratingRange[0]}
              onChange={(e) => setRatingRange([parseFloat(e.target.value), ratingRange[1]])}
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={ratingRange[1]}
              onChange={(e) => setRatingRange([ratingRange[0], parseFloat(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;