// Class configurations
export const CLASSES = {
  warrior: {
    name: 'Warrior',
    icon: '⚔️',
    weaponProficiencies: ['Sword', 'Axe', 'Spear', 'Shield'],
    availableSkills: ['Heavy Strike', 'Defensive Stance', 'Battle Cry', 'Block']
  },
  mage: {
    name: 'Mage',
    icon: '🔮',
    magicSchools: ['Fire Magic', 'Ice Magic', 'Lightning Magic', 'Arcane Magic'],
    availableSkills: ['Fireball', 'Ice Shard', 'Lightning Chain', 'Magic Shield']
  },
  rogue: {
    name: 'Rogue',
    icon: '🗡️',
    weaponProficiencies: ['Dagger', 'Bow', 'Short Sword'],
    availableSkills: ['Stealth', 'Backstab', 'Lockpicking', 'Trap Detection']
  },
  healer: {
    name: 'Healer',
    icon: '🕊️',
    magicSchools: ['Healing Magic', 'Protection Magic', 'Purification Magic'],
    availableSkills: ['Heal', 'Group Heal', 'Resurrect', 'Dispel']
  }
}

// Race configurations
export const RACES = {
  human: {
    name: 'Human',
    icon: '👤',
    bonus: 'Versatile, +1 to all attributes'
  },
  elf: {
    name: 'Elf',
    icon: '🧝',
    bonus: 'Agility +2, Magic Affinity'
  },
  dwarf: {
    name: 'Dwarf',
    icon: '👨‍🦳',
    bonus: 'Constitution +2, Poison Resistance'
  },
  orc: {
    name: 'Orc',
    icon: '👹',
    bonus: 'Strength +2, Berserker Ability'
  }
}

// Alignment configurations
export const ALIGNMENTS = {
  good: {
    name: 'Good',
    icon: '😇',
    description: 'Righteous, merciful, protects the weak'
  },
  neutral: {
    name: 'Neutral',
    icon: '😐',
    description: 'Balanced, pragmatic'
  },
  evil: {
    name: 'Evil',
    icon: '😈',
    description: 'Selfish, cruel, seeks power'
  }
}

// Preset avatars - using more reliable sources
export const AVATAR_PRESETS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=warrior&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=mage&backgroundColor=c084fc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=rogue&backgroundColor=34d399',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=healer&backgroundColor=fbbf24',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=knight&backgroundColor=ef4444',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=wizard&backgroundColor=8b5cf6',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=archer&backgroundColor=10b981',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=cleric&backgroundColor=f59e0b',
  'https://api.dicebear.com/7.x/personas/svg?seed=fighter&backgroundColor=dc2626',
  'https://api.dicebear.com/7.x/personas/svg?seed=sorcerer&backgroundColor=7c3aed',
  'https://api.dicebear.com/7.x/personas/svg?seed=ranger&backgroundColor=059669',
  'https://api.dicebear.com/7.x/personas/svg?seed=paladin&backgroundColor=d97706'
]

// Team balance evaluation rules
export const TEAM_BALANCE_RULES = {
  minSize: 2,
  maxSize: 6,
  idealComposition: {
    warrior: { min: 1, max: 2 },
    mage: { min: 1, max: 2 },
    rogue: { min: 0, max: 1 },
    healer: { min: 1, max: 1 }
  }
}