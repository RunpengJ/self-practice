// src/components/common/MovieCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock, TrendingUp } from 'lucide-react'
import { getImageUrl, formatters } from '../../lib/utils'

const MovieCard = ({ 
  movie, 
  index = 0, 
  genres = [], 
  variant = 'default', // 'default', 'trending', 'compact'
  showRank = false,
  className = '' 
}) => {
  if (!movie) return null

  const movieGenres = movie.genre_ids?.map(id => 
    genres?.find(genre => genre.id === id)?.name
  ).filter(Boolean).slice(0, 2)

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  // 根据不同变体返回不同的组件
  if (variant === 'trending') {
    return <TrendingMovieCard movie={movie} index={index} showRank={showRank} className={className} />
  }

  if (variant === 'compact') {
    return <CompactMovieCard movie={movie} index={index} className={className} />
  }

  // 默认的MovieCard
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`group ${className}`}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
          {/* Poster Image */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg'
              }}
            />
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            {/* Rank Badge (for trending) */}
            {showRank && (
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                #{index + 1}
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Movie Info */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-blue-400 transition-colors flex-shrink-0">
              {movie.title}
            </h3>
            
            {/* Release Date */}
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{releaseYear}</span>
              {movie.runtime && (
                <>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{formatters.duration(movie.runtime)}</span>
                </>
              )}
            </div>
            
            {/* Genres */}
            {movieGenres && movieGenres.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-auto">
                {movieGenres.map(genre => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// 趋势电影卡片变体
const TrendingMovieCard = ({ movie, index, showRank = true, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`flex-shrink-0 w-32 group ${className}`}
  >
    <Link to={`/movie/${movie.id}`}>
      <div className="space-y-2">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          <img
            src={getImageUrl(movie.poster_path, 'w300')}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-movie.jpg'
            }}
          />
          {showRank && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              #{index + 1}
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded px-1 py-0.5 flex items-center space-x-1">
            <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
            <span className="text-white text-xs">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <h4 className="text-white text-xs font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h4>
        <p className="text-gray-400 text-xs">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </Link>
  </motion.div>
)

// 紧凑型电影卡片变体
const CompactMovieCard = ({ movie, index, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={`group ${className}`}
  >
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 flex items-center space-x-3">
        <div className="relative w-12 h-16 overflow-hidden rounded-lg flex-shrink-0">
          <img
            src={getImageUrl(movie.poster_path, 'w154')}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-movie.jpg'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h4>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-400 text-xs">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="text-gray-500">•</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-gray-400 text-xs">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
)

export default MovieCard
export { TrendingMovieCard, CompactMovieCard }