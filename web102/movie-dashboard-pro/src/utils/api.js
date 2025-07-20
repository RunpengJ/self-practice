// src/utils/api.js - 调试版本，添加详细日志
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3'

console.log('API Configuration:')
console.log('- API_KEY exists:', !!API_KEY)
console.log('- BASE_URL:', BASE_URL)

if (!API_KEY) {
  console.error('❌ TMDB API KEY is missing! Please check your .env file.')
  console.log('Make sure you have VITE_TMDB_API_KEY in your .env file')
}

// 创建axios实例
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 10000, // 10秒超时
})

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
      baseURL: config.baseURL
    })
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data ? 'Data received' : 'No data'
    })
    return response
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    return Promise.reject(error)
  }
)

// 现有的API函数 (保持不变)
export const fetchGenres = async () => {
  try {
    console.log('📂 Fetching genres...')
    const response = await api.get('/genre/movie/list')
    console.log('📂 Genres fetched successfully:', response.data.genres?.length)
    return response.data.genres
  } catch (error) {
    console.error('❌ Error fetching genres:', error)
    throw new Error(`Failed to fetch genres: ${error.message}`)
  }
}

export const fetchPopularMovies = async (page = 1) => {
  try {
    console.log('🎬 Fetching popular movies, page:', page)
    const response = await api.get('/movie/popular', {
      params: { page }
    })
    console.log('🎬 Popular movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching popular movies:', error)
    throw new Error(`Failed to fetch popular movies: ${error.message}`)
  }
}

export const searchMovies = async (query, page = 1) => {
  try {
    console.log('🔍 Searching movies:', query, 'page:', page)
    const response = await api.get('/search/movie', {
      params: { query, page }
    })
    console.log('🔍 Search results:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error searching movies:', error)
    throw new Error(`Failed to search movies: ${error.message}`)
  }
}

// 电影详情相关 - 添加详细调试
export const fetchMovieDetails = async (id) => {
  try {
    console.log('🎭 Fetching movie details for ID:', id)
    
    if (!id) {
      throw new Error('Movie ID is required')
    }

    if (!API_KEY) {
      throw new Error('API key is missing')
    }

    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,images,videos,reviews,similar,recommendations'
      }
    })
    
    console.log('🎭 Movie details fetched successfully:', {
      id: response.data.id,
      title: response.data.title,
      hasCredits: !!response.data.credits,
      hasImages: !!response.data.images,
      hasVideos: !!response.data.videos,
      hasReviews: !!response.data.reviews,
      hasSimilar: !!response.data.similar
    })
    
    return response.data
  } catch (error) {
    console.error('❌ Error fetching movie details:', {
      id,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data
    })
    
    if (error.response?.status === 404) {
      throw new Error('Movie not found')
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid API key')
    }
    if (error.response?.status === 429) {
      throw new Error('Too many requests - rate limit exceeded')
    }
    
    throw new Error(`Failed to fetch movie details: ${error.message}`)
  }
}

export const fetchMovieCredits = async (id) => {
  try {
    console.log('👥 Fetching movie credits for ID:', id)
    const response = await api.get(`/movie/${id}/credits`)
    console.log('👥 Credits fetched:', response.data.cast?.length, 'cast members')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching movie credits:', error)
    throw new Error(`Failed to fetch movie credits: ${error.message}`)
  }
}

export const fetchMovieImages = async (id) => {
  try {
    console.log('🖼️ Fetching movie images for ID:', id)
    const response = await api.get(`/movie/${id}/images`)
    console.log('🖼️ Images fetched:', response.data.backdrops?.length, 'backdrops')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching movie images:', error)
    throw new Error(`Failed to fetch movie images: ${error.message}`)
  }
}

export const fetchMovieVideos = async (id) => {
  try {
    console.log('📹 Fetching movie videos for ID:', id)
    const response = await api.get(`/movie/${id}/videos`)
    console.log('📹 Videos fetched:', response.data.results?.length, 'videos')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching movie videos:', error)
    throw new Error(`Failed to fetch movie videos: ${error.message}`)
  }
}

export const fetchMovieReviews = async (id, page = 1) => {
  try {
    console.log('📝 Fetching movie reviews for ID:', id)
    const response = await api.get(`/movie/${id}/reviews`, {
      params: { page }
    })
    console.log('📝 Reviews fetched:', response.data.results?.length, 'reviews')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching movie reviews:', error)
    throw new Error(`Failed to fetch movie reviews: ${error.message}`)
  }
}

export const fetchSimilarMovies = async (id) => {
  try {
    console.log('🔗 Fetching similar movies for ID:', id)
    const response = await api.get(`/movie/${id}/similar`)
    console.log('🔗 Similar movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching similar movies:', error)
    throw new Error(`Failed to fetch similar movies: ${error.message}`)
  }
}

export const fetchRecommendedMovies = async (id) => {
  try {
    console.log('💡 Fetching recommended movies for ID:', id)
    const response = await api.get(`/movie/${id}/recommendations`)
    console.log('💡 Recommended movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching recommended movies:', error)
    throw new Error(`Failed to fetch recommended movies: ${error.message}`)
  }
}

// 高级搜索函数
export const discoverMovies = async (filters = {}) => {
  try {
    console.log('🎯 Discovering movies with filters:', filters)
    const params = {
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
      ...filters
    }
    
    const response = await api.get('/discover/movie', { params })
    console.log('🎯 Discovered movies:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error discovering movies:', error)
    throw new Error(`Failed to discover movies: ${error.message}`)
  }
}

// 趋势电影
export const fetchTrendingMovies = async (timeWindow = 'week') => {
  try {
    console.log('📈 Fetching trending movies:', timeWindow)
    const response = await api.get(`/trending/movie/${timeWindow}`)
    console.log('📈 Trending movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching trending movies:', error)
    throw new Error(`Failed to fetch trending movies: ${error.message}`)
  }
}

// 即将上映
export const fetchUpcomingMovies = async (page = 1) => {
  try {
    console.log('🔮 Fetching upcoming movies, page:', page)
    const response = await api.get('/movie/upcoming', {
      params: { page }
    })
    console.log('🔮 Upcoming movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching upcoming movies:', error)
    throw new Error(`Failed to fetch upcoming movies: ${error.message}`)
  }
}

// 正在热映
export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    console.log('🎪 Fetching now playing movies, page:', page)
    const response = await api.get('/movie/now_playing', {
      params: { page }
    })
    console.log('🎪 Now playing movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching now playing movies:', error)
    throw new Error(`Failed to fetch now playing movies: ${error.message}`)
  }
}

// 评分最高
export const fetchTopRatedMovies = async (page = 1) => {
  try {
    console.log('⭐ Fetching top rated movies, page:', page)
    const response = await api.get('/movie/top_rated', {
      params: { page }
    })
    console.log('⭐ Top rated movies fetched:', response.data.results?.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching top rated movies:', error)
    throw new Error(`Failed to fetch top rated movies: ${error.message}`)
  }
}