import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCrewmate, updateCrewmate, getCrewmateById, checkNameExists } from '../api/supabaseClient'
import { CLASSES, RACES, ALIGNMENTS, AVATAR_PRESETS } from '../utils/constants'
import { validateCrewmateData, getClassAttributes } from '../utils/helpers'

function CrewmateForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    weapon_proficiency: '',
    magic_school: '',
    alignment: '',
    race: '',
    special_skills: [],
    backstory: '',
    avatar_url: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditing)
  const [classAttributes, setClassAttributes] = useState({})
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  // Load existing crewmate data if editing
  useEffect(() => {
    if (isEditing) {
      loadCrewmate()
    }
  }, [id])

  // Update class attributes when class changes
  useEffect(() => {
    if (formData.class) {
      const attributes = getClassAttributes(formData.class)
      setClassAttributes(attributes)
      
      // Clear class-specific fields when class changes
      setFormData(prev => ({
        ...prev,
        weapon_proficiency: '',
        magic_school: ''
      }))
    }
  }, [formData.class])

  const loadCrewmate = async () => {
    try {
      setInitialLoading(true)
      const crewmate = await getCrewmateById(id)
      setFormData({
        name: crewmate.name || '',
        class: crewmate.class || '',
        weapon_proficiency: crewmate.weapon_proficiency || '',
        magic_school: crewmate.magic_school || '',
        alignment: crewmate.alignment || '',
        race: crewmate.race || '',
        special_skills: crewmate.special_skills || [],
        backstory: crewmate.backstory || '',
        avatar_url: crewmate.avatar_url || ''
      })
    } catch (err) {
      console.error('Error loading crewmate:', err)
      alert('Failed to load crewmate data. Redirecting to list.')
      navigate('/')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      special_skills: prev.special_skills.includes(skill)
        ? prev.special_skills.filter(s => s !== skill)
        : [...prev.special_skills, skill]
    }))
  }

  const handleAvatarSelect = (avatarUrl) => {
    setFormData(prev => ({
      ...prev,
      avatar_url: avatarUrl
    }))
    setShowAvatarPicker(false)
  }

  const validateForm = async () => {
    const validation = validateCrewmateData(formData)
    let formErrors = validation.errors

    // Check name uniqueness
    if (formData.name.trim()) {
      try {
        const nameExists = await checkNameExists(formData.name.trim(), isEditing ? id : null)
        if (nameExists) {
          formErrors.name = 'A crewmate with this name already exists'
        }
      } catch (err) {
        console.error('Error checking name uniqueness:', err)
      }
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isValid = await validateForm()
    if (!isValid) return

    try {
      setLoading(true)
      
      const submitData = {
        ...formData,
        name: formData.name.trim()
      }

      if (isEditing) {
        await updateCrewmate(id, submitData)
      } else {
        await createCrewmate(submitData)
      }

      navigate('/')
    } catch (err) {
      console.error('Error saving crewmate:', err)
      alert(`Failed to ${isEditing ? 'update' : 'create'} crewmate. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading crewmate data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isEditing ? `Edit ${formData.name || 'Crewmate'}` : 'Create New Crewmate'}
        </h1>
        <p className="text-gray-300">
          {isEditing ? 'Update your party member\'s information' : 'Add a new member to your adventure party'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-white border-opacity-20'
                }`}
                placeholder="Enter crewmate name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Class *
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.class ? 'border-red-500' : 'border-white border-opacity-20'
                }`}
              >
                <option value="">Select a class</option>
                {Object.entries(CLASSES).map(([key, classInfo]) => (
                  <option key={key} value={key} className="bg-gray-800">
                    {classInfo.icon} {classInfo.name}
                  </option>
                ))}
              </select>
              {errors.class && (
                <p className="mt-1 text-sm text-red-400">{errors.class}</p>
              )}
            </div>

            {/* Race */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Race *
              </label>
              <select
                name="race"
                value={formData.race}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.race ? 'border-red-500' : 'border-white border-opacity-20'
                }`}
              >
                <option value="">Select a race</option>
                {Object.entries(RACES).map(([key, raceInfo]) => (
                  <option key={key} value={key} className="bg-gray-800">
                    {raceInfo.icon} {raceInfo.name}
                  </option>
                ))}
              </select>
              {errors.race && (
                <p className="mt-1 text-sm text-red-400">{errors.race}</p>
              )}
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alignment *
              </label>
              <select
                name="alignment"
                value={formData.alignment}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.alignment ? 'border-red-500' : 'border-white border-opacity-20'
                }`}
              >
                <option value="">Select alignment</option>
                {Object.entries(ALIGNMENTS).map(([key, alignmentInfo]) => (
                  <option key={key} value={key} className="bg-gray-800">
                    {alignmentInfo.icon} {alignmentInfo.name}
                  </option>
                ))}
              </select>
              {errors.alignment && (
                <p className="mt-1 text-sm text-red-400">{errors.alignment}</p>
              )}
            </div>
          </div>
        </div>

        {/* Class-Specific Attributes */}
        {formData.class && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Class Attributes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weapon Proficiency */}
              {classAttributes.weaponProficiencies && classAttributes.weaponProficiencies.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weapon Proficiency
                  </label>
                  <select
                    name="weapon_proficiency"
                    value={formData.weapon_proficiency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select weapon</option>
                    {classAttributes.weaponProficiencies.map((weapon) => (
                      <option key={weapon} value={weapon} className="bg-gray-800">
                        {weapon}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Magic School */}
              {classAttributes.magicSchools && classAttributes.magicSchools.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Magic School
                  </label>
                  <select
                    name="magic_school"
                    value={formData.magic_school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select magic school</option>
                    {classAttributes.magicSchools.map((school) => (
                      <option key={school} value={school} className="bg-gray-800">
                        {school}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Special Skills */}
            {classAttributes.availableSkills && classAttributes.availableSkills.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Special Skills
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {classAttributes.availableSkills.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 cursor-pointer p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.special_skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 text-blue-600 bg-transparent border-2 border-white border-opacity-30 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Avatar Selection */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Avatar</h2>
          
          <div className="flex items-center space-x-4">
            {formData.avatar_url ? (
              <img
                src={formData.avatar_url}
                alt="Selected avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-white border-opacity-30"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-gray-400">
                No Avatar
              </div>
            )}
            
            <div>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors mr-2"
              >
                Choose Avatar
              </button>
              {formData.avatar_url && (
                <button
                  type="button"
                  onClick={() => handleAvatarSelect('')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {showAvatarPicker && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {AVATAR_PRESETS.map((avatarUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAvatarSelect(avatarUrl)}
                  className="w-20 h-20 rounded-full overflow-hidden border-2 border-white border-opacity-30 hover:border-opacity-60 transition-colors"
                >
                  <img
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Backstory */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Backstory</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Character Background (Optional)
            </label>
            <textarea
              name="backstory"
              value={formData.backstory}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.backstory ? 'border-red-500' : 'border-white border-opacity-20'
              }`}
              placeholder="Tell the story of your character's past, motivations, and personality..."
            />
            <div className="flex justify-between mt-1">
              {errors.backstory && (
                <p className="text-sm text-red-400">{errors.backstory}</p>
              )}
              <p className="text-sm text-gray-400 ml-auto">
                {formData.backstory.length}/500 characters
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="glass-card p-8">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                `${isEditing ? 'Update' : 'Create'} Crewmate`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CrewmateForm