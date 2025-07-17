// src/pages/Dashboard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMovies, useGenres, useTrendingMovies } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { 
  Star, Calendar, TrendingUp, Film, Users, Award,
  BarChart3, Search, Bookmark 
} from 'lucide-react'

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: moviesData, isLoading: moviesLoading } = useMovies(currentPage)
  const { data: genres, isLoading: genresLoading } = useGenres()
  const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies()

  const movies = moviesData?.results || []
  const trendingMovies = trendingData?.results || []

  if (moviesLoading || genresLoading) {
    return <DashboardSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 space-y-8"
    >
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Film}
          title="Total Movies"
          value={moviesData?.total_results || 0}
          trend="+12%"
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Trending Now"
          value={trendingMovies.length}
          trend="+8%"
          color="green"
        />
        <StatCard
          icon={Users}
          title="Genres"
          value={genres?.length || 0}
          trend="Stable"
          color="purple"
        />
        <StatCard
          icon={Award}
          title="Top Rated"
          value="8.5"
          subtitle="Avg Rating"
          color="yellow"
        />
      </div>

      {/* Featured Movies Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured Movies</h2>
          <Link
            to="/search"
            className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-200"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.slice(0, 8).map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index} 
              genres={genres}
            />
          ))}
        </div>
      </section>

      {/* Trending Movies Section */}
      {!trendingLoading && trendingMovies.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Trending This Week</h2>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingMovies.slice(0, 10).map((movie, index) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                index={index}
                variant="trending"
                showRank={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="View Analytics"
            description="Explore movie data with interactive charts"
            link="/charts"
            color="blue"
            icon={BarChart3}
          />
          <ActionCard
            title="Advanced Search"
            description="Find movies with detailed filters"
            link="/search"
            color="purple"
            icon={Search}
          />
          <ActionCard
            title="My Watchlist"
            description="Manage your saved movies"
            link="/watchlist"
            color="green"
            icon={Bookmark}
          />
        </div>
      </section>
    </motion.div>
  )
}

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600', 
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 bg-gradient-to-r ${colorClasses[color]} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
          {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
          {trend && (
            <p className="text-green-400 text-xs mt-1">
              {trend}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Action Card Component
const ActionCard = ({ title, description, link, color, icon: Icon }) => {
  const colorClasses = {
    blue: 'border-blue-500/30 hover:bg-blue-500/10',
    purple: 'border-purple-500/30 hover:bg-purple-500/10',
    green: 'border-green-500/30 hover:bg-green-500/10'
  }

  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-white/5 backdrop-blur-xl border ${colorClasses[color]} rounded-2xl p-6 transition-all duration-300 group`}
      >
        <div className="flex items-start space-x-4">
          <Icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
          <div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Loading Skeleton
const DashboardSkeleton = () => (
  <div className="p-6 space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white/5 rounded-2xl p-6 h-24"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white/5 rounded-2xl h-80"></div>
      ))}
    </div>
  </div>
)

export default Dashboard