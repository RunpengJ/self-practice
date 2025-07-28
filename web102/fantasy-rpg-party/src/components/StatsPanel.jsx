import React from 'react'
import { CLASSES, RACES, ALIGNMENTS } from '../utils/constants'

function StatsPanel({ stats }) {
  const { totalMembers, classCounts, raceCounts, alignmentCounts, successRate } = stats

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return 'text-green-400'
    if (rate >= 60) return 'text-yellow-400'
    if (rate >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getSuccessRateDescription = (rate) => {
    if (rate >= 80) return 'Excellent'
    if (rate >= 60) return 'Good'
    if (rate >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="glass-card p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">📊</span>
        Party Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Members */}
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">{totalMembers}</div>
          <div className="text-gray-300">Total Members</div>
        </div>

        {/* Success Rate */}
        <div className="text-center">
          <div className={`text-3xl font-bold mb-2 ${getSuccessRateColor(successRate)}`}>
            {successRate.toFixed(0)}%
          </div>
          <div className="text-gray-300">Success Rate</div>
          <div className={`text-sm ${getSuccessRateColor(successRate)}`}>
            {getSuccessRateDescription(successRate)}
          </div>
        </div>

        {/* Class Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Classes</h3>
          <div className="space-y-2">
            {Object.entries(CLASSES).map(([key, classInfo]) => {
              const count = classCounts[key] || 0
              const percentage = totalMembers > 0 ? (count / totalMembers) * 100 : 0
              
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{classInfo.icon}</span>
                    <span className="text-gray-300 text-sm">{classInfo.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Race & Alignment Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Races</h3>
          <div className="space-y-2 mb-4">
            {Object.entries(RACES).map(([key, raceInfo]) => {
              const count = raceCounts[key] || 0
              
              return count > 0 ? (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{raceInfo.icon}</span>
                    <span className="text-gray-300 text-sm">{raceInfo.name}</span>
                  </div>
                  <span className="text-white text-sm">{count}</span>
                </div>
              ) : null
            })}
          </div>

          <h3 className="text-lg font-semibold text-white mb-3">Alignments</h3>
          <div className="space-y-2">
            {Object.entries(ALIGNMENTS).map(([key, alignmentInfo]) => {
              const count = alignmentCounts[key] || 0
              
              return count > 0 ? (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{alignmentInfo.icon}</span>
                    <span className="text-gray-300 text-sm">{alignmentInfo.name}</span>
                  </div>
                  <span className="text-white text-sm">{count}</span>
                </div>
              ) : null
            })}
          </div>
        </div>
      </div>

      {/* Team Balance Recommendations */}
      {totalMembers > 0 && (
        <div className="mt-6 pt-6 border-t border-white border-opacity-10">
          <h3 className="text-lg font-semibold text-white mb-3">Team Balance Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-300">
              <strong className="text-white">Ideal Party Size:</strong> 2-6 members
            </div>
            <div className="text-sm text-gray-300">
              <strong className="text-white">Recommended Classes:</strong> 1-2 Warriors, 1-2 Mages, 1 Healer
            </div>
          </div>
          
          {successRate < 60 && (
            <div className="mt-3 p-3 bg-yellow-600 bg-opacity-20 rounded-md border border-yellow-500 border-opacity-30">
              <p className="text-yellow-300 text-sm">
                <strong>Tip:</strong> Consider adding a {!classCounts.healer ? 'Healer' : !classCounts.warrior ? 'Warrior' : 'Mage'} to improve team balance.
              </p>
            </div>
          )}
        </div>
      )}

      {totalMembers === 0 && (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏰</div>
          <h3 className="text-xl font-semibold text-white mb-2">No Party Members Yet</h3>
          <p className="text-gray-300 mb-4">Start building your adventure party by creating your first member!</p>
        </div>
      )}
    </div>
  )
}

export default StatsPanel