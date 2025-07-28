import { CLASSES, RACES, ALIGNMENTS, TEAM_BALANCE_RULES } from './constants'

// Calculate team statistics
export function calculateTeamStats(crewmates) {
  if (!crewmates || crewmates.length === 0) {
    return {
      totalMembers: 0,
      classCounts: {},
      raceCounts: {},
      alignmentCounts: {},
      successRate: 0
    }
  }

  const classCounts = {}
  const raceCounts = {}
  const alignmentCounts = {}

  crewmates.forEach(member => {
    // Count class distribution
    classCounts[member.class] = (classCounts[member.class] || 0) + 1
    
    // Count race distribution
    raceCounts[member.race] = (raceCounts[member.race] || 0) + 1
    
    // Count alignment distribution
    alignmentCounts[member.alignment] = (alignmentCounts[member.alignment] || 0) + 1
  })

  return {
    totalMembers: crewmates.length,
    classCounts,
    raceCounts,
    alignmentCounts,
    successRate: calculateSuccessRate(classCounts, crewmates.length)
  }
}

// Calculate team success rate
export function calculateSuccessRate(classCounts, totalMembers) {
  if (totalMembers === 0) return 0
  
  const { minSize, maxSize, idealComposition } = TEAM_BALANCE_RULES
  
  // Base score
  let score = 50
  
  // Team size evaluation
  if (totalMembers < minSize) {
    score -= (minSize - totalMembers) * 15
  } else if (totalMembers > maxSize) {
    score -= (totalMembers - maxSize) * 10
  } else {
    score += 10 // Bonus for appropriate size
  }
  
  // Class composition evaluation
  Object.entries(idealComposition).forEach(([className, { min, max }]) => {
    const count = classCounts[className] || 0
    
    if (count < min) {
      score -= (min - count) * 20 // Penalty for missing key classes
    } else if (count > max) {
      score -= (count - max) * 10 // Penalty for too many of one class
    } else {
      score += 15 // Bonus for balanced composition
    }
  })
  
  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score))
}

// Get class-specific attributes
export function getClassAttributes(className) {
  const classInfo = CLASSES[className]
  if (!classInfo) return {}
  
  return {
    weaponProficiencies: classInfo.weaponProficiencies || [],
    magicSchools: classInfo.magicSchools || [],
    availableSkills: classInfo.availableSkills || []
  }
}

// Validate form data
export function validateCrewmateData(data) {
  const errors = {}
  
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name cannot be empty'
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name cannot exceed 50 characters'
  }
  
  if (!data.class || !CLASSES[data.class]) {
    errors.class = 'Please select a valid class'
  }
  
  if (!data.race || !RACES[data.race]) {
    errors.race = 'Please select a valid race'
  }
  
  if (!data.alignment || !ALIGNMENTS[data.alignment]) {
    errors.alignment = 'Please select a valid alignment'
  }
  
  // Validate class-specific attributes
  if (data.class) {
    const classInfo = CLASSES[data.class]
    
    if (classInfo.weaponProficiencies && data.weapon_proficiency) {
      if (!classInfo.weaponProficiencies.includes(data.weapon_proficiency)) {
        errors.weapon_proficiency = 'Selected weapon proficiency does not match class'
      }
    }
    
    if (classInfo.magicSchools && data.magic_school) {
      if (!classInfo.magicSchools.includes(data.magic_school)) {
        errors.magic_school = 'Selected magic school does not match class'
      }
    }
  }
  
  if (data.backstory && data.backstory.length > 500) {
    errors.backstory = 'Backstory cannot exceed 500 characters'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Format date
export function formatDate(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Generate random avatar color
export function generateAvatarColor(name) {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}