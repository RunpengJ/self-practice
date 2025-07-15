// src/components/Statistics.jsx
import React from 'react';
import { Film, Star, TrendingUp, Award } from 'lucide-react';

const Statistics = ({ statistics }) => {
  const { totalMovies, averageRating, highRatedPercentage, popularGenres } = statistics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Movies Count */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Movies</p>
            <p className="text-2xl font-bold text-gray-900">{totalMovies}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Film className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* High-Rated Movies Percentage */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">High-Rated Movies</p>
            <p className="text-2xl font-bold text-gray-900">{highRatedPercentage}%</p>
            <p className="text-xs text-gray-500">Rating ≥ 7.5</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Popular Genres */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Popular Genres</p>
          <div className="bg-purple-100 p-2 rounded-full">
            <Award className="w-4 h-4 text-purple-600" />
          </div>
        </div>
        <div className="space-y-1">
          {popularGenres.slice(0, 3).map((genre, index) => (
            <div key={genre.name} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{genre.name}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{genre.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;