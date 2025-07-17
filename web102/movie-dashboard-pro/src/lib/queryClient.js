// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分钟内数据不会过期
      gcTime: 1000 * 60 * 30, // 30分钟后清除缓存 (v5中cacheTime改名为gcTime)
      retry: (failureCount, error) => {
        // 404错误不重试
        if (error.response?.status === 404) return false
        // 其他错误最多重试2次
        return failureCount < 2
      },
      refetchOnWindowFocus: false, // 窗口聚焦时不自动重新获取
      refetchOnReconnect: true, // 网络重连时重新获取
    }
  }
})

// 开发环境下启用 React Query DevTools
if (import.meta.env.DEV) {
  import('@tanstack/react-query-devtools').then(({ ReactQueryDevtools }) => {
    // 可以在开发中添加 DevTools
  })
}