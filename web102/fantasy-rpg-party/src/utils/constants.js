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

// Preset avatars
export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150'
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