// src/pages/ChartsPage.jsx - 适配新侧边栏
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useMovies, useGenres, useChartData } from '../hooks/queries/useMovies'
import RatingDistributionChart from '../components/charts/RatingDistributionChart'
import GenrePopularityChart from '../components/charts/GenrePopularityChart'
import YearlyTrendsChart from '../components/charts/YearlyTrendsChart'
import { BarChart3, PieChart, TrendingUp, Filter } from 'lucide-react'

const ChartsPage = () => {
  const [selectedChart, setSelectedChart] = useState('rating')
  const [currentPage, setCurrentPage] = useState(1)
  
  // 获取多页数据以获得更好的分析样本
  const { data: moviesData1 } = useMovies(1)
  const { data: moviesData2 } = useMovies(2)
  const { data: moviesData3 } = useMovies(3)
  const { data: genres } = useGenres()

  // 合并多页电影数据
  const allMovies = useMemo(() => {
    const movies = []
    if (moviesData1?.results) movies.push(...moviesData1.results)
    if (moviesData2?.results) movies.push(...moviesData2.results)
    if (moviesData3?.results) movies.push(...moviesData3.results)
    return movies
  }, [moviesData1, moviesData2, moviesData3])

  const { data: chartData, isLoading } = useChartData(allMovies, genres)

  const chartOptions = [
    {
      id: 'rating',
      title: 'Rating Distribution',
      icon: BarChart3,
      description: 'Distribution of movie ratings across different ranges',
      color: 'blue'
    },
    {
      id: 'genre',
      title: 'Genre Popularity',
      icon: PieChart,
      description: 'Most popular movie genres in the dataset',
      color: 'purple'
    },
    {
      id: 'trends',
      title: 'Yearly Trends',
      icon: TrendingUp,
      description: 'Movie release trends and ratings over years',
      color: 'green'
    }
  ]

  if (isLoading || !chartData) {
    return <ChartsPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-slate-900/20 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="text-slate-400">Explore movie data with interactive visualizations</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-slate-800/60 border border-slate-600 rounded-xl px-4 py-2">
                  <span className="text-slate-400 text-sm">Total Movies: </span>
                  <span className="text-white font-bold">{allMovies.length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Chart Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Choose Visualization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chartOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => setSelectedChart(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  text-left p-6 rounded-2xl border transition-all duration-300
                  ${selectedChart === option.id
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
                    : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-800/80'
                  }
                `}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <option.icon className={`w-6 h-6 ${
                    selectedChart === option.id ? 'text-blue-400' : 'text-slate-400'
                  }`} />
                  <h3 className="font-bold">{option.title}</h3>
                </div>
                <p className="text-sm">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chart Display */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="xl:col-span-2">
            <motion.div
              key={selectedChart}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedChart === 'rating' && (
                <RatingDistributionChart data={chartData.ratingDistribution} />
              )}
              {selectedChart === 'genre' && (
                <GenrePopularityChart data={chartData.genrePopularity} />
              )}
              {selectedChart === 'trends' && (
                <YearlyTrendsChart data={chartData.yearlyTrends} />
              )}
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            <StatsPanel movies={allMovies} chartData={chartData} />
            <InsightsPanel selectedChart={selectedChart} chartData={chartData} />
          </div>
        </div>

        {/* All Charts Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Complete Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Rating Distribution</span>
              </h3>
              <div className="h-48">
                <RatingDistributionChart 
                  data={chartData.ratingDistribution} 
                  compact={true}
                />
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Genre Popularity</span>
              </h3>
              <div className="h-48">
                <GenrePopularityChart 
                  data={chartData.genrePopularity} 
                  compact={true}
                />
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Yearly Trends</span>
              </h3>
              <div className="h-48">
                <YearlyTrendsChart 
                  data={chartData.yearlyTrends} 
                  compact={true}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Stats Panel Component
const StatsPanel = ({ movies, chartData }) => {
  const stats = useMemo(() => {
    if (!movies || movies.length === 0) return {}

    const totalMovies = movies.length
    const avgRating = (movies.reduce((sum, movie) => sum + movie.vote_average, 0) / totalMovies).toFixed(1)
    const highestRated = movies.reduce((max, movie) => movie.vote_average > max.vote_average ? movie : max)
    const mostRecent = movies.reduce((latest, movie) => 
      new Date(movie.release_date) > new Date(latest.release_date) ? movie : latest
    )

    return {
      totalMovies,
      avgRating,
      highestRated: highestRated.title,
      highestRating: highestRated.vote_average.toFixed(1),
      mostRecent: mostRecent.title,
      recentYear: new Date(mostRecent.release_date).getFullYear()
    }
  }, [movies])

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 space-y-4">
      <h3 className="text-white font-bold text-lg mb-4">Quick Stats</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Total Movies</span>
          <span className="text-white font-bold">{stats.totalMovies}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Average Rating</span>
          <span className="text-yellow-400 font-bold">{stats.avgRating}/10</span>
        </div>
        
        <div className="border-t border-slate-700/50 pt-3">
          <div className="space-y-2">
            <div>
              <span className="text-slate-400 text-sm">Highest Rated</span>
              <p className="text-white font-medium">{stats.highestRated}</p>
              <p className="text-yellow-400 text-sm">{stats.highestRating}/10</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 pt-3">
          <div>
            <span className="text-slate-400 text-sm">Most Recent</span>
            <p className="text-white font-medium">{stats.mostRecent}</p>
            <p className="text-blue-400 text-sm">{stats.recentYear}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Insights Panel Component
const InsightsPanel = ({ selectedChart, chartData }) => {
  const insights = useMemo(() => {
    if (!chartData) return []

    switch (selectedChart) {
      case 'rating':
        const ratingData = chartData.ratingDistribution
        const highestRange = ratingData.reduce((max, item) => item.count > max.count ? item : max)
        return [
          `Most movies (${highestRange.count}) fall in the ${highestRange.range} rating range`,
          `${highestRange.percentage}% of movies are in this range`,
          ratingData.find(item => item.range === '8-10')?.count > 0 
            ? `${ratingData.find(item => item.range === '8-10').count} movies are highly rated (8-10)`
            : 'No movies in the highest rating range'
        ]

      case 'genre':
        const genreData = chartData.genrePopularity
        const topGenre = genreData[0]
        return [
          `${topGenre?.name} is the most popular genre with ${topGenre?.value} movies`,
          `Top 3 genres account for ${genreData.slice(0, 3).reduce((sum, genre) => sum + genre.percentage, 0).toFixed(1)}% of all movies`,
          `Genre diversity: ${genreData.length} different genres represented`
        ]

      case 'trends':
        const trendsData = chartData.yearlyTrends
        const peakYear = trendsData.reduce((max, item) => item.count > max.count ? item : max)
        return [
          `${peakYear?.year} had the most releases with ${peakYear?.count} movies`,
          `Average rating in ${peakYear?.year}: ${peakYear?.averageRating}/10`,
          `Data spans ${trendsData.length} years of movie releases`
        ]

      default:
        return []
    }
  }, [selectedChart, chartData])

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 space-y-4">
      <h3 className="text-white font-bold text-lg mb-4">Key Insights</h3>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-2"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Loading Skeleton
const ChartsPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 animate-pulse">
      <div className="h-8 bg-slate-800/50 rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 rounded-2xl p-6 h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-slate-800/50 rounded-2xl h-96"></div>
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-2xl h-48"></div>
          <div className="bg-slate-800/50 rounded-2xl h-48"></div>
        </div>
      </div>
    </div>
  </div>
)

export default ChartsPage