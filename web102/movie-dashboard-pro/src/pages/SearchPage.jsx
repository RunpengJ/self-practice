// src/pages/SearchPage.jsx - 更新后的版本
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSearchMovies, useGenres } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { Search, Filter, X } from 'lucide-react'

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Search Movies</h1>
        <p className="text-gray-400">Find your favorite movies with advanced search</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Results */}
      {query && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Search Results {searchResults && `(${searchResults.total_results})`}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults?.results?.map((movie, index) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  index={index}
                  genres={genres} 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default SearchPage