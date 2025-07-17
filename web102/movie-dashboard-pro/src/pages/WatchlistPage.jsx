// src/pages/WatchlistPage.jsx - 更新后的版本
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MovieCard } from '../components/common'
import { Bookmark } from 'lucide-react'

const WatchlistPage = () => {
  const [watchlist] = useState([]) // 这里可以集成实际的watchlist状态管理

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Bookmark className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        </div>
        <p className="text-gray-400">Keep track of movies you want to watch</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
          <p className="text-gray-400 mb-6">Add movies to your watchlist to keep track of what you want to watch</p>
          <Link 
            to="/search"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {watchlist.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default WatchlistPage