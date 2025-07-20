// src/hooks/queries/useMovies.js - 添加调试信息的版本
import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchGenres,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  searchMovies,
  discoverMovies
} from '../../utils/api'

// 电影详情查询 - 添加详细调试
export const useMovieDetails = (id) => {
  console.log('useMovieDetails - Called with ID:', id)
  
  return useQuery({
    queryKey: ['movie', 'details', id],
    queryFn: async () => {
      console.log('useMovieDetails - Fetching data for ID:', id)
      try {
        const result = await fetchMovieDetails(id)
        console.log('useMovieDetails - Success:', result)
        return result
      } catch (error) {
        console.error('useMovieDetails - Error:', error)
        throw error
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10分钟缓存
    retry: (failureCount, error) => {
      console.log('useMovieDetails - Retry attempt:', failureCount, error)
      if (error.response?.status === 404) return false
      return failureCount < 2
    },
    onError: (error) => {
      console.error('useMovieDetails - Query Error:', error)
    },
    onSuccess: (data) => {
      console.log('useMovieDetails - Query Success:', data)
    }
  })
}

// 基础电影数据查询
export const useMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => fetchPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5分钟
    keepPreviousData: true,
    onError: (error) => {
      console.error('useMovies - Error:', error)
    }
  })
}

// 类型数据查询
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60, // 1小时缓存，类型数据变化很少
    onError: (error) => {
      console.error('useGenres - Error:', error)
    }
  })
}

// 趋势电影查询
export const useTrendingMovies = (timeWindow = 'week') => {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => fetchTrendingMovies(timeWindow),
    staleTime: 1000 * 60 * 30, // 30分钟
    onError: (error) => {
      console.error('useTrendingMovies - Error:', error)
    }
  })
}

// 即将上映电影查询
export const useUpcomingMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => fetchUpcomingMovies(page),
    staleTime: 1000 * 60 * 60, // 1小时，即将上映数据更新不频繁
    keepPreviousData: true,
    onError: (error) => {
      console.error('useUpcomingMovies - Error:', error)
    }
  })
}

// 正在热映电影查询
export const useNowPlayingMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'now_playing', page],
    queryFn: () => fetchNowPlayingMovies(page),
    staleTime: 1000 * 60 * 15, // 15分钟
    keepPreviousData: true,
    onError: (error) => {
      console.error('useNowPlayingMovies - Error:', error)
    }
  })
}

// 评分最高电影查询
export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: ['movies', 'top_rated', page],
    queryFn: () => fetchTopRatedMovies(page),
    staleTime: 1000 * 60 * 60, // 1小时，评分最高的数据比较稳定
    keepPreviousData: true,
    onError: (error) => {
      console.error('useTopRatedMovies - Error:', error)
    }
  })
}

// 搜索电影查询
export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query && query.length > 0,
    staleTime: 1000 * 60 * 5, // 5分钟
    keepPreviousData: true,
    onError: (error) => {
      console.error('useSearchMovies - Error:', error)
    }
  })
}

// 无限滚动查询
export const useInfiniteMovies = (searchQuery = '') => {
  return useInfiniteQuery({
    queryKey: ['movies', 'infinite', searchQuery],
    queryFn: ({ pageParam = 1 }) => 
      searchQuery ? searchMovies(searchQuery, pageParam) : fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      console.error('useInfiniteMovies - Error:', error)
    }
  })
}

// 高级搜索查询
export const useDiscoverMovies = (filters = {}) => {
  return useQuery({
    queryKey: ['movies', 'discover', filters],
    queryFn: () => discoverMovies(filters),
    enabled: Object.keys(filters).length > 0,
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
    onError: (error) => {
      console.error('useDiscoverMovies - Error:', error)
    }
  })
}

// 图表数据查询 - 基于现有电影数据计算
export const useChartData = (movies, genres) => {
  return useQuery({
    queryKey: ['chart', 'data', movies?.length, genres?.length],
    queryFn: async () => {
      if (!movies || !genres) return null
      
      const { processChartData } = await import('../../lib/utils')
      
      return {
        ratingDistribution: processChartData.ratingDistribution(movies),
        genrePopularity: processChartData.genrePopularity(movies, genres),
        yearlyTrends: processChartData.yearlyTrends(movies)
      }
    },
    enabled: !!(movies && movies.length > 0 && genres && genres.length > 0),
    staleTime: 1000 * 60 * 10,
    onError: (error) => {
      console.error('useChartData - Error:', error)
    }
  })
}

// 预获取相关数据的hook
export const usePrefetchMovieData = () => {
  const queryClient = useQueryClient()
  
  const prefetchMovieDetails = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['movie', 'details', id],
      queryFn: () => fetchMovieDetails(id),
      staleTime: 1000 * 60 * 10
    })
  }
  
  const prefetchNextPage = (currentPage, searchQuery = '') => {
    const nextPage = currentPage + 1
    queryClient.prefetchQuery({
      queryKey: searchQuery 
        ? ['movies', 'search', searchQuery, nextPage]
        : ['movies', 'popular', nextPage],
      queryFn: () => searchQuery 
        ? searchMovies(searchQuery, nextPage)
        : fetchPopularMovies(nextPage),
      staleTime: 1000 * 60 * 5
    })
  }
  
  return { 
    prefetchMovieDetails, 
    prefetchNextPage 
  }
}