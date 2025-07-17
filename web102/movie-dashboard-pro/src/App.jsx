// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/queryClient'

// Layout
import AppLayout from './components/layout/AppLayout'

// Pages
import Dashboard from './pages/Dashboard'
import MovieDetail from './pages/MovieDetail'
import ChartsPage from './pages/ChartsPage'
import SearchPage from './pages/SearchPage'
import TrendingPage from './pages/TrendingPage'
import WatchlistPage from './pages/WatchlistPage'

// Error Components
import ErrorBoundary from './components/common/ErrorBoundary'
import NotFoundPage from './pages/NotFoundPage'

// 路由配置
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "charts",
        element: <ChartsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "trending",
        element: <TrendingPage />,
      },
      {
        path: "watchlist",
        element: <WatchlistPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <RouterProvider router={router} />
      </div>
      
      {/* 开发环境下显示 React Query DevTools */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}

export default App