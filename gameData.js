// Brain Skill Tree Game Data
// Idle clicker version with passive generation

const gameSkillTree = {
  // Starting resources
  initialSkillPoints: 0,
  initialClickPower: 1,

  // Skill tree nodes with game mechanics and proper tree positioning
  nodes: {
    // TIER 1 - Root/Foundation (bottom center)
    brainstem: {
      id: 'brainstem',
      name: 'Brainstem',
      tier: 1,
      cost: 5,
      position: { x: 800, y: 900 },
      color: '#FCBAD3',
      icon: '⚡',
      description: 'The foundation of all brain functions. Controls basic life processes.',
      tokensPerSecond: 0.5,
      clickBonus: 1,
      functions: [
        'Breathing Control',
        'Heart Rate Regulation',
        'Sleep-Wake Cycles',
        'Basic Reflexes'
      ],
      subRegions: [
        { name: 'Medulla Oblongata', bonus: '+0.2 tokens/sec' },
        { name: 'Pons', bonus: '+0.2 tokens/sec' },
        { name: 'Midbrain', bonus: '+0.1 tokens/sec' }
      ],
      prerequisites: [],
      unlocks: ['cerebellum', 'limbic'],
      category: 'core'
    },

    // TIER 2 - First branches (left and right)
    cerebellum: {
      id: 'cerebellum',
      name: 'Cerebellum',
      tier: 2,
      cost: 15,
      position: { x: 550, y: 750 },
      color: '#AA96DA',
      icon: '⚙',
      description: 'The coordinator. Enables precise motor control and balance.',
      tokensPerSecond: 1,
      clickBonus: 2,
      functions: [
        'Motor Coordination',
        'Balance & Posture',
        'Fine Motor Skills',
        'Motor Learning'
      ],
      subRegions: [
        { name: 'Cerebellar Cortex', bonus: '+0.5 tokens/sec' },
        { name: 'Deep Nuclei', bonus: '+0.5 tokens/sec' }
      ],
      prerequisites: ['brainstem'],
      unlocks: ['basal_ganglia', 'motor_cortex'],
      category: 'motor'
    },

    limbic: {
      id: 'limbic',
      name: 'Limbic System',
      tier: 2,
      cost: 15,
      position: { x: 1050, y: 750 },
      color: '#FFFAAA',
      icon: '♥',
      description: 'The emotional core. Processes emotions, memories, and drives.',
      tokensPerSecond: 1,
      clickBonus: 2,
      functions: [
        'Emotion Processing',
        'Memory Formation',
        'Motivation & Drive',
        'Reward Processing'
      ],
      subRegions: [
        { name: 'Amygdala', bonus: '+0.4 tokens/sec' },
        { name: 'Hippocampus', bonus: '+0.4 tokens/sec' },
        { name: 'Hypothalamus', bonus: '+0.2 tokens/sec' }
      ],
      prerequisites: ['brainstem'],
      unlocks: ['temporal', 'frontal'],
      category: 'core'
    },

    // TIER 3 - Second branches
    basal_ganglia: {
      id: 'basal_ganglia',
      name: 'Basal Ganglia',
      tier: 3,
      cost: 40,
      position: { x: 350, y: 600 },
      color: '#C7CEEA',
      icon: '◈',
      description: 'The habit former. Controls movement initiation and procedural learning.',
      tokensPerSecond: 2,
      clickBonus: 5,
      functions: [
        'Movement Initiation',
        'Habit Formation',
        'Procedural Learning',
        'Action Selection'
      ],
      subRegions: [
        { name: 'Striatum', bonus: '+1 tokens/sec' },
        { name: 'Substantia Nigra', bonus: '+1 tokens/sec' }
      ],
      prerequisites: ['cerebellum'],
      unlocks: ['prefrontal'],
      category: 'motor'
    },

    motor_cortex: {
      id: 'motor_cortex',
      name: 'Motor Cortex',
      tier: 3,
      cost: 40,
      position: { x: 550, y: 550 },
      color: '#FF6B6B',
      icon: '⚡',
      description: 'Commands voluntary movements.',
      tokensPerSecond: 2.5,
      clickBonus: 4,
      functions: [
        'Voluntary Movement',
        'Fine Motor Control',
        'Movement Planning'
      ],
      subRegions: [
        { name: 'Primary Motor', bonus: '+1.5 tokens/sec' },
        { name: 'Premotor', bonus: '+1 tokens/sec' }
      ],
      prerequisites: ['cerebellum'],
      unlocks: ['frontal'],
      category: 'motor'
    },

    temporal: {
      id: 'temporal',
      name: 'Temporal Lobe',
      tier: 3,
      cost: 40,
      position: { x: 1050, y: 550 },
      color: '#95E1D3',
      icon: '♪',
      description: 'The processor. Handles sound, memory, and language understanding.',
      tokensPerSecond: 2.5,
      clickBonus: 4,
      functions: [
        'Auditory Processing',
        'Memory Retrieval',
        'Language Comprehension',
        'Facial Recognition'
      ],
      subRegions: [
        { name: 'Auditory Cortex', bonus: '+1 tokens/sec' },
        { name: "Wernicke's Area", bonus: '+1.5 tokens/sec' }
      ],
      prerequisites: ['limbic'],
      unlocks: ['parietal', 'occipital'],
      category: 'sensory'
    },

    // TIER 4 - Upper branches
    prefrontal: {
      id: 'prefrontal',
      name: 'Prefrontal Cortex',
      tier: 4,
      cost: 100,
      position: { x: 250, y: 400 },
      color: '#FF6B6B',
      icon: '◆',
      description: 'The executive. Strategic thinking and decision making.',
      tokensPerSecond: 5,
      clickBonus: 10,
      functions: [
        'Executive Functions',
        'Strategic Planning',
        'Working Memory',
        'Impulse Control'
      ],
      subRegions: [
        { name: 'Dorsolateral PFC', bonus: '+3 tokens/sec' },
        { name: 'Ventromedial PFC', bonus: '+2 tokens/sec' }
      ],
      prerequisites: ['basal_ganglia'],
      unlocks: ['association_cortex'],
      category: 'cognitive'
    },

    frontal: {
      id: 'frontal',
      name: 'Frontal Lobe',
      tier: 4,
      cost: 100,
      position: { x: 550, y: 350 },
      color: '#FF6B6B',
      icon: '◉',
      description: 'The executive center. Makes decisions, plans, and controls behavior.',
      tokensPerSecond: 6,
      clickBonus: 8,
      functions: [
        'Decision Making',
        'Problem Solving',
        'Speech Production',
        'Personality'
      ],
      subRegions: [
        { name: "Broca's Area", bonus: '+3 tokens/sec' },
        { name: 'Prefrontal Integration', bonus: '+3 tokens/sec' }
      ],
      prerequisites: ['motor_cortex', 'limbic'],
      unlocks: ['parietal'],
      category: 'cognitive'
    },

    parietal: {
      id: 'parietal',
      name: 'Parietal Lobe',
      tier: 4,
      cost: 100,
      position: { x: 850, y: 400 },
      color: '#4ECDC4',
      icon: '◎',
      description: 'The integrator. Processes sensory information and spatial awareness.',
      tokensPerSecond: 5,
      clickBonus: 10,
      functions: [
        'Sensory Integration',
        'Spatial Awareness',
        'Mathematical Reasoning',
        'Body Position Sense'
      ],
      subRegions: [
        { name: 'Somatosensory Cortex', bonus: '+2.5 tokens/sec' },
        { name: 'Superior Parietal', bonus: '+2.5 tokens/sec' }
      ],
      prerequisites: ['frontal', 'temporal'],
      unlocks: ['association_cortex', 'corpus_callosum'],
      category: 'cognitive'
    },

    occipital: {
      id: 'occipital',
      name: 'Occipital Lobe',
      tier: 4,
      cost: 100,
      position: { x: 1250, y: 450 },
      color: '#F38181',
      icon: '◐',
      description: 'The visualizer. Processes all visual information.',
      tokensPerSecond: 4,
      clickBonus: 12,
      functions: [
        'Visual Processing',
        'Color Recognition',
        'Motion Detection',
        'Depth Perception'
      ],
      subRegions: [
        { name: 'Primary Visual Cortex', bonus: '+2 tokens/sec' },
        { name: 'Visual Association', bonus: '+2 tokens/sec' }
      ],
      prerequisites: ['temporal'],
      unlocks: ['association_cortex'],
      category: 'sensory'
    },

    // TIER 5 - Upper integration
    association_cortex: {
      id: 'association_cortex',
      name: 'Association Cortex',
      tier: 5,
      cost: 300,
      position: { x: 650, y: 200 },
      color: '#9D84B7',
      icon: '◈',
      description: 'Higher-order integration and complex thinking.',
      tokensPerSecond: 15,
      clickBonus: 20,
      functions: [
        'Complex Reasoning',
        'Abstract Thought',
        'Creative Thinking',
        'Multi-sensory Integration'
      ],
      subRegions: [
        { name: 'Prefrontal Association', bonus: '+7 tokens/sec' },
        { name: 'Parietal Association', bonus: '+8 tokens/sec' }
      ],
      prerequisites: ['prefrontal', 'parietal', 'occipital'],
      unlocks: ['corpus_callosum'],
      category: 'ultimate'
    },

    // TIER 6 - Ultimate/Crown
    corpus_callosum: {
      id: 'corpus_callosum',
      name: 'Corpus Callosum',
      tier: 6,
      cost: 1000,
      position: { x: 800, y: 50 },
      color: '#B4F8C8',
      icon: '✦',
      description: 'The unifier. Connects both hemispheres for ultimate brain power.',
      tokensPerSecond: 50,
      clickBonus: 50,
      functions: [
        'Hemispheric Communication',
        'Bilateral Coordination',
        'Information Integration',
        'Neural Synchronization'
      ],
      subRegions: [
        { name: 'Genu', bonus: '+20 tokens/sec' },
        { name: 'Body', bonus: '+20 tokens/sec' },
        { name: 'Splenium', bonus: '+10 tokens/sec' }
      ],
      prerequisites: ['parietal', 'association_cortex'],
      unlocks: [],
      category: 'ultimate',
      isUltimate: true
    }
  },

  // Visual connections between nodes
  connections: [
    // Tier 1 -> Tier 2 (foundation branches)
    { from: 'brainstem', to: 'cerebellum', style: 'strong' },
    { from: 'brainstem', to: 'limbic', style: 'strong' },

    // Tier 2 -> Tier 3 (first branches)
    { from: 'cerebellum', to: 'basal_ganglia', style: 'strong' },
    { from: 'cerebellum', to: 'motor_cortex', style: 'strong' },
    { from: 'limbic', to: 'temporal', style: 'strong' },
    { from: 'limbic', to: 'frontal', style: 'medium' },

    // Tier 3 -> Tier 4 (upper branches)
    { from: 'basal_ganglia', to: 'prefrontal', style: 'strong' },
    { from: 'motor_cortex', to: 'frontal', style: 'strong' },
    { from: 'temporal', to: 'parietal', style: 'strong' },
    { from: 'temporal', to: 'occipital', style: 'strong' },

    // Tier 4 internal connections
    { from: 'frontal', to: 'parietal', style: 'medium' },

    // Tier 4 -> Tier 5
    { from: 'prefrontal', to: 'association_cortex', style: 'strong' },
    { from: 'parietal', to: 'association_cortex', style: 'strong' },
    { from: 'occipital', to: 'association_cortex', style: 'strong' },

    // Tier 5 -> Tier 6 (ultimate)
    { from: 'association_cortex', to: 'corpus_callosum', style: 'strong' },
    { from: 'parietal', to: 'corpus_callosum', style: 'medium' }
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
      icon: '★',
      requirement: { type: 'unlock_count', value: 1 }
    },
    {
      id: 'emotional_core',
      name: 'Emotional Intelligence',
      description: 'Unlock the Limbic System',
      icon: '♥',
      requirement: { type: 'unlock_specific', value: 'limbic' }
    },
    {
      id: 'executive_function',
      name: 'Master of Decisions',
      description: 'Unlock the Frontal Lobe',
      icon: '◆',
      requirement: { type: 'unlock_specific', value: 'frontal' }
    },
    {
      id: 'sensory_master',
      name: 'Sensory Master',
      description: 'Unlock all sensory regions',
      icon: '◉',
      requirement: { type: 'unlock_category', value: 'sensory' }
    },
    {
      id: 'full_brain',
      name: 'Neural Mastery',
      description: 'Unlock all brain regions',
      icon: '◈',
      requirement: { type: 'unlock_count', value: 10 }
    },
    {
      id: 'unified_mind',
      name: 'Unified Mind',
      description: 'Unlock the Corpus Callosum',
      icon: '✦',
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
