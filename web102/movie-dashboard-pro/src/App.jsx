// src/App.jsx - 消除React Router警告
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
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

// 路由配置 - 添加 future flags 消除警告
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
], {
  future: {
    v7_startTransition: true, // 启用未来特性，消除警告
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  )
}

export default App