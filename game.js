// Brain Skill Tree - Idle Clicker Game
// Cookie clicker style with passive generation

class BrainSkillTreeGame {
    constructor() {
        this.data = gameSkillTree;

        // Game state
        this.tokens = 0;
        this.totalEarned = 0;
        this.clickPower = this.data.initialClickPower;
        this.tokensPerSecond = 0;
        this.unlockedNodes = new Set();
        this.selectedNode = null;
        this.lastUpdate = Date.now();

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

        // Start passive generation loop
        this.startGenerationLoop();

        // Show welcome modal (first time only)
        this.showWelcomeModal();
    }

    setupEventListeners() {
        // Clicker button
        document.getElementById('clicker-btn').addEventListener('click', (e) => {
            this.handleClick(e);
        });

        // Stats panel toggle
        document.getElementById('stats-btn').addEventListener('click', () => {
            document.getElementById('stats-panel').classList.toggle('open');
        });

        document.getElementById('close-stats').addEventListener('click', () => {
            document.getElementById('stats-panel').classList.remove('open');
        });

        // Close skill panel
        document.getElementById('close-panel').addEventListener('click', () => {
            this.closeSkillPanel();
        });

        // Unlock button
        document.getElementById('unlock-btn').addEventListener('click', () => {
            this.unlockSelectedNode();
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetProgress();
        });

        // Info button
        document.getElementById('info-btn').addEventListener('click', () => {
            window.open('educational.html', '_blank');
        });

        // Welcome modal
        document.getElementById('start-btn').addEventListener('click', () => {
            this.hideWelcomeModal();
        });

        // Click outside panels to close
        document.addEventListener('click', (e) => {
            const skillPanel = document.getElementById('skill-panel');
            const statsPanel = document.getElementById('stats-panel');

            if (!skillPanel.contains(e.target) && !e.target.closest('.node-circle')) {
                this.closeSkillPanel();
            }

            if (!statsPanel.contains(e.target) && e.target.id !== 'stats-btn') {
                statsPanel.classList.remove('open');
            }
        });
    }

    handleClick(e) {
        // Add tokens
        this.tokens += this.clickPower;
        this.totalEarned += this.clickPower;

        // Show floating text
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        this.showFloatingText(`+${this.clickPower}`, rect.left + rect.width/2, rect.top);

        // Animate button
        btn.style.animation = 'none';
        setTimeout(() => {
            btn.style.animation = '';
        }, 10);

        // Update UI
        this.updateUI();
        this.saveProgress();
    }

    showFloatingText(text, x, y) {
        const float = document.createElement('div');
        float.className = 'floating-text';
        float.textContent = text;
        float.style.left = `${x}px`;
        float.style.top = `${y}px`;
        float.style.position = 'fixed';
        float.style.color = '#FFD700';
        float.style.fontSize = '24px';
        float.style.fontWeight = '900';
        float.style.pointerEvents = 'none';
        float.style.zIndex = '1000';
        float.style.textShadow = '0 0 10px rgba(255,215,0,0.8)';

        document.body.appendChild(float);

        float.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-100px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => float.remove();
    }

    startGenerationLoop() {
        setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - this.lastUpdate) / 1000; // seconds
            this.lastUpdate = now;

            // Generate passive tokens
            const generated = this.tokensPerSecond * deltaTime;
            if (generated > 0) {
                this.tokens += generated;
                this.totalEarned += generated;
                this.updateUI();
            }

