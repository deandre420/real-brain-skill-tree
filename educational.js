// Brain Skill Tree Application
// Interactive visualization of human brain regions and functions

class BrainSkillTreeApp {
    constructor() {
        this.data = brainSkillTree;
        this.exploredRegions = new Set();
        this.selectedRegion = null;
        this.showConnections = true;
        this.currentFilter = 'all';
        this.currentNetwork = 'none';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderSkillTree();
        this.updateProgress();
    }

    setupEventListeners() {
        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.renderSkillTree();
        });

        // Network filter
        document.getElementById('network-filter').addEventListener('change', (e) => {
            this.currentNetwork = e.target.value;
            this.highlightNetwork();
        });

        // Toggle connections
        document.getElementById('show-connections-btn').addEventListener('click', () => {
            this.showConnections = !this.showConnections;
            this.renderConnections();
        });

        // Reset view
        document.getElementById('reset-view-btn').addEventListener('click', () => {
            this.resetView();
        });

        // Close info panel
        document.getElementById('close-info-btn').addEventListener('click', () => {
            this.closeInfoPanel();
        });
    }

    renderSkillTree() {
        // Clear existing content
        const nodesLayer = document.getElementById('nodes-layer');
        nodesLayer.innerHTML = '';

        // Get filtered nodes
        const filteredNodes = this.getFilteredNodes();

        // Render nodes
        filteredNodes.forEach(node => {
            this.renderNode(node);
        });

        // Render connections
        this.renderConnections();
    }

    getFilteredNodes() {
        if (this.currentFilter === 'all') {
            return this.data.nodes;
        }
        return this.data.nodes.filter(node => node.category === this.currentFilter);
    }

    renderNode(node) {
        const nodesLayer = document.getElementById('nodes-layer');

        // Create node group
        const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        nodeGroup.setAttribute('class', 'node-group');
        nodeGroup.setAttribute('data-id', node.id);

        // Create circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.position.x);
        circle.setAttribute('cy', node.position.y);
        circle.setAttribute('r', 40);
        circle.setAttribute('fill', node.color);
        circle.setAttribute('class', 'node-circle unlocked');
        circle.setAttribute('data-id', node.id);

        // Create text label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.position.x);
        text.setAttribute('y', node.position.y + 60);
        text.setAttribute('class', 'node-text');
        text.textContent = node.name;

        // Create level indicator
        const levelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        levelText.setAttribute('x', node.position.x);
        levelText.setAttribute('y', node.position.y + 5);
        levelText.setAttribute('class', 'node-text');
        levelText.setAttribute('fill', 'white');
        levelText.setAttribute('font-size', '10');
        levelText.textContent = `L${node.level}`;

        // Add click event
        circle.addEventListener('click', () => {
            this.selectNode(node);
        });

        // Add hover effects
        circle.addEventListener('mouseenter', (e) => {
            this.showTooltip(e, node);
        });

        circle.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        // Append to group
        nodeGroup.appendChild(circle);
        nodeGroup.appendChild(text);
        nodeGroup.appendChild(levelText);

        // Add to layer
        nodesLayer.appendChild(nodeGroup);
    }

    renderConnections() {
        const connectionsLayer = document.getElementById('connections-layer');
        connectionsLayer.innerHTML = '';

        if (!this.showConnections) {
            return;
        }

        const filteredNodes = this.getFilteredNodes();
        const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

        this.data.connections.forEach(conn => {
            // Only show connections between visible nodes
            if (!filteredNodeIds.has(conn.from) || !filteredNodeIds.has(conn.to)) {
                return;
            }

            const fromNode = this.data.nodes.find(n => n.id === conn.from);
            const toNode = this.data.nodes.find(n => n.id === conn.to);

            if (!fromNode || !toNode) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.position.x);
            line.setAttribute('y1', fromNode.position.y);
            line.setAttribute('x2', toNode.position.x);
            line.setAttribute('y2', toNode.position.y);
            line.setAttribute('class', `connection-line ${conn.strength}`);
            line.setAttribute('data-from', conn.from);
            line.setAttribute('data-to', conn.to);

            connectionsLayer.appendChild(line);
        });
    }

    selectNode(node) {
        // Mark as explored
        this.exploredRegions.add(node.id);
        this.updateProgress();

        // Update selected state
        this.selectedRegion = node.id;

        // Update UI
        this.updateNodeSelection();
        this.showNodeInfo(node);
    }

    updateNodeSelection() {
        // Remove previous selection
        document.querySelectorAll('.node-circle').forEach(circle => {
            circle.classList.remove('selected');
        });

        // Add selection to current node
        if (this.selectedRegion) {
            const selectedCircle = document.querySelector(`.node-circle[data-id="${this.selectedRegion}"]`);
            if (selectedCircle) {
                selectedCircle.classList.add('selected');
            }
        }

        // Highlight connections
        this.highlightConnections(this.selectedRegion);
    }

    highlightConnections(nodeId) {
        // Reset all connections
        document.querySelectorAll('.connection-line').forEach(line => {
            line.classList.remove('highlighted');
        });

        if (!nodeId) return;

        // Highlight connections to/from selected node
        document.querySelectorAll('.connection-line').forEach(line => {
            const from = line.getAttribute('data-from');
            const to = line.getAttribute('data-to');

            if (from === nodeId || to === nodeId) {
                line.classList.add('highlighted');
            }
        });
    }

    showNodeInfo(node) {
        // Hide welcome, show region info
        document.getElementById('welcome-info').style.display = 'none';
        document.getElementById('region-info').style.display = 'block';

        // Update content
        document.getElementById('region-name').textContent = node.name;
        document.getElementById('region-description').textContent = node.description;

        // Update skills
        const skillsList = document.getElementById('region-skills');
        skillsList.innerHTML = '';
        node.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // Update sub-regions
        if (node.subRegions && node.subRegions.length > 0) {
            document.getElementById('sub-regions-section').style.display = 'block';
            const subRegionsList = document.getElementById('sub-regions-list');
            subRegionsList.innerHTML = '';

            node.subRegions.forEach(subRegion => {
                const div = document.createElement('div');
                div.className = 'sub-region-item';

                const h4 = document.createElement('h4');
                h4.textContent = subRegion.name;

                const p = document.createElement('p');
                p.textContent = subRegion.description;

                div.appendChild(h4);
                div.appendChild(p);

                if (subRegion.skills) {
                    const ul = document.createElement('ul');
                    subRegion.skills.forEach(skill => {
                        const li = document.createElement('li');
                        li.textContent = skill;
                        ul.appendChild(li);
                    });
                    div.appendChild(ul);
                }

                subRegionsList.appendChild(div);
            });
        } else {
            document.getElementById('sub-regions-section').style.display = 'none';
        }

        // Update connections
        const connectedRegions = this.getConnectedRegions(node.id);
        if (connectedRegions.length > 0) {
            document.getElementById('connections-section').style.display = 'block';
            const connectionsList = document.getElementById('connections-list');
            connectionsList.innerHTML = '';

            connectedRegions.forEach(regionId => {
                const region = this.data.nodes.find(n => n.id === regionId);
                if (region) {
                    const li = document.createElement('li');
                    li.textContent = region.name;
                    li.style.cursor = 'pointer';
                    li.style.color = '#667eea';
                    li.addEventListener('click', () => {
                        this.selectNode(region);
                    });
                    connectionsList.appendChild(li);
                }
            });
        } else {
            document.getElementById('connections-section').style.display = 'none';
        }

        // Update networks
        const networks = this.getNetworksForRegion(node.id);
        if (networks.length > 0) {
            document.getElementById('networks-section').style.display = 'block';
            document.getElementById('networks-list').textContent =
                networks.map(n => n.name).join(', ');
        } else {
            document.getElementById('networks-section').style.display = 'none';
        }
    }

    getConnectedRegions(nodeId) {
        const connected = new Set();

        this.data.connections.forEach(conn => {
            if (conn.from === nodeId) {
                connected.add(conn.to);
            }
            if (conn.to === nodeId) {
                connected.add(conn.from);
            }
        });

        return Array.from(connected);
    }

    getNetworksForRegion(nodeId) {
        return this.data.networks.filter(network =>
            network.regions.includes(nodeId)
        );
    }

    closeInfoPanel() {
        document.getElementById('welcome-info').style.display = 'block';
        document.getElementById('region-info').style.display = 'none';
        this.selectedRegion = null;
        this.updateNodeSelection();
    }

    highlightNetwork() {
        // Reset all nodes
        document.querySelectorAll('.node-circle').forEach(circle => {
            circle.style.opacity = '1';
        });

        // Reset all connections
        document.querySelectorAll('.connection-line').forEach(line => {
            line.classList.remove('highlighted');
        });

        if (this.currentNetwork === 'none') {
            return;
        }

        const network = this.data.networks.find(n => n.id === this.currentNetwork);
        if (!network) return;

        // Dim non-network nodes
        document.querySelectorAll('.node-circle').forEach(circle => {
            const nodeId = circle.getAttribute('data-id');
            if (!network.regions.includes(nodeId)) {
                circle.style.opacity = '0.3';
            }
        });

        // Highlight network connections
        document.querySelectorAll('.connection-line').forEach(line => {
            const from = line.getAttribute('data-from');
            const to = line.getAttribute('data-to');

            if (network.regions.includes(from) && network.regions.includes(to)) {
                line.classList.add('highlighted');
            }
        });
    }

    updateProgress() {
        const total = this.data.nodes.length;
        const explored = this.exploredRegions.size;
        const percentage = (explored / total) * 100;

        document.getElementById('progress-fill').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent =
            `${explored} of ${total} regions explored`;
    }

    resetView() {
        this.currentFilter = 'all';
        this.currentNetwork = 'none';
        this.showConnections = true;

        document.getElementById('category-filter').value = 'all';
        document.getElementById('network-filter').value = 'none';

        this.closeInfoPanel();
        this.renderSkillTree();
    }

    showTooltip(event, node) {
        // Remove existing tooltip
        this.hideTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.id = 'node-tooltip';
        tooltip.textContent = `${node.name} - Level ${node.level}`;

        document.body.appendChild(tooltip);

        // Position tooltip
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }

    hideTooltip() {
        const tooltip = document.getElementById('node-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new BrainSkillTreeApp();

    // Make app globally accessible for debugging
    window.brainApp = app;

    console.log('Brain Skill Tree App initialized');
    console.log('Total brain regions:', app.data.nodes.length);
    console.log('Total connections:', app.data.connections.length);
    console.log('Neural networks:', app.data.networks.length);
});
