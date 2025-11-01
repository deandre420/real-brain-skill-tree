// Particle system for immersive background effects

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connectionDistance = 150;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(100, 180, 255, ${particle.opacity})`;
        this.ctx.fill();
    }

    drawConnection(p1, p2, distance) {
        const opacity = (1 - distance / this.connectionDistance) * 0.3;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.strokeStyle = `rgba(100, 180, 255, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.drawConnection(this.particles[i], this.particles[j], distance);
                }
            }
        }

        // Draw particles
        this.particles.forEach(particle => this.drawParticle(particle));
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// SVG particle effects for skill unlocks
class UnlockEffects {
    static createUnlockBurst(x, y, color) {
        const svg = document.getElementById('effects-layer');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 50 + Math.random() * 30;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 3);
            circle.setAttribute('fill', color);
            circle.setAttribute('opacity', 1);

            svg.appendChild(circle);

            // Animate
            const duration = 600 + Math.random() * 400;
            const animation = circle.animate([
                { cx: x, cy: y, opacity: 1, r: 3 },
                { cx: endX, cy: endY, opacity: 0, r: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            });

            animation.onfinish = () => circle.remove();
        }
    }

    static createPulseRing(x, y, color) {
        const svg = document.getElementById('effects-layer');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 40);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', 3);
        circle.setAttribute('opacity', 1);

        svg.appendChild(circle);

        const animation = circle.animate([
            { r: 40, opacity: 1, strokeWidth: 3 },
            { r: 80, opacity: 0, strokeWidth: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        animation.onfinish = () => circle.remove();
    }

    static createConnectionPulse(x1, y1, x2, y2, color) {
        const svg = document.getElementById('effects-layer');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', 4);
        line.setAttribute('opacity', 0);

        svg.appendChild(line);

        const animation = line.animate([
            { opacity: 0, strokeWidth: 4 },
            { opacity: 1, strokeWidth: 6 },
            { opacity: 0, strokeWidth: 2 }
        ], {
            duration: 600,
            easing: 'ease-in-out'
        });

        animation.onfinish = () => line.remove();
    }

    static createFloatingText(x, y, text, color = '#FFD700') {
        const svg = document.getElementById('effects-layer');

        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', x);
        textEl.setAttribute('y', y);
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('fill', color);
        textEl.setAttribute('font-size', '20');
        textEl.setAttribute('font-weight', 'bold');
        textEl.setAttribute('opacity', 1);
        textEl.textContent = text;

        svg.appendChild(textEl);

        const animation = textEl.animate([
            { y: y, opacity: 1, fontSize: '20px' },
            { y: y - 50, opacity: 0, fontSize: '24px' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        animation.onfinish = () => textEl.remove();
    }
}

// Export effects class
if (typeof window !== 'undefined') {
    window.UnlockEffects = UnlockEffects;
}
