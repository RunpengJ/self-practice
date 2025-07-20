// src/pages/SearchPage.jsx - 适配新侧边栏
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSearchMovies, useGenres } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)
  
  const { data: searchResults, isLoading } = useSearchMovies(query)
  const { data: genres } = useGenres()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-slate-900/20 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white">🔍 Search Movies</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">Find your favorite movies with advanced search and filtering options</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-8"
        >
          {/* Main Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, actors, directors..."
                className="w-full bg-slate-800/60 border border-slate-600 rounded-2xl px-14 py-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/80 transition-all duration-200 text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ${
                    showFilters ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto bg-slate-800/60 border border-slate-600 rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Advanced Filters</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Genre Filter */}
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Genre</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                    <option value="">All Genres</option>
                    {genres?.map(genre => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Release Year</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                    <option value="">Any Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Minimum Rating</label>
                  <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                    <option value="">Any Rating</option>
                    <option value="8">8.0+ ⭐</option>
                    <option value="7">7.0+ ⭐</option>
                    <option value="6">6.0+ ⭐</option>
                    <option value="5">5.0+ ⭐</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Search Results */}
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Search Results
                {searchResults && (
                  <span className="text-slate-400 font-normal text-lg ml-2">
                    ({searchResults.total_results?.toLocaleString()} found)
                  </span>
                )}
              </h2>
            </div>

            {isLoading ? (
              <SearchResultsSkeleton />
            ) : searchResults?.results?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.results.map((movie, index) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    index={index}
                    genres={genres} 
                  />
                ))}
              </div>
            ) : query ? (
              <NoResults query={query} />
            ) : null}
          </motion.div>
        )}

        {/* Popular Searches */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Popular Searches</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance',
                'Thriller', 'Animation', 'Adventure', 'Crime', 'Fantasy', 'Mystery'
              ].map((term, index) => (
                <motion.button
                  key={term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setQuery(term)}
                  className="p-3 bg-slate-800/60 border border-slate-600 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 hover:border-slate-500 transition-all duration-200 text-sm font-medium"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// No Results Component
const NoResults = ({ query }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-slate-800/60 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="w-12 h-12 text-slate-400" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
    <p className="text-slate-400 mb-6 max-w-md mx-auto">
      We couldn't find any movies matching "{query}". Try different keywords or check your spelling.
    </p>
    <div className="space-y-2 text-sm text-slate-500">
      <p>• Try more general terms</p>
      <p>• Check for typos</p>
      <p>• Use different keywords</p>
    </div>
  </div>
)

// Loading Skeleton
const SearchResultsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="aspect-[2/3] bg-slate-800/50 rounded-xl"></div>
        <div className="h-4 bg-slate-800/50 rounded"></div>
        <div className="h-3 bg-slate-800/50 rounded w-2/3"></div>
      </div>
    ))}
  </div>
)

export default SearchPage