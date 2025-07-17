// src/components/Dashboard.jsx
import React from 'react';
import { useMovies } from '../hooks/useMovies';
import Statistics from './Statistics';
import SearchFilter from './SearchFilter';
import MovieCard from './MovieCard';
import { Film, AlertCircle, Loader, Star, Play } from 'lucide-react';

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

  // 确保 ratingRange 有默认值
  const safeRatingRange = ratingRange || [0, 10];
  const safeSetRatingRange = setRatingRange || (() => {});

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader className="w-16 h-16 animate-spin text-blue-400 mx-auto mb-6 icon-glow" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-opacity-20 rounded-full animate-pulse mx-auto"></div>
          </div>
          <p className="text-slate-300 text-lg animate-pulse">Loading cinematic data...</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6 icon-glow" />
          <h2 className="text-2xl font-bold text-white mb-4">Connection Lost</h2>
          <p className="text-slate-300 mb-6">Failed to load movie data: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            <Play className="w-4 h-4 mr-2" />
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Cinematic Header */}
      <header className="cinema-header relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Film className="w-12 h-12 text-white icon-glow animate-float" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white text-glow">
                CineScope Dashboard
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <p className="text-slate-200 text-lg">Discover • Analyze • Experience Cinema</p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Statistics Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Cinema Analytics</h2>
            <div className="w-24 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          </div>
          {statistics && <Statistics statistics={statistics} />}
        </section>

        {/* Search and Filter Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-200 mb-2">Discover Movies</h2>
            <p className="text-slate-400">Search and filter through our curated collection</p>
          </div>
          <SearchFilter
            searchQuery={searchQuery || ''}
            setSearchQuery={setSearchQuery || (() => {})}
            selectedGenre={selectedGenre || ''}
            setSelectedGenre={setSelectedGenre || (() => {})}
            ratingRange={safeRatingRange}
            setRatingRange={safeSetRatingRange}
            genres={genres || []}
          />
        </section>

        {/* Movie List Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? (
                  <>
                    Search Results for <span className="text-blue-400">"{searchQuery}"</span>
                  </>
                ) : (
                  'Featured Movies'
                )}
              </h2>
              <p className="text-slate-400 mt-1">
                {movies ? movies.length : 0} {movies && movies.length === 1 ? 'movie' : 'movies'} found
              </p>
            </div>
            
            {/* Results counter with animation */}
            <div className="bg-card rounded-xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 font-medium">{movies ? movies.length : 0} Results</span>
              </div>
            </div>
          </div>

          {!movies || movies.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <Film className="w-24 h-24 text-slate-500 mx-auto mb-6 animate-float" />
                <div className="absolute inset-0 w-24 h-24 border-2 border-slate-500 border-opacity-20 rounded-full animate-ping mx-auto"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Movies Found</h3>
              <p className="text-slate-500">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 space-y-6">
              {movies.map((movie, index) => (
                <div 
                  key={movie.id}
                  className="transform transition-all duration-500"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  <MovieCard movie={movie} genres={genres || []} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse opacity-20" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;