// src/pages/MovieDetail.jsx - 修复版本，添加调试和错误处理
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMovieDetails } from '../hooks/queries/useMovies'
import { getImageUrl, formatters } from '../lib/utils'
import { 
  ArrowLeft, Star, Calendar, Clock, DollarSign, 
  Globe, Play, Heart, Bookmark, Share, ChevronDown, ChevronUp,
  AlertCircle, RefreshCw
} from 'lucide-react'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // 添加调试信息
  console.log('MovieDetail - Movie ID:', id)
  
  const { data: movie, isLoading, error, isError } = useMovieDetails(id)
  
  // 添加调试信息
  console.log('MovieDetail - Loading:', isLoading)
  console.log('MovieDetail - Error:', error)
  console.log('MovieDetail - Movie Data:', movie)

  // 检查ID是否存在
  if (!id) {
    console.error('MovieDetail - No ID provided')
    return <NotFoundState />
  }

  // 更详细的错误处理
  if (isError) {
    console.error('MovieDetail - API Error:', error)
    return <ErrorState onRetry={() => window.location.reload()} error={error} />
  }

  // 改进的loading状态
  if (isLoading) {
    console.log('MovieDetail - Showing loading skeleton')
    return <MovieDetailSkeleton />
  }

  // 检查数据是否存在
  if (!movie) {
    console.warn('MovieDetail - No movie data received')
    return <NotFoundState />
  }

  console.log('MovieDetail - Rendering movie:', movie.title)

  const {
    title, overview, poster_path, backdrop_path, vote_average,
    release_date, runtime, budget, revenue, genres, homepage,
    credits, images, videos, reviews, similar, production_companies,
    production_countries, spoken_languages, tagline
  } = movie

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* 背景图片层 */}
        <div className="absolute inset-0">
          <img 
            src={getImageUrl(backdrop_path, 'original')}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.warn('Backdrop image failed to load:', backdrop_path)
              e.target.src = '/placeholder-backdrop.jpg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>

        {/* 内容层 */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-8 w-full">
            {/* 返回按钮 */}
            <motion.button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center space-x-2 text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-black/60 transition-all duration-200 px-4 py-2 rounded-xl"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* 海报 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <img 
                  src={getImageUrl(poster_path, 'w500')}
                  alt={title}
                  className="w-80 h-auto rounded-2xl shadow-2xl border-4 border-white/20"
                  onError={(e) => {
                    console.warn('Poster image failed to load:', poster_path)
                    e.target.src = '/placeholder-movie.jpg'
                  }}
                />
              </motion.div>

              {/* 电影信息 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex-1 space-y-6 max-w-3xl"
              >
                {/* 标题和标语 */}
                <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">{title}</h1>
                  {tagline && (
                    <p className="text-xl text-blue-300 italic font-medium">{tagline}</p>
                  )}
                </div>
                
                {/* 统计信息 */}
                <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold text-white">{vote_average?.toFixed(1) || 'N/A'}</span>
                      </div>
                      <span className="text-gray-300 text-sm">Rating</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span className="text-lg font-bold text-white">
                          {release_date ? new Date(release_date).getFullYear() : 'N/A'}
                        </span>
                      </div>
                      <span className="text-gray-300 text-sm">Year</span>
                    </div>
                    
                    {runtime > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Clock className="w-5 h-5 text-green-400" />
                          <span className="text-lg font-bold text-white">{formatters.duration(runtime)}</span>
                        </div>
                        <span className="text-gray-300 text-sm">Runtime</span>
                      </div>
                    )}
                    
                    {budget > 0 && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <DollarSign className="w-5 h-5 text-purple-400" />
                          <span className="text-lg font-bold text-white">{formatters.currency(budget / 1000000)}M</span>
                        </div>
                        <span className="text-gray-300 text-sm">Budget</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 剧情简介 */}
                {overview && (
                  <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">Overview</h3>
                    <p className="text-gray-100 leading-relaxed">
                      {overview}
                    </p>
                  </div>
                )}

                {/* 类型 */}
                {genres && genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <span 
                        key={genre.id}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex flex-wrap gap-4">
                  {videos?.results?.[0] && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Trailer</span>
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-xl transition-all font-medium"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Add to Favorites</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-xl transition-all font-medium"
                  >
                    <Bookmark className="w-5 h-5" />
                    <span>Watchlist</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Cast Section */}
          {credits?.cast && credits.cast.length > 0 && (
            <CastSection cast={credits.cast} />
          )}
          
          {/* Production Info */}
          <ProductionSection 
            companies={production_companies}
            countries={production_countries}
            languages={spoken_languages}
            homepage={homepage}
          />
          
          {/* Similar Movies */}
          {similar?.results && similar.results.length > 0 && (
            <SimilarMoviesSection movies={similar.results} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Cast Section Component
const CastSection = ({ cast }) => {
  const [showAll, setShowAll] = useState(false)
  const displayCast = showAll ? cast : cast.slice(0, 8)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Cast</h2>
        {cast.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{showAll ? 'Show Less' : `Show All ${cast.length}`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {displayCast.map((actor, index) => (
          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
              <img 
                src={actor.profile_path ? getImageUrl(actor.profile_path, 'w185') : '/placeholder-person.jpg'}
                alt={actor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/placeholder-person.jpg'
                }}
              />
            </div>
            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{actor.name}</h3>
            <p className="text-gray-400 text-xs line-clamp-2">{actor.character}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Production Section Component
const ProductionSection = ({ companies, countries, languages, homepage }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Production Info</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies && companies.length > 0 && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Production Companies</h3>
          <div className="space-y-3">
            {companies.slice(0, 3).map(company => (
              <div key={company.id} className="flex items-center space-x-3">
                {company.logo_path && (
                  <img 
                    src={getImageUrl(company.logo_path, 'w154')}
                    alt={company.name}
                    className="w-8 h-8 object-contain bg-white rounded p-1"
                  />
                )}
                <span className="text-gray-300 text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {countries && countries.length > 0 && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Countries</h3>
          <div className="space-y-2">
            {countries.map(country => (
              <div key={country.iso_3166_1} className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages && languages.length > 0 && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">Languages</h3>
          <div className="space-y-2">
            {languages.map(language => (
              <span 
                key={language.iso_639_1}
                className="inline-block px-3 py-1 bg-white/20 text-gray-300 text-sm rounded-full mr-2 mb-2"
              >
                {language.english_name}
              </span>
            ))}
          </div>
          {homepage && (
            <div className="mt-4">
              <a 
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Visit Official Website →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  </section>
)

// Similar Movies Section Component
const SimilarMoviesSection = ({ movies }) => (
  <section className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Similar Movies</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.slice(0, 12).map((movie, index) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-2">
              <img 
                src={getImageUrl(movie.poster_path, 'w300')}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.jpg'
                }}
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-white text-xs font-medium">
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </div>
            <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
              {movie.title}
            </h4>
            <p className="text-gray-400 text-xs">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </p>
          </motion.div>
        </Link>
      ))}
    </div>
  </section>
)

// Loading States
const MovieDetailSkeleton = () => (
  <div className="min-h-screen animate-pulse">
    <div className="h-[60vh] bg-gradient-to-t from-black to-gray-800">
      <div className="absolute bottom-16 left-8 right-8">
        <div className="flex space-x-8">
          <div className="w-80 h-96 bg-white/10 rounded-2xl"></div>
          <div className="flex-1 space-y-6">
            <div className="h-12 bg-white/10 rounded w-2/3"></div>
            <div className="h-6 bg-white/10 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 rounded"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
              <div className="h-4 bg-white/10 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ErrorState = ({ onRetry, error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="text-center space-y-4 max-w-md mx-auto px-6">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
      <h2 className="text-2xl font-bold text-white">Error loading movie</h2>
      <p className="text-gray-400">
        {error?.message || 'Something went wrong while loading the movie details.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  </div>
)

const NotFoundState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="text-center space-y-4 max-w-md mx-auto px-6">
      <div className="w-24 h-24 bg-slate-800/60 rounded-full flex items-center justify-center mx-auto">
        <AlertCircle className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-white">Movie Not Found</h2>
      <p className="text-gray-400">The movie you're looking for doesn't exist or has been removed.</p>
      <Link 
        to="/"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  </div>
)

export default MovieDetail