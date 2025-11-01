// Brain Skill Tree Game Data
// Gamified version with unlock progression system

const gameSkillTree = {
  // Starting resources
  initialSkillPoints: 10,

  // Skill tree nodes with game mechanics
  nodes: {
    // TIER 1 - Starting regions (no prerequisites)
    brainstem: {
      id: 'brainstem',
      name: 'Brainstem',
      tier: 1,
      cost: 1,
      position: { x: 800, y: 800 },
      color: '#FCBAD3',
      description: 'The foundation of all brain functions. Controls basic life processes.',
      functions: [
        'Breathing Control',
        'Heart Rate Regulation',
        'Sleep-Wake Cycles',
        'Basic Reflexes'
      ],
      subRegions: [
        { name: 'Medulla Oblongata', bonus: 'Automatic vital functions' },
        { name: 'Pons', bonus: 'Sleep regulation' },
        { name: 'Midbrain', bonus: 'Eye movement control' }
      ],
      prerequisites: [],
      unlocks: ['cerebellum', 'limbic'],
      category: 'core'
    },

    // TIER 2 - Unlocked by tier 1
    cerebellum: {
      id: 'cerebellum',
      name: 'Cerebellum',
      tier: 2,
      cost: 2,
      position: { x: 650, y: 750 },
      color: '#AA96DA',
      description: 'The coordinator. Enables precise motor control and balance.',
      functions: [
        'Motor Coordination',
        'Balance & Posture',
        'Fine Motor Skills',
        'Motor Learning'
      ],
      subRegions: [
        { name: 'Cerebellar Cortex', bonus: '+25% movement precision' },
        { name: 'Deep Nuclei', bonus: 'Enhanced motor learning speed' }
      ],
      prerequisites: ['brainstem'],
      unlocks: ['frontal'],
      category: 'motor'
    },

    limbic: {
      id: 'limbic',
      name: 'Limbic System',
      tier: 2,
      cost: 2,
      position: { x: 950, y: 750 },
      color: '#FFFAAA',
      description: 'The emotional core. Processes emotions, memories, and drives.',
      functions: [
        'Emotion Processing',
        'Memory Formation',
        'Motivation & Drive',
        'Reward Processing'
      ],
      subRegions: [
        { name: 'Amygdala', bonus: 'Emotional intelligence +20%' },
        { name: 'Hippocampus', bonus: 'Memory capacity +30%' },
        { name: 'Hypothalamus', bonus: 'Homeostasis control' }
      ],
      prerequisites: ['brainstem'],
      unlocks: ['frontal', 'temporal'],
      category: 'core'
    },

    // TIER 3 - Mid-game regions
    frontal: {
      id: 'frontal',
      name: 'Frontal Lobe',
      tier: 3,
      cost: 3,
      position: { x: 400, y: 400 },
      color: '#FF6B6B',
      description: 'The executive. Makes decisions, plans, and controls behavior.',
      functions: [
        'Executive Functions',
        'Decision Making',
        'Problem Solving',
        'Impulse Control',
        'Speech Production'
      ],
      subRegions: [
        { name: 'Prefrontal Cortex', bonus: 'Strategic thinking +40%' },
        { name: 'Motor Cortex', bonus: 'Voluntary movement control' },
        { name: "Broca's Area", bonus: 'Speech production unlocked' }
      ],
      prerequisites: ['cerebellum', 'limbic'],
      unlocks: ['parietal', 'temporal', 'basal_ganglia'],
      category: 'cognitive'
    },

    temporal: {
      id: 'temporal',
      name: 'Temporal Lobe',
      tier: 3,
      cost: 3,
      position: { x: 600, y: 550 },
      color: '#95E1D3',
      description: 'The processor. Handles sound, memory, and language understanding.',
      functions: [
        'Auditory Processing',
        'Memory Retrieval',
        'Language Comprehension',
        'Facial Recognition'
      ],
      subRegions: [
        { name: 'Auditory Cortex', bonus: 'Sound recognition +35%' },
        { name: "Wernicke's Area", bonus: 'Language comprehension unlocked' },
        { name: 'Hippocampus', bonus: 'Long-term memory boost' }
      ],
      prerequisites: ['limbic'],
      unlocks: ['parietal', 'occipital'],
      category: 'sensory'
    },

    basal_ganglia: {
      id: 'basal_ganglia',
      name: 'Basal Ganglia',
      tier: 3,
      cost: 2,
      position: { x: 350, y: 650 },
      color: '#C7CEEA',
      description: 'The habit former. Controls movement initiation and procedural learning.',
      functions: [
        'Movement Initiation',
        'Habit Formation',
        'Procedural Learning',
        'Action Selection'
      ],
      subRegions: [
        { name: 'Striatum', bonus: 'Habit efficiency +50%' },
        { name: 'Substantia Nigra', bonus: 'Dopamine production boost' }
      ],
      prerequisites: ['frontal'],
      unlocks: [],
      category: 'motor'
    },

    // TIER 4 - Advanced regions
    parietal: {
      id: 'parietal',
      name: 'Parietal Lobe',
      tier: 4,
      cost: 3,
      position: { x: 800, y: 400 },
      color: '#4ECDC4',
      description: 'The integrator. Processes sensory information and spatial awareness.',
      functions: [
        'Sensory Integration',
        'Spatial Awareness',
        'Mathematical Reasoning',
        'Body Position Sense'
      ],
      subRegions: [
        { name: 'Somatosensory Cortex', bonus: 'Touch sensitivity +40%' },
        { name: 'Superior Parietal', bonus: 'Spatial reasoning +45%' }
      ],
      prerequisites: ['frontal', 'temporal'],
      unlocks: ['occipital', 'corpus_callosum'],
      category: 'cognitive'
    },

    occipital: {
      id: 'occipital',
      name: 'Occipital Lobe',
      tier: 4,
      cost: 3,
      position: { x: 1100, y: 500 },
      color: '#F38181',
      description: 'The visualizer. Processes all visual information.',
      functions: [
        'Visual Processing',
        'Color Recognition',
        'Motion Detection',
        'Depth Perception'
      ],
      subRegions: [
        { name: 'Primary Visual Cortex', bonus: 'Visual acuity +50%' },
        { name: 'Visual Association', bonus: 'Object recognition unlocked' }
      ],
      prerequisites: ['parietal', 'temporal'],
      unlocks: ['corpus_callosum'],
      category: 'sensory'
    },

    // TIER 5 - Ultimate region
    corpus_callosum: {
      id: 'corpus_callosum',
      name: 'Corpus Callosum',
      tier: 5,
      cost: 5,
      position: { x: 800, y: 200 },
      color: '#B4F8C8',
      description: 'The unifier. Connects both hemispheres for ultimate brain power.',
      functions: [
        'Hemispheric Communication',
        'Bilateral Coordination',
        'Information Integration',
        'Neural Synchronization'
      ],
      subRegions: [
        { name: 'Genu', bonus: 'Prefrontal connectivity +100%' },
        { name: 'Body', bonus: 'Motor coordination mastery' },
        { name: 'Splenium', bonus: 'Visual integration complete' }
      ],
      prerequisites: ['parietal', 'occipital'],
      unlocks: [],
      category: 'ultimate',
      isUltimate: true
    }
  },

  // Visual connections between nodes
  connections: [
    // Tier 1 -> Tier 2
    { from: 'brainstem', to: 'cerebellum', style: 'strong' },
    { from: 'brainstem', to: 'limbic', style: 'strong' },

    // Tier 2 -> Tier 3
    { from: 'cerebellum', to: 'frontal', style: 'strong' },
    { from: 'limbic', to: 'frontal', style: 'strong' },
    { from: 'limbic', to: 'temporal', style: 'strong' },
    { from: 'frontal', to: 'basal_ganglia', style: 'medium' },

    // Tier 3 -> Tier 4
    { from: 'frontal', to: 'parietal', style: 'strong' },
    { from: 'temporal', to: 'parietal', style: 'medium' },
    { from: 'temporal', to: 'occipital', style: 'medium' },

    // Tier 4 -> Tier 5
    { from: 'parietal', to: 'corpus_callosum', style: 'strong' },
    { from: 'occipital', to: 'corpus_callosum', style: 'strong' },

    // Cross connections
    { from: 'parietal', to: 'occipital', style: 'medium' },
    { from: 'frontal', to: 'temporal', style: 'medium' }
  ],

  // Categories for visual grouping
  categories: {
    core: {
      name: 'Core Systems',
      color: '#FF6B9D',
      description: 'Essential survival and emotional processing'
    },
    motor: {
      name: 'Motor Control',
      color: '#C77DFF',
      description: 'Movement and coordination systems'
    },
    cognitive: {
      name: 'Cognitive Functions',
      color: '#4CC9F0',
      description: 'Higher-order thinking and planning'
    },
    sensory: {
      name: 'Sensory Processing',
      color: '#06FFA5',
      description: 'Information gathering and processing'
    },
    ultimate: {
      name: 'Ultimate Power',
      color: '#FFD60A',
      description: 'The pinnacle of brain integration'
    }
  },

  // Achievement system
  achievements: [
    {
      id: 'first_unlock',
      name: 'Neural Awakening',
      description: 'Unlock your first brain region',
      icon: '🌟',
      requirement: { type: 'unlock_count', value: 1 }
    },
    {
      id: 'emotional_core',
      name: 'Emotional Intelligence',
      description: 'Unlock the Limbic System',
      icon: '❤️',
      requirement: { type: 'unlock_specific', value: 'limbic' }
    },
    {
      id: 'executive_function',
      name: 'Master of Decisions',
      description: 'Unlock the Frontal Lobe',
      icon: '🧠',
      requirement: { type: 'unlock_specific', value: 'frontal' }
    },
    {
      id: 'sensory_master',
      name: 'Sensory Master',
      description: 'Unlock all sensory regions',
      icon: '👁️',
      requirement: { type: 'unlock_category', value: 'sensory' }
    },
    {
      id: 'full_brain',
      name: 'Neural Mastery',
      description: 'Unlock all brain regions',
      icon: '🏆',
      requirement: { type: 'unlock_count', value: 10 }
    },
    {
      id: 'unified_mind',
      name: 'Unified Mind',
      description: 'Unlock the Corpus Callosum',
      icon: '✨',
      requirement: { type: 'unlock_specific', value: 'corpus_callosum' }
    }
  ],

  // Flavor text for progression
  progressMessages: {
    0: "Your journey begins...",
    1: "The first spark of consciousness...",
    3: "Neural pathways forming...",
    5: "The mind expands...",
    7: "Cognitive abilities emerging...",
    10: "Ultimate brain power achieved!"
  }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameSkillTree;
}
