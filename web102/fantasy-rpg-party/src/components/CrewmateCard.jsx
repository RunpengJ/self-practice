import React from 'react'
import { Link } from 'react-router-dom'
import { CLASSES, RACES, ALIGNMENTS } from '../utils/constants'
import { generateAvatarColor, formatDate } from '../utils/helpers'

function CrewmateCard({ crewmate, onDelete }) {
  const classInfo = CLASSES[crewmate.class] || {}
  const raceInfo = RACES[crewmate.race] || {}
  const alignmentInfo = ALIGNMENTS[crewmate.alignment] || {}

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (window.confirm(`Are you sure you want to delete ${crewmate.name}?`)) {
      await onDelete(crewmate.id)
    }
  }

  return (
    <div className="glass-card p-6 hover:bg-white hover:bg-opacity-20 transition-all duration-300 group">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {crewmate.avatar_url ? (
            <img
              src={crewmate.avatar_url}
              alt={crewmate.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white border-opacity-30"
            />
          ) : (
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white border-opacity-30 ${generateAvatarColor(
                crewmate.name
              )}`}
            >
              {crewmate.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-yellow-300 transition-colors">
              {crewmate.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <span className="text-2xl" title={alignmentInfo.name}>
                {alignmentInfo.icon}
              </span>
            </div>
          </div>

          {/* Class and Race */}
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <span className="text-lg">{classInfo.icon}</span>
              <span className="text-gray-300 font-medium">{classInfo.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-lg">{raceInfo.icon}</span>
              <span className="text-gray-300">{raceInfo.name}</span>
            </div>
          </div>

          {/* Special Attributes */}
          <div className="mt-3 space-y-1">
            {crewmate.weapon_proficiency && (
              <div className="text-sm text-gray-400">
                <span className="font-medium">Weapon:</span> {crewmate.weapon_proficiency}
              </div>
            )}
            {crewmate.magic_school && (
              <div className="text-sm text-gray-400">
                <span className="font-medium">Magic:</span> {crewmate.magic_school}
              </div>
            )}
            {crewmate.special_skills && crewmate.special_skills.length > 0 && (
              <div className="text-sm text-gray-400">
                <span className="font-medium">Skills:</span> {crewmate.special_skills.slice(0, 2).join(', ')}
                {crewmate.special_skills.length > 2 && '...'}
              </div>
            )}
          </div>

          {/* Backstory Preview */}
          {crewmate.backstory && (
            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
              {crewmate.backstory.length > 100
                ? `${crewmate.backstory.substring(0, 100)}...`
                : crewmate.backstory}
            </p>
          )}

          {/* Created Date */}
          <div className="mt-3 text-xs text-gray-500">
            Created: {formatDate(crewmate.created_at)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white border-opacity-10">
        <div className="flex space-x-2">
          <Link
            to={`/crewmates/${crewmate.id}`}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/edit/${crewmate.id}`}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default CrewmateCard