            // Auto-save every 10 seconds
            if (Math.random() < 0.1) {
                this.saveProgress();
            }
        }, 100); // Update 10 times per second for smooth display
    }

    calculateProduction() {
        let totalTPS = 0;
        let totalClick = this.data.initialClickPower;

        this.unlockedNodes.forEach(nodeId => {
            const node = this.data.nodes[nodeId];
            if (node) {
                totalTPS += node.tokensPerSecond || 0;
                totalClick += node.clickBonus || 0;
            }
        });

        this.tokensPerSecond = totalTPS;
        this.clickPower = totalClick;
    }

    renderSkillTree() {
        const nodesLayer = document.getElementById('nodes-layer');
        nodesLayer.innerHTML = '';

        this.renderConnections();

        Object.values(this.data.nodes).forEach(node => {
            this.renderNode(node);
        });
    }

    renderConnections() {
        const connectionsLayer = document.getElementById('connections-layer');
        connectionsLayer.innerHTML = '';

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
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'node-group');
        group.setAttribute('data-id', node.id);

        const isUnlocked = this.unlockedNodes.has(node.id);
        const canUnlock = this.canUnlockNode(node.id);
        const nodeState = isUnlocked ? 'unlocked' : (canUnlock ? 'unlockable' : 'locked');

        // Glow circle for unlockable/unlocked
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

        // Icon for unlocked nodes
        if (isUnlocked) {
            const iconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            iconText.setAttribute('x', node.position.x);
            iconText.setAttribute('y', node.position.y + 10);
            iconText.setAttribute('text-anchor', 'middle');
            iconText.setAttribute('font-size', '32');
            iconText.setAttribute('fill', '#fff');
            iconText.setAttribute('class', 'node-icon');
            iconText.setAttribute('filter', 'url(#glow)');
            iconText.textContent = node.icon || '●';
            group.appendChild(iconText);
        } else if (canUnlock) {
            // Pulsing ring for unlockable
            const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            ring.setAttribute('cx', node.position.x);
            ring.setAttribute('cy', node.position.y);
            ring.setAttribute('r', 20);
            ring.setAttribute('fill', 'none');
            ring.setAttribute('stroke', '#FFD700');
            ring.setAttribute('stroke-width', '2');
            ring.setAttribute('class', 'unlock-indicator');
            group.appendChild(ring);
        } else {
            // Lock icon for locked nodes
            const lockGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

            const lockBody = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            lockBody.setAttribute('x', node.position.x - 8);
            lockBody.setAttribute('y', node.position.y - 2);
            lockBody.setAttribute('width', '16');
            lockBody.setAttribute('height', '12');
            lockBody.setAttribute('rx', '2');
            lockBody.setAttribute('fill', '#555');
            lockBody.setAttribute('stroke', '#777');
            lockBody.setAttribute('stroke-width', '1');

            const lockShackle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            lockShackle.setAttribute('d', `M ${node.position.x - 6} ${node.position.y - 2} v -6 a 6 6 0 0 1 12 0 v 6`);
            lockShackle.setAttribute('fill', 'none');
            lockShackle.setAttribute('stroke', '#555');
            lockShackle.setAttribute('stroke-width', '2');

            lockGroup.appendChild(lockShackle);
            lockGroup.appendChild(lockBody);
            group.appendChild(lockGroup);
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
            costBg.setAttribute('x', node.position.x - 25);
            costBg.setAttribute('y', node.position.y - 55);
            costBg.setAttribute('width', 50);
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
            costText.textContent = `${node.cost}`;
            group.appendChild(costText);
        }

        // Click handler
        circle.style.cursor = 'pointer';
        group.style.cursor = 'pointer';
        group.addEventListener('click', () => {
            this.selectNode(node.id);
        });

        // Pulsing animation for unlockable
        if (canUnlock && !isUnlocked) {
            const ring = group.querySelector('.unlock-indicator');
            if (ring) {
                ring.innerHTML = '<animate attributeName="r" values="15;25;15" dur="2s" repeatCount="indefinite"/>';
            }
        }

        group.appendChild(circle);
        nodesLayer.appendChild(group);
    }

    canUnlockNode(nodeId) {
        const node = this.data.nodes[nodeId];
        if (!node || this.unlockedNodes.has(nodeId)) return false;
        if (this.tokens < node.cost) return false;

        for (const prereq of node.prerequisites) {
            if (!this.unlockedNodes.has(prereq)) return false;
        }

        return true;
    }

    selectNode(nodeId) {
        this.selectedNode = nodeId;
        const node = this.data.nodes[nodeId];

        const panel = document.getElementById('skill-panel');
        panel.classList.add('open');

        document.getElementById('skill-name').textContent = node.name;
        document.getElementById('skill-desc').textContent = node.description;

        const isUnlocked = this.unlockedNodes.has(nodeId);

        // Show generation stats
        if (isUnlocked) {
            document.getElementById('skill-generation').style.display = 'block';
            document.getElementById('gen-tokens').textContent = `+${node.tokensPerSecond}/s`;
            document.getElementById('gen-click').textContent = `+${node.clickBonus}`;
        } else {
            document.getElementById('skill-generation').style.display = 'none';
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
                const isMet = this.unlockedNodes.has(prereqId);
                const reqDiv = document.createElement('div');
                reqDiv.className = 'requirement-item';
                reqDiv.innerHTML = `
                    <span class="req-icon ${isMet ? 'met' : 'unmet'}">${isMet ? '✓' : '—'}</span>
                    <span class="req-name" style="color: ${isMet ? '#64ff64' : '#ff6464'}">${prereqNode.name}</span>
                `;
                reqList.appendChild(reqDiv);
            });
        } else {
            document.getElementById('skill-requirements').style.display = 'none';
        }

        // Sub-regions
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

        // Connections
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
        } else if (this.canUnlockNode(nodeId)) {
            unlockBtn.disabled = false;
            unlockBtn.innerHTML = '<span class="btn-text">Unlock Region</span>';
        } else {
            unlockBtn.disabled = true;
            if (this.tokens < node.cost) {
                unlockBtn.innerHTML = '<span class="btn-text">Not Enough Tokens</span>';
            } else {
                unlockBtn.innerHTML = '<span class="btn-text">Requirements Not Met</span>';
            }
        }

        this.highlightConnections(nodeId);
    }

    unlockSelectedNode() {
        if (!this.selectedNode || !this.canUnlockNode(this.selectedNode)) return;

        const node = this.data.nodes[this.selectedNode];

        // Deduct tokens
        this.tokens -= node.cost;

        // Add to unlocked
        this.unlockedNodes.add(this.selectedNode);

        // Recalculate production
        this.calculateProduction();

        // Visual effects
        UnlockEffects.createUnlockBurst(node.position.x, node.position.y, node.color);
        UnlockEffects.createPulseRing(node.position.x, node.position.y, node.color);

        // Show notification
        this.showNotification(`${node.name} unlocked! +${node.tokensPerSecond}/s`, 'success');

        // Update UI
        this.updateUI();
        this.renderSkillTree();
        this.selectNode(this.selectedNode);

        // Auto-save
        this.saveProgress();
    }

    closeSkillPanel() {
        document.getElementById('skill-panel').classList.remove('open');
        this.selectedNode = null;
        this.highlightConnections(null);
    }

    highlightConnections(nodeId) {
        document.querySelectorAll('.connection').forEach(line => {
            line.classList.remove('highlighted');
        });

        document.querySelectorAll('.node-group').forEach(group => {
            group.classList.remove('highlighted');
        });

        if (!nodeId) return;

        const node = this.data.nodes[nodeId];
        [...node.prerequisites, ...node.unlocks].forEach(connId => {
            const group = document.querySelector(`.node-group[data-id="${connId}"]`);
            if (group) group.classList.add('highlighted');
        });
    }

    updateUI() {
        // Top HUD
        document.getElementById('tokens-display').textContent = Math.floor(this.tokens);
        document.getElementById('rate-display').textContent = `${this.tokensPerSecond.toFixed(1)}/s`;
        document.getElementById('regions-display').textContent = `${this.unlockedNodes.size}/${Object.keys(this.data.nodes).length}`;
        document.getElementById('click-power').textContent = `+${this.clickPower}`;

        // Stats panel
        document.getElementById('total-rate').textContent = this.tokensPerSecond.toFixed(1);
        document.getElementById('total-click').textContent = this.clickPower;
        document.getElementById('total-earned').textContent = Math.floor(this.totalEarned);

        // Update unlocked regions list
        const unlockedList = document.getElementById('unlocked-regions-list');
        unlockedList.innerHTML = '';

        this.unlockedNodes.forEach(nodeId => {
            const node = this.data.nodes[nodeId];
            const item = document.createElement('div');
            item.className = 'region-item';
            item.style.borderLeftColor = node.color;
            item.innerHTML = `
                <span class="region-name">${node.name}</span>
                <span class="region-production">+${node.tokensPerSecond}/s</span>
            `;
            unlockedList.appendChild(item);
        });
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showWelcomeModal() {
        if (!localStorage.getItem('brainSkillTree_welcomed')) {
            document.getElementById('welcome-modal').classList.add('show');
            localStorage.setItem('brainSkillTree_welcomed', 'true');
        }
    }

    hideWelcomeModal() {
        document.getElementById('welcome-modal').classList.remove('show');
    }

    saveProgress() {
        const saveData = {
            tokens: this.tokens,
            totalEarned: this.totalEarned,
            unlockedNodes: Array.from(this.unlockedNodes)
        };
        localStorage.setItem('brainSkillTree_save', JSON.stringify(saveData));
    }

    loadProgress() {
        const savedData = localStorage.getItem('brainSkillTree_save');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.tokens = data.tokens || 0;
                this.totalEarned = data.totalEarned || 0;
                this.unlockedNodes = new Set(data.unlockedNodes || []);
                this.calculateProduction();
            } catch (e) {
                console.error('Failed to load save data:', e);
            }
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.tokens = 0;
            this.totalEarned = 0;
            this.clickPower = this.data.initialClickPower;
            this.tokensPerSecond = 0;
            this.unlockedNodes.clear();
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
    console.log('Brain Tech Tree initialized');
});
