// 临时测试组件 - 可以添加到您的Dashboard中进行测试
// src/components/debug/ApiTest.jsx

import { useState } from 'react'
import { useMovieDetails } from '../../hooks/queries/useMovies'

const ApiTest = () => {
  const [testId, setTestId] = useState('550') // Fight Club的ID作为测试
  const { data, isLoading, error, isError } = useMovieDetails(testId)

  const runTest = () => {
    console.clear()
    console.log('=== API TEST STARTED ===')
    console.log('Testing movie ID:', testId)
    console.log('Environment variables:')
    console.log('- VITE_TMDB_API_KEY exists:', !!import.meta.env.VITE_TMDB_API_KEY)
    console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white text-sm max-w-sm">
      <h3 className="font-bold mb-2">🔧 API Debug Panel</h3>
      
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-gray-400">Test Movie ID:</label>
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
          />
        </div>
        
        <button
          onClick={runTest}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
        >
          Run Console Test
        </button>
        
        <div className="border-t border-white/20 pt-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={`text-xs ${isLoading ? 'text-yellow-400' : isError ? 'text-red-400' : 'text-green-400'}`}>
              {isLoading ? 'Loading...' : isError ? 'Error' : 'Success'}
            </span>
          </div>
          
          {isError && (
            <div className="text-red-400 text-xs">
              Error: {error?.message || 'Unknown error'}
            </div>
          )}
          
          {data && (
            <div className="text-green-400 text-xs">
              ✅ Movie: {data.title} ({data.release_date?.split('-')[0]})
            </div>
          )}
        </div>
        
        <div className="border-t border-white/20 pt-2">
          <div className="text-xs text-gray-400">
            Check browser console for detailed logs
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTest

// 如何使用这个组件：
// 1. 将此文件保存为 src/components/debug/ApiTest.jsx
// 2. 在您的 Dashboard.jsx 中导入并添加：
// import ApiTest from '../components/debug/ApiTest'
// 
// 然后在Dashboard的return中添加：
// {process.env.NODE_ENV === 'development' && <ApiTest />}