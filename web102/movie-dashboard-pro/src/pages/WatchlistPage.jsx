// src/pages/WatchlistPage.jsx - 适配新侧边栏
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MovieCard } from '../components/common'
import { Bookmark, Search, Plus, Heart, Clock, Star, Grid3X3, List } from 'lucide-react'

const WatchlistPage = () => {
  const [watchlist] = useState([]) // 这里可以集成实际的watchlist状态管理
  const [viewMode, setViewMode] = useState('grid')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-slate-900/20 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Bookmark className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">My Watchlist</h1>
            </div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Keep track of movies you want to watch and organize your personal cinema experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {watchlist.length === 0 ? (
          <EmptyWatchlist />
        ) : (
          <WatchlistContent watchlist={watchlist} viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </div>
    </div>
  )
}

// Empty Watchlist Component
const EmptyWatchlist = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16"
  >
    {/* Illustration */}
    <div className="relative mb-8">
      <div className="w-32 h-32 bg-slate-800/60 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
        <Bookmark className="w-16 h-16 text-slate-400" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
        >
          <Heart className="w-4 h-4 text-blue-400" />
        </motion.div>
      </div>
      
      <div className="absolute top-8 right-1/4">
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center"
        >
          <Star className="w-3 h-3 text-purple-400" />
        </motion.div>
      </div>
    </div>

    <h2 className="text-3xl font-bold text-white mb-4">Your watchlist is empty</h2>
    <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
      Start building your personal movie collection by adding movies you want to watch later. 
      Discover new favorites and never forget a great recommendation!
    </p>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to="/search">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-200"
        >
          <Search className="w-5 h-5" />
          <span>Browse Movies</span>
        </motion.button>
      </Link>
      
      <Link to="/trending">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-8 py-4 bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white rounded-xl font-semibold transition-all duration-200"
        >
          <Clock className="w-5 h-5" />
          <span>See What's Trending</span>
        </motion.button>
      </Link>
    </div>

    {/* Features List */}
    <div className="mt-12 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-white mb-6">Features you'll love:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Bookmark className="w-6 h-6 text-blue-400" />
          </div>
          <h4 className="font-semibold text-white mb-2">Save for Later</h4>
          <p className="text-slate-400 text-sm">Bookmark movies you want to watch</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-400" />
          </div>
          <h4 className="font-semibold text-white mb-2">Rate & Review</h4>
          <p className="text-slate-400 text-sm">Track your ratings and thoughts</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-green-400" />
          </div>
          <h4 className="font-semibold text-white mb-2">Personal Collection</h4>
          <p className="text-slate-400 text-sm">Build your own movie library</p>
        </div>
      </div>
    </div>
  </motion.div>
)

// Watchlist Content (for when there are movies)
const WatchlistContent = ({ watchlist, viewMode, setViewMode }) => (
  <div className="space-y-6">
    {/* Controls */}
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">
        My Movies ({watchlist.length})
      </h2>
      
      <div className="flex items-center space-x-4">
        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-800/60 border border-slate-600 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Grid View"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Add Movie Button */}
        <Link to="/search">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Movie</span>
          </motion.button>
        </Link>
      </div>
    </div>

    {/* Movies Grid/List */}
    {viewMode === 'grid' ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {watchlist.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            index={index}
          />
        ))}
      </div>
    ) : (
      <div className="space-y-3">
        {watchlist.map((movie, index) => (
          <div key={movie.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center space-x-4">
            <img 
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              className="w-12 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{movie.title}</h3>
              <p className="text-slate-400 text-sm">
                {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
            <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
              <Bookmark className="w-5 h-5 fill-current" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)

export default WatchlistPage