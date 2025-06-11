// js/script.js

const shooterElement = document.getElementById("shooter");
shooterElement.width = 800;
shooterElement.height = 600;
const ctx = shooterElement.getContext("2d");

const targetElement = document.getElementById("target");
const textY = targetElement.getBoundingClientRect().top;

let highlighttarget = false;

class Player {
    constructor() {
        this.x = shooterElement.width / 2 - 10;
        this.y = shooterElement.height - 40;
        this.width = 20;
        this.height = 20;
        this.color = "#FFFFFF";
        this.speed = 3;
        this.targetX = this.x + 80;
        this.bullets = [];
        this.shooting = false;
        this.startMovement = false;
    }

    draw() {
        ctx.fillStyle = this.color;
    
        ctx.fillRect(this.x + 6, this.y, 8, 4);
        ctx.fillRect(this.x + 4, this.y + 4, 12, 4);
        ctx.fillRect(this.x, this.y + 8, 20, 4);
    
        ctx.fillRect(this.x, this.y + 4, 4, 4);
        ctx.fillRect(this.x + 16, this.y + 4, 4, 4);
    
        const stopBeforetarget = textY + 50;
        // const stopBeforetarget = textY + 40;
    
        this.bullets.forEach((bullet, index) => {
            bullet.y -= bullet.speed;
    
            if (!highlighttarget && bullet.y > stopBeforetarget) {
                highlighttarget = true;
                targetElement.classList.add("underline");
            }
    
            if (bullet.y > stopBeforetarget) {
                ctx.fillStyle = bullet.color;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            } else {
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
