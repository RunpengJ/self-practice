// src/pages/Dashboard.jsx - 修改后的版本，添加滑动功能，移除list view
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMovies, useGenres, useTrendingMovies } from '../hooks/queries/useMovies'
import { MovieCard } from '../components/common'
import { 
  Star, Calendar, TrendingUp, Film, Users, Award,
  BarChart3, Search, Bookmark, ArrowRight, Play,
  Clock, Eye, ChevronLeft, ChevronRight
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
      className="w-full bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen"
    >
      {/* Welcome Header - 替代突兀的Hero */}
      <WelcomeHeader />
      
      {/* Stats Section */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span>Analytics Overview</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CompactStatCard
              icon={Film}
              title="Total Movies"
              value={moviesData?.total_results || 0}
              trend="+12%"
              color="blue"
            />
            <CompactStatCard
              icon={TrendingUp}
              title="Trending Now"
              value={trendingMovies.length}
              trend="+8%"
              color="green"
            />
            <CompactStatCard
              icon={Users}
              title="Genres"
              value={genres?.length || 0}
              trend="Stable"
              color="purple"
            />
            <CompactStatCard
              icon={Award}
              title="Top Rated"
              value="8.5"
              subtitle="Avg Rating"
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="space-y-12 pb-8">
        {/* Featured Movies Section */}
        <ContentSection
          title="🍿 Featured Movies"
          subtitle="Popular and trending selections"
          movies={movies.slice(0, 12)}
          genres={genres}
          sectionType="featured"
          link="/search"
        />

        {/* Trending Movies */}
        <ContentSection
          title="🔥 Trending This Week"
          subtitle="What's hot in cinema right now"
          movies={trendingMovies.slice(0, 15)}
          genres={genres}
          sectionType="trending"
          link="/trending"
        />

        {/* Top Rated Movies */}
        <ContentSection
          title="⭐ Top Rated Movies"
          subtitle="Critics and audience favorites"
          movies={movies.slice(8, 20)}
          genres={genres}
          sectionType="toprated"
          link="/search?sort=top_rated"
        />

        {/* Quick Actions */}
        <QuickActionsSection />
      </div>
    </motion.div>
  )
}

// 新的欢迎头部组件 - 替代突兀的Hero
const WelcomeHeader = () => {
  const currentHour = new Date().getHours()
  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning"
    if (currentHour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <section className="px-4 md:px-6 py-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {getGreeting()}, Explorer! 👋
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to your movie analytics dashboard. Discover insights, explore trends, and dive deep into the world of cinema.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/charts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Explore Analytics</span>
              </motion.button>
            </Link>
            
            <Link to="/trending">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white rounded-xl font-semibold transition-all duration-200"
              >
                <TrendingUp className="w-5 h-5" />
                <span>What's Trending</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Content Section 组件 - 新增滑动功能
const ContentSection = ({ 
  title, 
  subtitle, 
  movies, 
  genres, 
  sectionType, 
  link
}) => {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // 检查滚动状态
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }
  }

  // 滚动函数
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // 约1.5个卡片的宽度
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(checkScrollability, 100) // 延迟执行，确保DOM已渲染
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability, { passive: true })
      return () => {
        container.removeEventListener('scroll', checkScrollability)
        clearTimeout(timeoutId)
      }
    }
    return () => clearTimeout(timeoutId)
  }, [movies])

  return (
    <section className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-slate-400 text-sm">{subtitle}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Scroll Controls */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                whileHover={{ scale: canScrollLeft ? 1.05 : 1 }}
                whileTap={{ scale: canScrollLeft ? 0.95 : 1 }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  canScrollLeft 
                    ? 'bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white' 
                    : 'bg-slate-800/30 border border-slate-700/30 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                whileHover={{ scale: canScrollRight ? 1.05 : 1 }}
                whileTap={{ scale: canScrollRight ? 0.95 : 1 }}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  canScrollRight 
                    ? 'bg-slate-700/50 border border-slate-600 hover:bg-slate-600/50 text-white' 
                    : 'bg-slate-800/30 border border-slate-700/30 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* View All Button */}
            <Link to={link}>
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Movie Display */}
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-1"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {movies.map((movie, index) => (
            <ModernMovieCard 
              key={movie.id}
              movie={movie}
              index={index}
              genres={genres}
              variant={sectionType}
              isCompact={sectionType === 'trending'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// 现代化电影卡片 (修复宽度问题)
const ModernMovieCard = ({ movie, index, genres, variant = 'default', isCompact = false }) => {
  const movieGenres = movie.genre_ids?.map(id => 
    genres?.find(genre => genre.id === id)?.name
  ).filter(Boolean).slice(0, 1)

  const cardWidth = isCompact ? 'w-40 flex-shrink-0' : 'w-48 flex-shrink-0'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      className={`group ${cardWidth}`}
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="space-y-3">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-800 border border-slate-700/50">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = '/placeholder-movie.jpg'
              }}
            />
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            {variant === 'trending' && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                #{index + 1}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-blue-400 transition-colors leading-tight">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {new Date(movie.release_date).getFullYear()}
              </span>
              
              {movieGenres && movieGenres.length > 0 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                  {movieGenres[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const CompactStatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-emerald-600 to-emerald-700', 
    purple: 'from-purple-600 to-purple-700',
    yellow: 'from-amber-600 to-amber-700'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2.5 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium mb-1">{title}</p>
          <p className="text-lg font-bold text-white truncate">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
          {trend && (
            <p className="text-emerald-400 text-xs font-medium mt-1">
              {trend}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const QuickActionsSection = () => {
  const actions = [
    {
      title: "View Analytics",
      description: "Interactive charts and insights",
      link: "/charts",
      icon: BarChart3,
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "Advanced Search",
      description: "Find movies with detailed filters",
      link: "/search",
      icon: Search,
      color: "from-purple-600 to-purple-700"
    },
    {
      title: "My Watchlist",
      description: "Manage your saved movies",
      link: "/watchlist",
      icon: Bookmark,
      color: "from-emerald-600 to-emerald-700"
    }
  ]

  return (
    <section className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Link key={action.title} to={action.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-200 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${action.color} rounded-xl flex-shrink-0`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Loading Skeleton
const DashboardSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Welcome Header Skeleton */}
    <div className="px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="h-12 bg-slate-800/50 rounded w-1/2 mx-auto"></div>
        <div className="h-6 bg-slate-800/50 rounded w-2/3 mx-auto"></div>
        <div className="flex justify-center space-x-4 pt-6">
          <div className="h-12 bg-slate-800/50 rounded w-32"></div>
          <div className="h-12 bg-slate-800/50 rounded w-32"></div>
        </div>
      </div>
    </div>
    
    {/* Stats Skeleton */}
    <div className="px-4 md:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-8 bg-slate-800/50 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-4 h-20"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Content Sections Skeleton */}
    {[...Array(3)].map((_, i) => (
      <div key={i} className="px-4 md:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 bg-slate-800/50 rounded w-1/4 mb-6"></div>
          <div className="flex space-x-4">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="w-48 space-y-3 flex-shrink-0">
                <div className="aspect-[2/3] bg-slate-800/50 rounded-xl"></div>
                <div className="h-4 bg-slate-800/50 rounded"></div>
                <div className="h-3 bg-slate-800/50 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default Dashboard