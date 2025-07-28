import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* 头部导航 */}
      <header className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
            >
              <span className="text-2xl">⚔️</span>
              <h1 className="text-xl font-bold">Fantasy RPG Party</h1>
            </Link>
            
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Party List
              </Link>
              <Link
                to="/create"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/create'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                Create Member
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-black bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Fantasy RPG Party Manager. Build your adventure team!
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout