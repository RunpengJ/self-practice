import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCrewmates, deleteCrewmate } from '../api/supabaseClient'
import { calculateTeamStats } from '../utils/helpers'
import CrewmateCard from './CrewmateCard'
import StatsPanel from './StatsPanel'

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalMembers: 0,
    classCounts: {},
    raceCounts: {},
    alignmentCounts: {},
    successRate: 0
  })

  // Load crewmates on component mount
  useEffect(() => {
    loadCrewmates()
  }, [])

  // Update stats when crewmates change
  useEffect(() => {
    const newStats = calculateTeamStats(crewmates)
    setStats(newStats)
  }, [crewmates])

  const loadCrewmates = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCrewmates()
      setCrewmates(data)
    } catch (err) {
      console.error('Error loading crewmates:', err)
      setError('Failed to load party members. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCrewmate(id)
      // Remove from local state
      setCrewmates(prevCrewmates => 
        prevCrewmates.filter(crewmate => crewmate.id !== id)
      )
    } catch (err) {
      console.error('Error deleting crewmate:', err)
      alert('Failed to delete party member. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your party...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-red-400 text-xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-gray-300 mb-4">{error}</p>
        <button
          onClick={loadCrewmates}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Fantasy RPG Adventure Party
          </h1>
          <p className="text-gray-300">
            Manage your party members and track team balance
          </p>
        </div>
        <Link
          to="/create"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          + Add New Member
        </Link>
      </div>

      {/* Statistics Panel */}
      <StatsPanel stats={stats} />

      {/* Party Members Grid */}
      {crewmates.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Party Members ({crewmates.length})
            </h2>
            <div className="text-sm text-gray-300">
              Sorted by creation date (newest first)
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {crewmates.map((crewmate) => (
              <CrewmateCard
                key={crewmate.id}
                crewmate={crewmate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-6">🏰</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Your Adventure Awaits!
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            You haven't created any party members yet. Start building your legendary team by adding your first adventurer.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="mr-2">⚔️</span>
            Create Your First Member
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      {crewmates.length > 0 && (
        <div className="mt-12 glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadCrewmates}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
            >
              🔄 Refresh List
            </button>
            <Link
              to="/create"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors"
            >
              ➕ Add Member
            </Link>
            {stats.successRate < 60 && (
              <div className="px-4 py-2 bg-yellow-600 bg-opacity-20 border border-yellow-500 border-opacity-30 text-yellow-300 rounded-md text-sm">
                💡 Consider improving team balance
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CrewmateList