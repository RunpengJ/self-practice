// src/components/Dashboard.jsx
import React from 'react';
import { useMovies } from '../hooks/useMovies';
import Statistics from './Statistics';
import SearchFilter from './SearchFilter';
import MovieCard from './MovieCard';
import { Film, AlertCircle, Loader } from 'lucide-react';

const Dashboard = () => {
  const {
    movies,
    genres,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    ratingRange,
    setRatingRange,
    statistics
  } = useMovies();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading movie data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Loading failed: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Film className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Movie Data Dashboard</h1>
          </div>
          <p className="mt-2 text-gray-600">Discover popular movie trends and analyze quality films</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Section */}
        <Statistics statistics={statistics} />

        {/* Search and Filter Section */}
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          ratingRange={ratingRange}
          setRatingRange={setRatingRange}
          genres={genres}
        />

        {/* Movie List Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
            </h2>
            <span className="text-sm text-gray-500">
              {movies.length} movie{movies.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {movies.length === 0 ? (
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No movies match your criteria</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {movies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  genres={genres}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;