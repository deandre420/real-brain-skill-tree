// Brain Skill Tree Data Structure
// Represents brain regions, their functions, and interconnections

const brainSkillTree = {
  // Main brain regions as skill nodes
  nodes: [
    {
      id: 'frontal',
      name: 'Frontal Lobe',
      category: 'cerebral_cortex',
      level: 1,
      description: 'Executive functions, decision making, and motor control',
      color: '#FF6B6B',
      position: { x: 200, y: 100 },
      skills: [
        'Executive Functions',
        'Decision Making',
        'Problem Solving',
        'Motor Control',
        'Speech Production',
        'Personality Expression'
      ],
      subRegions: [
        {
          id: 'prefrontal',
          name: 'Prefrontal Cortex',
          description: 'Executive functions and personality',
          skills: ['Planning', 'Working Memory', 'Impulse Control', 'Abstract Thinking']
        },
        {
          id: 'motor_cortex',
          name: 'Primary Motor Cortex',
          description: 'Voluntary movement control',
          skills: ['Movement Execution', 'Fine Motor Control']
        },
        {
          id: 'brocas',
          name: "Broca's Area",
          description: 'Speech production',
          skills: ['Speech Production', 'Language Expression']
        }
      ],
      prerequisites: [],
      unlocks: ['parietal', 'temporal', 'limbic']
    },
    {
      id: 'parietal',
      name: 'Parietal Lobe',
      category: 'cerebral_cortex',
      level: 1,
      description: 'Sensory processing and spatial awareness',
      color: '#4ECDC4',
      position: { x: 400, y: 100 },
      skills: [
        'Sensory Processing',
        'Spatial Awareness',
        'Mathematical Reasoning',
        'Body Position Awareness',
        'Visual-Spatial Processing'
      ],
      subRegions: [
        {
          id: 'somatosensory',
          name: 'Primary Somatosensory Cortex',
          description: 'Touch and sensory processing',
          skills: ['Touch Processing', 'Temperature Sense', 'Pain Processing']
        },
        {
          id: 'superior_parietal',
          name: 'Superior Parietal Lobule',
          description: 'Spatial awareness and navigation',
          skills: ['Spatial Navigation', '3D Understanding', 'Hand-Eye Coordination']
        }
      ],
      prerequisites: ['frontal'],
      unlocks: ['occipital', 'temporal']
    },
    {
      id: 'temporal',
      name: 'Temporal Lobe',
      category: 'cerebral_cortex',
      level: 1,
      description: 'Auditory processing and memory formation',
      color: '#95E1D3',
      position: { x: 300, y: 250 },
      skills: [
        'Auditory Processing',
        'Memory Formation',
        'Language Comprehension',
        'Facial Recognition',
        'Emotion Processing'
      ],
      subRegions: [
        {
          id: 'auditory_cortex',
          name: 'Primary Auditory Cortex',
          description: 'Sound processing',
          skills: ['Sound Recognition', 'Pitch Processing', 'Sound Localization']
        },
        {
          id: 'wernickes',
          name: "Wernicke's Area",
          description: 'Language comprehension',
          skills: ['Language Understanding', 'Reading Comprehension']
        },
        {
          id: 'hippocampus',
          name: 'Hippocampus',
          description: 'Memory formation and consolidation',
          skills: ['Long-term Memory', 'Spatial Memory', 'Memory Consolidation']
        }
      ],
      prerequisites: ['frontal'],
      unlocks: ['limbic', 'occipital']
    },
    {
      id: 'occipital',
      name: 'Occipital Lobe',
      category: 'cerebral_cortex',
      level: 2,
      description: 'Visual processing and recognition',
      color: '#F38181',
      position: { x: 500, y: 200 },
      skills: [
        'Visual Processing',
        'Color Recognition',
        'Motion Detection',
        'Depth Perception',
        'Visual Memory'
      ],
      subRegions: [
        {
          id: 'visual_cortex',
          name: 'Primary Visual Cortex (V1)',
          description: 'Basic visual processing',
          skills: ['Edge Detection', 'Contrast Processing', 'Basic Shapes']
        },
        {
          id: 'visual_association',
          name: 'Visual Association Areas',
          description: 'Complex visual processing',
          skills: ['Object Recognition', 'Face Recognition', 'Scene Analysis']
        }
      ],
      prerequisites: ['parietal', 'temporal'],
      unlocks: ['cerebellum']
    },
    {
      id: 'cerebellum',
      name: 'Cerebellum',
      category: 'hindbrain',
      level: 3,
      description: 'Motor coordination and balance',
      color: '#AA96DA',
      position: { x: 450, y: 350 },
      skills: [
        'Motor Coordination',
        'Balance',
        'Fine Motor Control',
        'Motor Learning',
        'Timing and Rhythm'
      ],
      subRegions: [
        {
          id: 'cerebellar_cortex',
          name: 'Cerebellar Cortex',
          description: 'Movement coordination',
          skills: ['Smooth Movements', 'Posture Control', 'Gait Coordination']
        }
      ],
      prerequisites: ['occipital', 'brainstem'],
      unlocks: []
    },
    {
      id: 'brainstem',
      name: 'Brainstem',
      category: 'hindbrain',
      level: 2,
      description: 'Basic life functions and reflexes',
      color: '#FCBAD3',
      position: { x: 300, y: 400 },
      skills: [
        'Breathing Control',
        'Heart Rate Regulation',
        'Sleep-Wake Cycles',
        'Alertness',
        'Reflex Actions'
      ],
      subRegions: [
        {
          id: 'midbrain',
          name: 'Midbrain',
          description: 'Vision, hearing, motor control',
          skills: ['Eye Movement', 'Auditory Relay', 'Motor Relay']
        },
        {
          id: 'pons',
          name: 'Pons',
          description: 'Sleep and respiration',
          skills: ['Sleep Regulation', 'Breathing Rhythm', 'Facial Expressions']
        },
        {
          id: 'medulla',
          name: 'Medulla Oblongata',
          description: 'Vital functions',
          skills: ['Heart Rate', 'Blood Pressure', 'Swallowing', 'Coughing']
        }
      ],
      prerequisites: ['limbic'],
      unlocks: ['cerebellum']
    },
    {
      id: 'limbic',
      name: 'Limbic System',
      category: 'deep_brain',
      level: 2,
      description: 'Emotion processing and memory',
      color: '#FFFAAA',
      position: { x: 200, y: 300 },
      skills: [
        'Emotion Processing',
        'Memory Formation',
        'Motivation',
        'Reward Processing',
        'Olfaction'
      ],
      subRegions: [
        {
          id: 'amygdala',
          name: 'Amygdala',
          description: 'Emotional processing and fear',
          skills: ['Fear Response', 'Emotional Memory', 'Threat Detection']
        },
        {
          id: 'hypothalamus',
          name: 'Hypothalamus',
          description: 'Hormone regulation',
          skills: ['Hunger', 'Thirst', 'Temperature Regulation', 'Sleep Drive']
        },
        {
          id: 'thalamus',
          name: 'Thalamus',
          description: 'Sensory relay station',
          skills: ['Sensory Relay', 'Attention Gating', 'Consciousness']
        }
      ],
      prerequisites: ['frontal', 'temporal'],
      unlocks: ['brainstem']
    },
    {
      id: 'basal_ganglia',
      name: 'Basal Ganglia',
      category: 'deep_brain',
      level: 2,
      description: 'Motor control and habit formation',
      color: '#C7CEEA',
      position: { x: 100, y: 200 },
      skills: [
        'Movement Initiation',
        'Habit Formation',
        'Reward Learning',
        'Procedural Memory',
        'Action Selection'
      ],
      subRegions: [
        {
          id: 'striatum',
          name: 'Striatum',
          description: 'Movement and reward',
          skills: ['Movement Planning', 'Reward Prediction', 'Habit Learning']
        },
        {
          id: 'substantia_nigra',
          name: 'Substantia Nigra',
          description: 'Dopamine production',
          skills: ['Dopamine Release', 'Movement Facilitation', 'Motivation']
        }
      ],
      prerequisites: ['frontal'],
      unlocks: ['limbic']
    },
    {
      id: 'corpus_callosum',
      name: 'Corpus Callosum',
      category: 'white_matter',
      level: 3,
      description: 'Hemispheric communication',
      color: '#B4F8C8',
      position: { x: 300, y: 150 },
      skills: [
        'Left-Right Communication',
        'Bilateral Coordination',
        'Information Integration',
        'Hemispheric Balance'
      ],
      subRegions: [],
      prerequisites: ['frontal', 'parietal', 'temporal', 'occipital'],
      unlocks: []
    }
  ],

  // Connections between brain regions
  connections: [
    { from: 'frontal', to: 'parietal', strength: 'strong', type: 'bidirectional' },
    { from: 'frontal', to: 'temporal', strength: 'strong', type: 'bidirectional' },
    { from: 'frontal', to: 'limbic', strength: 'strong', type: 'bidirectional' },
    { from: 'frontal', to: 'basal_ganglia', strength: 'strong', type: 'bidirectional' },
    { from: 'parietal', to: 'occipital', strength: 'strong', type: 'bidirectional' },
    { from: 'parietal', to: 'temporal', strength: 'medium', type: 'bidirectional' },
    { from: 'temporal', to: 'limbic', strength: 'strong', type: 'bidirectional' },
    { from: 'temporal', to: 'occipital', strength: 'medium', type: 'bidirectional' },
    { from: 'occipital', to: 'cerebellum', strength: 'medium', type: 'bidirectional' },
    { from: 'limbic', to: 'brainstem', strength: 'strong', type: 'bidirectional' },
    { from: 'brainstem', to: 'cerebellum', strength: 'strong', type: 'bidirectional' },
    { from: 'basal_ganglia', to: 'limbic', strength: 'medium', type: 'bidirectional' },
    { from: 'frontal', to: 'corpus_callosum', strength: 'strong', type: 'bidirectional' },
    { from: 'parietal', to: 'corpus_callosum', strength: 'strong', type: 'bidirectional' },
    { from: 'temporal', to: 'corpus_callosum', strength: 'strong', type: 'bidirectional' },
    { from: 'occipital', to: 'corpus_callosum', strength: 'strong', type: 'bidirectional' }
  ],

  // Neural networks (groups of regions working together)
  networks: [
    {
      id: 'default_mode',
      name: 'Default Mode Network',
      description: 'Active during rest and introspection',
      regions: ['frontal', 'parietal', 'temporal'],
      functions: ['Self-reflection', 'Memory recall', 'Future planning', 'Mind-wandering']
    },
    {
      id: 'executive_control',
      name: 'Executive Control Network',
      description: 'Active during complex cognitive tasks',
      regions: ['frontal', 'parietal'],
      functions: ['Problem-solving', 'Decision-making', 'Working memory', 'Attention control']
    },
    {
      id: 'salience',
      name: 'Salience Network',
      description: 'Detects and filters important stimuli',
      regions: ['frontal', 'limbic'],
      functions: ['Attention switching', 'Emotion processing', 'Threat detection']
    },
    {
      id: 'motor',
      name: 'Motor Network',
      description: 'Movement planning and execution',
      regions: ['frontal', 'basal_ganglia', 'cerebellum'],
      functions: ['Movement planning', 'Movement execution', 'Motor learning']
    },
    {
      id: 'visual',
      name: 'Visual Processing Network',
      description: 'Visual perception and recognition',
      regions: ['occipital', 'parietal', 'temporal'],
      functions: ['Object recognition', 'Spatial vision', 'Motion detection']
    }
  ],

  // Categories for organizing brain regions
  categories: {
    cerebral_cortex: {
      name: 'Cerebral Cortex',
      description: 'Outer layer of the brain, responsible for higher-order functions',
      color: '#FF6B6B'
    },
    deep_brain: {
      name: 'Deep Brain Structures',
      description: 'Subcortical structures involved in emotion, memory, and motivation',
      color: '#FFD93D'
    },
    hindbrain: {
      name: 'Hindbrain',
      description: 'Lower brain structures controlling basic functions and coordination',
      color: '#AA96DA'
    },
    white_matter: {
      name: 'White Matter',
      description: 'Neural pathways connecting brain regions',
      color: '#B4F8C8'
    }
  }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = brainSkillTree;
}
