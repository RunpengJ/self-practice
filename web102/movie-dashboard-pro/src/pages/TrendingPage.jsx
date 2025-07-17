// src/pages/TrendingPage.jsx - 修复版本
import { motion } from 'framer-motion'
import { useTrendingMovies, useGenres } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { TrendingUp, Flame } from 'lucide-react' // 使用 Flame 替代 Fire

const TrendingPage = () => {
  const { data: weeklyTrending } = useTrendingMovies('week')
  const { data: dailyTrending } = useTrendingMovies('day')
  const { data: genres } = useGenres()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Flame className="w-8 h-8 text-orange-400" />
          <h1 className="text-3xl font-bold text-white">Trending Movies</h1>
        </div>
        <p className="text-gray-400">Discover what's hot in cinema right now</p>
      </div>

      {/* Weekly Trending */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-6 h-6" />
          <span>This Week</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyTrending?.results?.slice(0, 8).map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index} 
              genres={genres}
              variant="trending"
              showRank={true}
            />
          ))}
        </div>
      </section>

      {/* Daily Trending */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Flame className="w-6 h-6" />
          <span>Today</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyTrending?.results?.slice(0, 8).map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index} 
              genres={genres}
              variant="trending"
              showRank={true}
            />
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default TrendingPage