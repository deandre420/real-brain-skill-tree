# Brain Skill Tree

An interactive web-based visualization that represents different parts of the human brain as a skill tree. Explore brain regions, their functions, connections, and neural networks through an engaging interface.

## Overview

The Brain Skill Tree is an educational tool that helps users understand:
- Major brain regions and their locations
- Primary functions of each brain area
- Sub-regions and specialized structures
- Connections between different brain areas
- Neural networks and how brain regions work together
- Hemispheric specialization and brain development

## Features

### Interactive Visualization
- **Clickable Brain Regions**: Click on any brain region to learn about its functions
- **Visual Connections**: See how different brain areas connect and communicate
- **Color-Coded Categories**: Brain regions are organized by categories (Cerebral Cortex, Deep Brain, Hindbrain, White Matter)
- **Level System**: Regions are organized by hierarchical levels

### Filtering and Exploration
- **Category Filter**: Focus on specific brain categories
- **Neural Network Highlighting**: Visualize major neural networks (Default Mode, Executive Control, Salience, Motor, Visual)
- **Connection Toggle**: Show or hide connections between regions
- **Progress Tracking**: Track which regions you've explored

### Detailed Information
- **Primary Functions**: Learn what each brain region does
- **Sub-Regions**: Discover specialized areas within major regions
- **Connected Regions**: See which other areas each region communicates with
- **Neural Networks**: Understand which networks each region participates in

## Brain Regions Included

### Cerebral Cortex
1. **Frontal Lobe** - Executive functions, decision making, motor control, speech
2. **Parietal Lobe** - Sensory processing, spatial awareness, mathematical reasoning
3. **Temporal Lobe** - Auditory processing, memory, language comprehension
4. **Occipital Lobe** - Visual processing, color recognition, motion detection

### Deep Brain Structures
5. **Limbic System** - Emotion processing, memory formation, motivation
6. **Basal Ganglia** - Motor control, habit formation, reward processing

### Hindbrain
7. **Cerebellum** - Motor coordination, balance, fine motor control
8. **Brainstem** - Basic life functions, breathing, heart rate, alertness

### White Matter
9. **Corpus Callosum** - Communication between brain hemispheres

## Neural Networks

The application includes visualization of major neural networks:

- **Default Mode Network**: Active during rest and introspection
- **Executive Control Network**: Active during complex cognitive tasks
- **Salience Network**: Detects and filters important stimuli
- **Motor Network**: Movement planning and execution
- **Visual Processing Network**: Visual perception and recognition

## Files Structure

```
real-brain-skill-tree/
├── index.html           # Main HTML structure
├── styles.css           # Styling and visual design
├── app.js              # Interactive application logic
├── brainData.js        # Brain regions data structure
├── BRAIN_REGIONS.md    # Detailed documentation of brain regions
└── README.md           # This file
```

## Getting Started

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/deandre420/real-brain-skill-tree.git
cd real-brain-skill-tree
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop `index.html` into your browser.

### Using a Local Server (Optional)

For the best experience, you can serve the files using a local HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server package)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## How to Use

1. **Explore Brain Regions**: Click on any colored circle to learn about that brain region
2. **Filter by Category**: Use the dropdown to focus on specific brain categories
3. **View Neural Networks**: Select a network from the dropdown to see how regions work together
4. **Toggle Connections**: Click the "Toggle Connections" button to show/hide connections
5. **Track Progress**: Watch your exploration progress in the progress bar
6. **Read Detailed Info**: Click on a region to see its functions, sub-regions, and connections

## Educational Use

This tool is designed for:
- Students learning about neuroscience and brain anatomy
- Educators teaching brain structure and function
- Anyone interested in understanding how the brain works
- Visual learners who benefit from interactive diagrams

## Data Source

The brain region information is based on:
- Human anatomy and neuroscience textbooks
- Neuroimaging research
- Clinical neuropsychology studies
- Cognitive neuroscience literature

For detailed information about each brain region, see [BRAIN_REGIONS.md](BRAIN_REGIONS.md).

## Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and data management
- **SVG**: Scalable vector graphics for the skill tree visualization

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

### Responsive Design
The application is responsive and works on:
- Desktop computers
- Tablets
- Large mobile devices

## Future Enhancements

Potential future features:
- 3D brain visualization
- Animations showing neural pathways
- Quiz mode to test knowledge
- More detailed sub-region information
- Integration with brain imaging data
- Pathology and disorder information
- Multilingual support

## Contributing

Contributions are welcome! If you'd like to improve the Brain Skill Tree:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Brain anatomy and function information compiled from scientific literature
- Inspired by skill tree interfaces in educational games
- Created as an interactive learning tool for neuroscience education

## Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Explore, Learn, and Understand the Amazing Human Brain!**
