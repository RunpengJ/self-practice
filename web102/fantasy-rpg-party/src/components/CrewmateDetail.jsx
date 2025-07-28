import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCrewmateById, deleteCrewmate } from '../api/supabaseClient'
import { CLASSES, RACES, ALIGNMENTS } from '../utils/constants'
import { formatDate, generateAvatarColor } from '../utils/helpers'

function CrewmateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCrewmate()
  }, [id])

  const loadCrewmate = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCrewmateById(id)
      setCrewmate(data)
    } catch (err) {
      console.error('Error loading crewmate:', err)
      setError('Failed to load crewmate details.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${crewmate.name}? This action cannot be undone.`)) {
      return
    }

    try {
      await deleteCrewmate(id)
      navigate('/')
    } catch (err) {
      console.error('Error deleting crewmate:', err)
      alert('Failed to delete crewmate. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading crewmate details...</p>
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
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Back to Party List
        </Link>
      </div>
    )
  }

  if (!crewmate) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-gray-400 text-xl mb-4">🤷‍♂️</div>
        <h2 className="text-xl font-bold text-white mb-2">Crewmate Not Found</h2>
        <p className="text-gray-300 mb-4">The requested party member could not be found.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Back to Party List
        </Link>
      </div>
    )
  }

  const classInfo = CLASSES[crewmate.class] || {}
  const raceInfo = RACES[crewmate.race] || {}
  const alignmentInfo = ALIGNMENTS[crewmate.alignment] || {}

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-4"
        >
          <span className="mr-2">←</span>
          Back to Party List
        </Link>
        <h1 className="text-3xl font-bold text-white">Party Member Details</h1>
      </div>

      {/* Main Info Card */}
      <div className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            {crewmate.avatar_url ? (
              <img
                src={crewmate.avatar_url}
                alt={crewmate.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white border-opacity-30 mx-auto md:mx-0"
              />
            ) : (
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white border-opacity-30 mx-auto md:mx-0 ${generateAvatarColor(
                  crewmate.name
                )}`}
              >
                {crewmate.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-4">{crewmate.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Class */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Class</div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-2xl mr-2">{classInfo.icon}</span>
                  <span className="text-white font-semibold">{classInfo.name}</span>
                </div>
              </div>

              {/* Race */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Race</div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-2xl mr-2">{raceInfo.icon}</span>
                  <span className="text-white font-semibold">{raceInfo.name}</span>
                </div>
              </div>

              {/* Alignment */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Alignment</div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="text-2xl mr-2">{alignmentInfo.icon}</span>
                  <span className="text-white font-semibold">{alignmentInfo.name}</span>
                </div>
              </div>
            </div>

            {/* Race Bonus */}
            {raceInfo.bonus && (
              <div className="bg-blue-600 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-lg p-3 mb-4">
                <div className="text-blue-300 text-sm font-medium">Racial Bonus</div>
                <div className="text-white">{raceInfo.bonus}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attributes & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Class Attributes */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Class Attributes</h3>
          
          <div className="space-y-4">
            {crewmate.weapon_proficiency && (
              <div>
                <div className="text-gray-400 text-sm">Weapon Proficiency</div>
                <div className="text-white font-medium">⚔️ {crewmate.weapon_proficiency}</div>
              </div>
            )}
            
            {crewmate.magic_school && (
              <div>
                <div className="text-gray-400 text-sm">Magic School</div>
                <div className="text-white font-medium">🔮 {crewmate.magic_school}</div>
              </div>
            )}
            
            {(!crewmate.weapon_proficiency && !crewmate.magic_school) && (
              <div className="text-gray-400 italic">No special attributes assigned</div>
            )}
          </div>
        </div>

        {/* Special Skills */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Special Skills</h3>
          
          {crewmate.special_skills && crewmate.special_skills.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {crewmate.special_skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-5 rounded-lg p-3 flex items-center"
                >
                  <span className="text-yellow-400 mr-2">✨</span>
                  <span className="text-white">{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic">No special skills learned</div>
          )}
        </div>
      </div>

      {/* Backstory */}
      {crewmate.backstory && (
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Character Backstory</h3>
          <div className="bg-white bg-opacity-5 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {crewmate.backstory}
            </p>
          </div>
        </div>
      )}

      {/* Character Timeline */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Character Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white border-opacity-10">
            <span className="text-gray-300">Created</span>
            <span className="text-white">{formatDate(crewmate.created_at)}</span>
          </div>
          {crewmate.updated_at && crewmate.updated_at !== crewmate.created_at && (
            <div className="flex items-center justify-between py-2 border-b border-white border-opacity-10">
              <span className="text-gray-300">Last Updated</span>
              <span className="text-white">{formatDate(crewmate.updated_at)}</span>
            </div>
          )}
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-300">Status</span>
            <span className="text-green-400 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Character Stats Summary */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Character Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Role in Party</h4>
            <div className="space-y-2">
              <div className="text-gray-300">
                <strong className="text-white">Primary Role:</strong> {classInfo.name}
              </div>
              {alignmentInfo.description && (
                <div className="text-gray-300">
                  <strong className="text-white">Personality:</strong> {alignmentInfo.description}
                </div>
              )}
              <div className="text-gray-300">
                <strong className="text-white">Skills Count:</strong> {crewmate.special_skills ? crewmate.special_skills.length : 0}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Equipment & Magic</h4>
            <div className="space-y-2">
              {crewmate.weapon_proficiency && (
                <div className="text-gray-300">
                  <strong className="text-white">Primary Weapon:</strong> {crewmate.weapon_proficiency}
                </div>
              )}
              {crewmate.magic_school && (
                <div className="text-gray-300">
                  <strong className="text-white">Magic Specialization:</strong> {crewmate.magic_school}
                </div>
              )}
              {!crewmate.weapon_proficiency && !crewmate.magic_school && (
                <div className="text-gray-400 italic">No specialized equipment or magic</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4">
            <Link
              to={`/edit/${crewmate.id}`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">✏️</span>
              Edit Character
            </Link>
            
            <Link
              to="/"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">👥</span>
              Back to Party
            </Link>
          </div>
          
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center"
          >
            <span className="mr-2">🗑️</span>
            Delete Character
          </button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm mb-4">Quick Actions</p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/create"
            className="text-green-400 hover:text-green-300 transition-colors text-sm"
          >
            + Create New Member
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            📊 View Party Stats
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail