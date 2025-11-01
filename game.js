// Brain Skill Tree Game
// Main game logic with unlock progression system

class BrainSkillTreeGame {
    constructor() {
        this.data = gameSkillTree;
        this.skillPoints = this.data.initialSkillPoints;
        this.unlockedNodes = new Set();
        this.selectedNode = null;
        this.achievements = new Set();

        this.init();
    }

    init() {
        // Load saved progress
        this.loadProgress();

        // Initialize particle system
        new ParticleSystem('particle-bg');

        // Setup event listeners
        this.setupEventListeners();

        // Render skill tree
        this.renderSkillTree();

        // Update UI
        this.updateUI();

        // Show welcome modal
        this.showWelcomeModal();
    }

    setupEventListeners() {
        // Close panel
        document.getElementById('close-panel').addEventListener('click', () => {
            this.closeSkillPanel();
        });

        // Unlock button
        document.getElementById('unlock-btn').addEventListener('click', () => {
            this.unlockSelectedNode();
        });

        // Top HUD buttons
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetProgress();
        });

        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveProgress();
            this.showNotification('Progress saved!', 'success');
        });

        document.getElementById('info-btn').addEventListener('click', () => {
            window.open('educational.html', '_blank');
        });

        // Welcome modal
        document.getElementById('start-btn').addEventListener('click', () => {
            this.hideWelcomeModal();
        });

        // Click outside panel to close
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('skill-panel');
            if (!panel.contains(e.target) && !e.target.closest('.node-circle')) {
                this.closeSkillPanel();
            }
        });
    }

    renderSkillTree() {
        const nodesLayer = document.getElementById('nodes-layer');
        const connectionsLayer = document.getElementById('connections-layer');

        // Clear existing
        nodesLayer.innerHTML = '';
        connectionsLayer.innerHTML = '';

        // Draw connections first (so they're behind nodes)
        this.renderConnections();

        // Draw nodes
        Object.values(this.data.nodes).forEach(node => {
            this.renderNode(node);
        });
    }

    renderConnections() {
        const connectionsLayer = document.getElementById('connections-layer');

        this.data.connections.forEach(conn => {
            const fromNode = this.data.nodes[conn.from];
            const toNode = this.data.nodes[conn.to];

            if (!fromNode || !toNode) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.position.x);
            line.setAttribute('y1', fromNode.position.y);
            line.setAttribute('x2', toNode.position.x);
            line.setAttribute('y2', toNode.position.y);
            line.setAttribute('class', `connection ${conn.style}`);
            line.setAttribute('data-from', conn.from);
            line.setAttribute('data-to', conn.to);

            // Color based on unlock status
            const fromUnlocked = this.unlockedNodes.has(conn.from);
            const toUnlocked = this.unlockedNodes.has(conn.to);

            if (fromUnlocked && toUnlocked) {
                line.classList.add('unlocked');
            } else if (fromUnlocked || toUnlocked) {
                line.classList.add('partial');
            } else {
                line.classList.add('locked');
            }

            connectionsLayer.appendChild(line);
        });
    }

    renderNode(node) {
        const nodesLayer = document.getElementById('nodes-layer');

        // Create node group
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'node-group');
        group.setAttribute('data-id', node.id);

        // Determine node state
        const isUnlocked = this.unlockedNodes.has(node.id);
        const canUnlock = this.canUnlockNode(node.id);
        const nodeState = isUnlocked ? 'unlocked' : (canUnlock ? 'unlockable' : 'locked');

        // Outer glow circle (for unlockable/unlocked)
        if (nodeState !== 'locked') {
            const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            glowCircle.setAttribute('cx', node.position.x);
            glowCircle.setAttribute('cy', node.position.y);
            glowCircle.setAttribute('r', 50);
            glowCircle.setAttribute('class', `node-glow ${nodeState}`);
            glowCircle.setAttribute('fill', node.color);
            glowCircle.setAttribute('opacity', isUnlocked ? '0.3' : '0.15');
            glowCircle.setAttribute('filter', 'url(#glow)');
            group.appendChild(glowCircle);
        }

        // Main circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.position.x);
        circle.setAttribute('cy', node.position.y);
        circle.setAttribute('r', 40);
        circle.setAttribute('class', `node-circle ${nodeState}`);
        circle.setAttribute('data-id', node.id);

        // Color based on state
        if (isUnlocked) {
            circle.setAttribute('fill', node.color);
            circle.setAttribute('filter', 'url(#strong-glow)');
        } else if (canUnlock) {
            circle.setAttribute('fill', 'url(#unlockable-gradient)');
            circle.setAttribute('stroke', node.color);
            circle.setAttribute('stroke-width', '2');
        } else {
            circle.setAttribute('fill', 'url(#locked-gradient)');
            circle.setAttribute('stroke', '#444');
            circle.setAttribute('stroke-width', '2');
        }

        // Icon for node state
        if (!isUnlocked) {
            if (canUnlock) {
                // Unlockable - show glow outline
                const unlockGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                unlockGlow.setAttribute('cx', node.position.x);
                unlockGlow.setAttribute('cy', node.position.y);
                unlockGlow.setAttribute('r', 20);
                unlockGlow.setAttribute('fill', 'none');
                unlockGlow.setAttribute('stroke', '#FFD700');
                unlockGlow.setAttribute('stroke-width', '2');
                unlockGlow.setAttribute('opacity', '0.8');
                unlockGlow.setAttribute('class', 'unlock-indicator');
                group.appendChild(unlockGlow);

                // Pulsing dot
                const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                dot.setAttribute('cx', node.position.x);
                dot.setAttribute('cy', node.position.y);
                dot.setAttribute('r', '4');
                dot.setAttribute('fill', '#FFD700');
                dot.setAttribute('filter', 'url(#glow)');
                group.appendChild(dot);
            } else {
                // Locked - show lock SVG icon
                const lockGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                lockGroup.setAttribute('class', 'lock-icon');

                // Lock body
                const lockBody = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                lockBody.setAttribute('x', node.position.x - 8);
                lockBody.setAttribute('y', node.position.y - 2);
                lockBody.setAttribute('width', '16');
                lockBody.setAttribute('height', '12');
                lockBody.setAttribute('rx', '2');
                lockBody.setAttribute('fill', '#555');
                lockBody.setAttribute('stroke', '#777');
                lockBody.setAttribute('stroke-width', '1');

                // Lock shackle
                const lockShackle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                lockShackle.setAttribute('d', `M ${node.position.x - 6} ${node.position.y - 2}
                                               v -6
                                               a 6 6 0 0 1 12 0
                                               v 6`);
                lockShackle.setAttribute('fill', 'none');
                lockShackle.setAttribute('stroke', '#555');
                lockShackle.setAttribute('stroke-width', '2');
                lockShackle.setAttribute('stroke-linecap', 'round');

                lockGroup.appendChild(lockShackle);
                lockGroup.appendChild(lockBody);
                group.appendChild(lockGroup);
            }
        } else {
            // Unlocked - show checkmark
            const checkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            checkPath.setAttribute('d', `M ${node.position.x - 10} ${node.position.y}
                                         l 4 6
                                         l 8 -12`);
            checkPath.setAttribute('fill', 'none');
            checkPath.setAttribute('stroke', '#fff');
            checkPath.setAttribute('stroke-width', '3');
            checkPath.setAttribute('stroke-linecap', 'round');
            checkPath.setAttribute('stroke-linejoin', 'round');
            checkPath.setAttribute('class', 'checkmark');
            checkPath.setAttribute('filter', 'url(#glow)');
            group.appendChild(checkPath);
        }

        // Tier badge
        const tierBadge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        tierBadge.setAttribute('cx', node.position.x + 25);
        tierBadge.setAttribute('cy', node.position.y - 25);
        tierBadge.setAttribute('r', 12);
        tierBadge.setAttribute('fill', '#1a1a1a');
        tierBadge.setAttribute('stroke', isUnlocked ? node.color : '#444');
        tierBadge.setAttribute('stroke-width', '2');
        group.appendChild(tierBadge);

        const tierText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tierText.setAttribute('x', node.position.x + 25);
        tierText.setAttribute('y', node.position.y - 21);
        tierText.setAttribute('text-anchor', 'middle');
        tierText.setAttribute('font-size', '10');
        tierText.setAttribute('font-weight', 'bold');
        tierText.setAttribute('fill', isUnlocked ? node.color : '#888');
        tierText.textContent = `T${node.tier}`;
        group.appendChild(tierText);

        // Name label
        const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nameText.setAttribute('x', node.position.x);
        nameText.setAttribute('y', node.position.y + 60);
        nameText.setAttribute('text-anchor', 'middle');
        nameText.setAttribute('font-size', '14');
        nameText.setAttribute('font-weight', 'bold');
        nameText.setAttribute('fill', isUnlocked ? '#fff' : (canUnlock ? '#ccc' : '#666'));
        nameText.setAttribute('class', 'node-name');
        nameText.textContent = node.name;
        group.appendChild(nameText);

        // Cost label (if not unlocked)
        if (!isUnlocked) {
            const costBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            costBg.setAttribute('x', node.position.x - 20);
            costBg.setAttribute('y', node.position.y - 55);
            costBg.setAttribute('width', 40);
            costBg.setAttribute('height', 18);
            costBg.setAttribute('rx', 9);
            costBg.setAttribute('fill', canUnlock ? '#2a4a2a' : '#2a2a2a');
            costBg.setAttribute('stroke', canUnlock ? '#4a8a4a' : '#444');
            costBg.setAttribute('stroke-width', '1');
            group.appendChild(costBg);

            const costText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            costText.setAttribute('x', node.position.x);
            costText.setAttribute('y', node.position.y - 42);
            costText.setAttribute('text-anchor', 'middle');
            costText.setAttribute('font-size', '12');
            costText.setAttribute('font-weight', 'bold');
            costText.setAttribute('fill', canUnlock ? '#8f8' : '#888');
            costText.textContent = `⚡${node.cost}`;
            group.appendChild(costText);
        }

        // Click handler
        circle.style.cursor = 'pointer';
        group.style.cursor = 'pointer';
        group.addEventListener('click', () => {
            this.selectNode(node.id);
        });

        // Add pulsing animation for unlockable nodes
        if (canUnlock && !isUnlocked) {
            const glowCircle = group.querySelector('.node-glow');
            if (glowCircle) {
                glowCircle.innerHTML = '<animate attributeName="r" values="45;55;45" dur="2s" repeatCount="indefinite"/>' +
                    '<animate attributeName="opacity" values="0.15;0.25;0.15" dur="2s" repeatCount="indefinite"/>';
            }
        }

        group.appendChild(circle);
        nodesLayer.appendChild(group);
    }

    canUnlockNode(nodeId) {
        const node = this.data.nodes[nodeId];
        if (!node) return false;

        // Already unlocked
        if (this.unlockedNodes.has(nodeId)) return false;

        // Check if we have enough points
        if (this.skillPoints < node.cost) return false;

        // Check prerequisites
        for (const prereq of node.prerequisites) {
            if (!this.unlockedNodes.has(prereq)) {
                return false;
            }
        }

        return true;
    }

    selectNode(nodeId) {
        this.selectedNode = nodeId;
        const node = this.data.nodes[nodeId];

        // Show panel
        const panel = document.getElementById('skill-panel');
        panel.classList.add('open');

        // Update panel content
        document.getElementById('skill-name').textContent = node.name;
        document.getElementById('skill-desc').textContent = node.description;

        // Status
        const isUnlocked = this.unlockedNodes.has(nodeId);
        const canUnlock = this.canUnlockNode(nodeId);
        const statusEl = document.getElementById('skill-status');

        if (isUnlocked) {
            statusEl.innerHTML = '<span class="status-badge unlocked"><span class="badge-icon">✓</span> UNLOCKED</span>';
        } else if (canUnlock) {
            statusEl.innerHTML = '<span class="status-badge unlockable"><span class="badge-icon">◈</span> AVAILABLE</span>';
        } else {
            statusEl.innerHTML = '<span class="status-badge locked"><span class="badge-icon">●</span> LOCKED</span>';
        }

        // Functions
        const functionsEl = document.getElementById('skill-functions');
        functionsEl.innerHTML = '';
        node.functions.forEach(func => {
            const li = document.createElement('li');
            li.textContent = func;
            li.style.opacity = isUnlocked ? '1' : '0.5';
            functionsEl.appendChild(li);
        });

        // Requirements
        if (node.prerequisites.length > 0) {
            document.getElementById('skill-requirements').style.display = 'block';
            const reqList = document.getElementById('requirements-list');
            reqList.innerHTML = '';

            node.prerequisites.forEach(prereqId => {
                const prereqNode = this.data.nodes[prereqId];
                const reqDiv = document.createElement('div');
                reqDiv.className = 'requirement-item';

                const isMet = this.unlockedNodes.has(prereqId);
                reqDiv.innerHTML = `
                    <span class="req-icon ${isMet ? 'met' : 'unmet'}">${isMet ? '✓' : '—'}</span>
                    <span class="req-name" style="color: ${isMet ? '#64ff64' : '#ff6464'}">${prereqNode.name}</span>
                `;
                reqList.appendChild(reqDiv);
            });
        } else {
            document.getElementById('skill-requirements').style.display = 'none';
        }

        // Sub-regions/bonuses
        if (node.subRegions && node.subRegions.length > 0) {
            document.getElementById('skill-bonuses').style.display = 'block';
            const bonusList = document.getElementById('bonuses-list');
            bonusList.innerHTML = '';

            node.subRegions.forEach(sub => {
                const bonusDiv = document.createElement('div');
                bonusDiv.className = 'bonus-item';
                bonusDiv.innerHTML = `
                    <strong>${sub.name}:</strong>
                    <span style="color: #8f8; opacity: ${isUnlocked ? '1' : '0.5'}">${sub.bonus}</span>
                `;
                bonusList.appendChild(bonusDiv);
            });
        } else {
            document.getElementById('skill-bonuses').style.display = 'none';
        }

        // Connections/Synergies
        const unlocks = node.unlocks;
        if (unlocks.length > 0) {
            document.getElementById('skill-connections').style.display = 'block';
            const connList = document.getElementById('connections-list');
            connList.innerHTML = '';

            unlocks.forEach(unlockId => {
                const unlockNode = this.data.nodes[unlockId];
                const connDiv = document.createElement('div');
                connDiv.className = 'connection-item';
                connDiv.style.cursor = 'pointer';
                connDiv.innerHTML = `<span style="color: ${unlockNode.color}">${unlockNode.name}</span>`;
                connDiv.addEventListener('click', () => this.selectNode(unlockId));
                connList.appendChild(connDiv);
            });
        } else {
            document.getElementById('skill-connections').style.display = 'none';
        }

        // Unlock button
        const unlockBtn = document.getElementById('unlock-btn');
        const costValue = document.getElementById('cost-value');
        costValue.textContent = node.cost;

        if (isUnlocked) {
            unlockBtn.disabled = true;
            unlockBtn.innerHTML = '<span class="btn-text">Already Unlocked</span>';
        } else if (canUnlock) {
            unlockBtn.disabled = false;
            unlockBtn.innerHTML = '<span class="btn-text">Unlock Region</span>';
        } else {
            unlockBtn.disabled = true;
            if (this.skillPoints < node.cost) {
                unlockBtn.innerHTML = '<span class="btn-text">Not Enough Points</span>';
            } else {
                unlockBtn.innerHTML = '<span class="btn-text">Requirements Not Met</span>';
            }
        }

        // Highlight connected nodes
        this.highlightConnections(nodeId);
    }

    unlockSelectedNode() {
        if (!this.selectedNode) return;

        const node = this.data.nodes[this.selectedNode];
        if (!this.canUnlockNode(this.selectedNode)) return;

        // Deduct points
        this.skillPoints -= node.cost;

        // Add to unlocked
        this.unlockedNodes.add(this.selectedNode);

        // Visual effects
        UnlockEffects.createUnlockBurst(node.position.x, node.position.y, node.color);
        UnlockEffects.createPulseRing(node.position.x, node.position.y, node.color);
        UnlockEffects.createFloatingText(node.position.x, node.position.y - 80, '+' + node.name, node.color);

        // Pulse connections
        node.unlocks.forEach(unlockId => {
            const unlockNode = this.data.nodes[unlockId];
            if (unlockNode) {
                setTimeout(() => {
                    UnlockEffects.createConnectionPulse(
                        node.position.x, node.position.y,
                        unlockNode.position.x, unlockNode.position.y,
                        node.color
                    );
                }, 300);
            }
        });

        // Show notification
        this.showNotification(`${node.name} unlocked!`, 'success');

        // Check achievements
        this.checkAchievements();

        // Update UI
        this.updateUI();
        this.renderSkillTree();
        this.selectNode(this.selectedNode); // Refresh panel

        // Auto-save
        this.saveProgress();
    }

    closeSkillPanel() {
        document.getElementById('skill-panel').classList.remove('open');
        this.selectedNode = null;
        this.highlightConnections(null);
    }

    highlightConnections(nodeId) {
        // Reset all
        document.querySelectorAll('.connection').forEach(line => {
            line.classList.remove('highlighted');
        });

        document.querySelectorAll('.node-group').forEach(group => {
            group.classList.remove('highlighted');
        });

        if (!nodeId) return;

        // Highlight connections
        document.querySelectorAll('.connection').forEach(line => {
            const from = line.getAttribute('data-from');
            const to = line.getAttribute('data-to');

            if (from === nodeId || to === nodeId) {
                line.classList.add('highlighted');
            }
        });

        // Highlight connected nodes
        const node = this.data.nodes[nodeId];
        [...node.prerequisites, ...node.unlocks].forEach(connId => {
            const group = document.querySelector(`.node-group[data-id="${connId}"]`);
            if (group) {
                group.classList.add('highlighted');
            }
        });
    }

    updateUI() {
        // Update skill points
        document.getElementById('skill-points').textContent = this.skillPoints;

        // Update regions unlocked
        const total = Object.keys(this.data.nodes).length;
        const unlocked = this.unlockedNodes.size;
        document.getElementById('regions-unlocked').textContent = `${unlocked}/${total}`;

        // Update brain power
        const brainPower = Math.round((unlocked / total) * 100);
        document.getElementById('brain-power').textContent = `${brainPower}%`;
    }

    checkAchievements() {
        this.data.achievements.forEach(achievement => {
            if (this.achievements.has(achievement.id)) return;

            let unlocked = false;

            switch (achievement.requirement.type) {
                case 'unlock_count':
                    if (this.unlockedNodes.size >= achievement.requirement.value) {
                        unlocked = true;
                    }
                    break;

                case 'unlock_specific':
                    if (this.unlockedNodes.has(achievement.requirement.value)) {
                        unlocked = true;
                    }
                    break;

                case 'unlock_category':
                    const categoryNodes = Object.values(this.data.nodes)
                        .filter(n => n.category === achievement.requirement.value);
                    if (categoryNodes.every(n => this.unlockedNodes.has(n.id))) {
                        unlocked = true;
                    }
                    break;
            }

            if (unlocked) {
                this.achievements.add(achievement.id);
                this.showNotification(
                    `${achievement.icon} Achievement: ${achievement.name}`,
                    'achievement'
                );
            }
        });
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showWelcomeModal() {
        // Only show if first time
        if (this.unlockedNodes.size === 0 && !localStorage.getItem('brainSkillTree_welcomed')) {
            document.getElementById('welcome-modal').classList.add('show');
            localStorage.setItem('brainSkillTree_welcomed', 'true');
        }
    }

    hideWelcomeModal() {
        document.getElementById('welcome-modal').classList.remove('show');
    }

    saveProgress() {
        const saveData = {
            skillPoints: this.skillPoints,
            unlockedNodes: Array.from(this.unlockedNodes),
            achievements: Array.from(this.achievements)
        };

        localStorage.setItem('brainSkillTree_save', JSON.stringify(saveData));
    }

    loadProgress() {
        const savedData = localStorage.getItem('brainSkillTree_save');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.skillPoints = data.skillPoints || this.data.initialSkillPoints;
                this.unlockedNodes = new Set(data.unlockedNodes || []);
                this.achievements = new Set(data.achievements || []);
            } catch (e) {
                console.error('Failed to load save data:', e);
            }
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.skillPoints = this.data.initialSkillPoints;
            this.unlockedNodes.clear();
            this.achievements.clear();
            this.selectedNode = null;

            localStorage.removeItem('brainSkillTree_save');

            this.updateUI();
            this.renderSkillTree();
            this.closeSkillPanel();

            this.showNotification('Progress reset!', 'info');
        }
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BrainSkillTreeGame();
    console.log('Brain Skill Tree Game initialized');
});
