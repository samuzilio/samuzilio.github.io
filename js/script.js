// js/script.js

const shooterElement = document.getElementById("shooter");
const ctx = shooterElement.getContext("2d");
const targetElement = document.getElementById("target");

let highlighttarget = false;

// 1. Make canvas fill the screen and update on resize
function resizeCanvas() {
    shooterElement.width = window.innerWidth;
    shooterElement.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call it immediately to set initial size

class Player {
    constructor() {
        // Base positions dynamically on the window size
        this.width = 20;
        this.height = 20;
        this.color = "#FFFFFF";
        this.speed = 3;
        this.bullets = [];
        this.shooting = false;
        this.startMovement = false;
        
        // Initial placement
        this.x = window.innerWidth / 2 - 10;
        this.y = window.innerHeight - 40;
        this.targetX = this.x + 80;

        // Keep player grounded to the bottom if the screen resizes
        window.addEventListener('resize', () => {
            this.y = window.innerHeight - 40;
        });
    }
    
    draw() {
        ctx.fillStyle = this.color;
    
        // Draw the ship
        ctx.fillRect(this.x + 6, this.y, 8, 4);
        ctx.fillRect(this.x + 4, this.y + 4, 12, 4);
        ctx.fillRect(this.x, this.y + 8, 20, 4);
        ctx.fillRect(this.x, this.y + 4, 4, 4);
        ctx.fillRect(this.x + 16, this.y + 4, 4, 4);
    
        // 2. Calculate text position dynamically every frame
        const textY = targetElement.getBoundingClientRect().top;
        const isMobile = window.innerWidth <= 768;
        const stopBeforetarget = textY + (isMobile ? 60 : 40);
    
        this.bullets.forEach((bullet, index) => {
            bullet.y -= bullet.speed;
    
            // If the bullet hasn't reached the target yet, draw it
            if (bullet.y > stopBeforetarget) {
                ctx.fillStyle = bullet.color;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            } else {
                // 3. Highlight the target ONLY when the bullet actually hits it
                if (!highlighttarget) {
                    highlighttarget = true;
                    targetElement.classList.add("underline");
                }
                // Remove bullet once it hits
                this.bullets.splice(index, 1);
            }
        });
    }
    
    update() {
        if (this.startMovement) {
            if (this.x < this.targetX) {
                this.x += this.speed;
                if (this.x > this.targetX) this.x = this.targetX;
            } else {
                if (!this.shooting) {
                    this.shooting = true;
                    this.startAutoFire();
                }
            }
        }
    }
    
    shoot() {
        this.bullets.push({
            x: this.x + this.width / 2 - 2,
            y: this.y,
            width: 4,
            height: 10,
            color: "#FFFFFF",
            speed: 8
        });
    }
    
    startAutoFire() {
        setInterval(() => {
            this.shoot();
        }, 500);
    }
    
    startMovementAfterDelay() {
        setTimeout(() => {
            this.startMovement = true;
        }, 5000);
    }
}

const player = new Player();
player.startMovementAfterDelay();

function update() {
    ctx.clearRect(0, 0, shooterElement.width, shooterElement.height);
    player.update();
    player.draw();
    requestAnimationFrame(update);
}
update();
