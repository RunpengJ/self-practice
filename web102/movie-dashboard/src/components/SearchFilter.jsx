// src/components/SearchFilter.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Sliders, Zap, X, PlayCircle } from 'lucide-react';

const SearchFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  ratingRange, 
  setRatingRange, 
  genres 
}) => {
  // 本地搜索状态，用于手动触发
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // 当外部 searchQuery 变化时同步到本地状态
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // 手动触发搜索
  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
  };

  // Enter键触发搜索
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 清除搜索
  const clearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
  };

  // 检查是否有待搜索的内容
  const hasUnsearchedContent = localSearchQuery !== searchQuery;

  return (
    <div className="bg-card rounded-2xl p-8 mb-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Sliders className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Search & Filter</h3>
        </div>
        <p className="text-slate-400">Find your perfect movie with manual search control</p>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
            Movie Search
          </label>
          
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search by title..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-300"
              />
              
              {/* 状态指示器 */}
              {hasUnsearchedContent && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" title="Press Enter or click Search to search"></div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!localSearchQuery.trim()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                localSearchQuery.trim()
                  ? hasUnsearchedContent
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105'
                    : 'bg-green-500 text-white'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>
                {!localSearchQuery.trim() ? 'Search' : 
                 hasUnsearchedContent ? 'Search' : '✓ Searched'}
              </span>
            </button>

            {/* Clear Button */}
            {localSearchQuery && (
              <button
                onClick={clearSearch}
                className="px-4 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-300 flex items-center space-x-2"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search hints */}
          <div className="text-xs text-slate-500 flex items-center space-x-4">
            <span>💡 Tips:</span>
            <span>Press Enter to search</span>
            <span>•</span>
            <span>Click Search button</span>
            <span>•</span>
            <span>Filters apply instantly</span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genre Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Genre Filter
            </label>
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id} className="bg-slate-800 text-white">
                    {genre.name}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rating Range Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
              Rating Range
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm text-slate-300 font-medium">
                  {ratingRange[0]} - {ratingRange[1]} / 10
                </span>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              
              <div className="space-y-3">
                {/* Min Rating Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Minimum</span>
                    <span>{ratingRange[0]}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={ratingRange[0]}
                      onChange={(e) => setRatingRange([parseFloat(e.target.value), ratingRange[1]])}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${ratingRange[0] * 10}%, #475569 ${ratingRange[0] * 10}%, #475569 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Max Rating Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Maximum</span>
                    <span>{ratingRange[1]}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={ratingRange[1]}
                      onChange={(e) => setRatingRange([ratingRange[0], parseFloat(e.target.value)])}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #475569 0%, #475569 ${ratingRange[1] * 10}%, #3b82f6 ${ratingRange[1] * 10}%, #3b82f6 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Rating visualization */}
              <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-emerald-500 relative">
                    {/* Range indicator */}
                    <div 
                      className="absolute top-0 h-full bg-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-50"
                      style={{
                        left: `${ratingRange[0] * 10}%`,
                        width: `${(ratingRange[1] - ratingRange[0]) * 10}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters indicator */}
      {(searchQuery || selectedGenre || ratingRange[0] > 0 || ratingRange[1] < 10) && (
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300 font-medium">Active Filters</span>
              {searchQuery && (
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedGenre && (
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                  Genre: {genres.find(g => g.id.toString() === selectedGenre)?.name}
                </span>
              )}
              {(ratingRange[0] > 0 || ratingRange[1] < 10) && (
                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                  Rating: {ratingRange[0]}-{ratingRange[1]}
                </span>
              )}
            </div>
            <button 
              onClick={() => {
                setLocalSearchQuery('');
                setSearchQuery('');
                setSelectedGenre('');
                setRatingRange([0, 10]);
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors duration-300 px-3 py-1 bg-slate-800 rounded-lg hover:bg-slate-700"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;