// src/pages/TrendingPage.jsx - 适配新侧边栏
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTrendingMovies, useGenres } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { TrendingUp, Flame, Calendar, BarChart3 } from 'lucide-react'

const TrendingPage = () => {
  const [timeWindow, setTimeWindow] = useState('week')
  const { data: weeklyTrending } = useTrendingMovies('week')
  const { data: dailyTrending } = useTrendingMovies('day')
  const { data: genres } = useGenres()

  const currentData = timeWindow === 'week' ? weeklyTrending : dailyTrending

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-900/20 via-red-900/20 to-slate-900/20 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flame className="w-8 h-8 text-orange-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">Trending Movies</h1>
            </div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover what's hot in cinema right now. Updated in real-time based on popularity and engagement.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Time Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Trending Period</h2>
            <div className="flex items-center bg-slate-800/60 border border-slate-600 rounded-xl p-1">
              <button
                onClick={() => setTimeWindow('day')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  timeWindow === 'day' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Today</span>
              </button>
              <button
                onClick={() => setTimeWindow('week')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  timeWindow === 'week' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>This Week</span>
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Trending Movies</p>
                  <p className="text-2xl font-bold text-white">{currentData?.results?.length || 0}</p>
                  <p className="text-orange-400 text-sm">Updated hourly</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-white">
                    {currentData?.results ? 
                      (currentData.results.reduce((sum, movie) => sum + movie.vote_average, 0) / currentData.results.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                  <p className="text-blue-400 text-sm">Across all trending</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Top Movie</p>
                  <p className="text-lg font-bold text-white line-clamp-1">
                    {currentData?.results?.[0]?.title || 'Loading...'}
                  </p>
                  <p className="text-green-400 text-sm">#1 Trending</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trending Movies Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              {timeWindow === 'week' ? (
                <>
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <span>This Week's Trending</span>
                </>
              ) : (
                <>
                  <Flame className="w-6 h-6 text-orange-400" />
                  <span>Today's Hottest</span>
                </>
              )}
            </h2>
            <div className="text-slate-400 text-sm">
              {timeWindow === 'week' ? 'Updated daily' : 'Updated hourly'}
            </div>
          </div>

          {currentData?.results ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentData.results.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  {/* Trending Rank Badge */}
                  <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    #{index + 1}
                  </div>
                  
                  <MovieCard 
                    movie={movie} 
                    index={index} 
                    genres={genres}
                    variant="trending"
                    showRank={false} // 我们已经有自定义的排名标识
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <TrendingPageSkeleton />
          )}
        </motion.section>

        {/* Additional Trending Sections */}
        <div className="mt-16 space-y-12">
          {/* Weekly vs Daily Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Trending Comparison</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Today's Top 5 */}
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span>Today's Top 5</span>
                </h3>
                <div className="space-y-3">
                  {dailyTrending?.results?.slice(0, 5).map((movie, index) => (
                    <div key={movie.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-8 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm line-clamp-1">{movie.title}</p>
                        <p className="text-slate-400 text-xs">
                          ⭐ {movie.vote_average.toFixed(1)} • {new Date(movie.release_date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* This Week's Top 5 */}
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span>This Week's Top 5</span>
                </h3>
                <div className="space-y-3">
                  {weeklyTrending?.results?.slice(0, 5).map((movie, index) => (
                    <div key={movie.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/30 transition-colors">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-8 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm line-clamp-1">{movie.title}</p>
                        <p className="text-slate-400 text-xs">
                          ⭐ {movie.vote_average.toFixed(1)} • {new Date(movie.release_date).getFullYear()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton
const TrendingPageSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-pulse">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="aspect-[2/3] bg-slate-800/50 rounded-xl"></div>
        <div className="h-4 bg-slate-800/50 rounded"></div>
        <div className="h-3 bg-slate-800/50 rounded w-2/3"></div>
      </div>
    ))}
  </div>
)

export default TrendingPage