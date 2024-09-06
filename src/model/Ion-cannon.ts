import { ionCannonConfig, safeZoneConfig, wallConfig } from "@/core/config";
import { drawEngine } from "@/core/draw-engine";
import { Unit } from "./unit";
import { Mode } from "@/core/types";
import { GameManager } from "@/core/game-manager";

export class IonCannon {
  private ctx = drawEngine.context;
  private isFiring = false;
  private gameManager: GameManager;
  private x = 0;
  private y = 0;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  check() {
    if (this.gameManager.mode == Mode.IonCannon) {
      this.draw(drawEngine.mousePosition.x, drawEngine.mousePosition.y);
    } else {
      if (this.isFiring) {
        this.draw(this.x, this.y);
        this.animateLightning(this.x, this.y);
      }
    }
  }

  private draw(x: number, y: number) {
    const xPadding = ionCannonConfig.radius;

    if (x < xPadding) x = xPadding;
    if (x > drawEngine.canvasWidth - xPadding)
      x = drawEngine.canvasWidth - xPadding;

    if (y < wallConfig.y) y = wallConfig.y;
    if (y > drawEngine.canvasHeight - safeZoneConfig.y)
      y = drawEngine.canvasHeight - safeZoneConfig.y;

    this.ctx.globalAlpha = ionCannonConfig.opacity;
    this.ctx.beginPath();
    this.ctx.arc(x, y, ionCannonConfig.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = ionCannonConfig.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }

  fire(units: Unit[]) {
    let timeElapsed = 0;
    this.isFiring = true;
    this.x = drawEngine.mousePosition.x;
    this.y = drawEngine.mousePosition.y;

    const damageInterval = setInterval(() => {
      timeElapsed += 1;

      units.forEach((unit) => {
        const distance = Math.sqrt(
          (unit.position.x - this.x) ** 2 + (unit.position.y - this.y) ** 2
        );

        if (distance <= ionCannonConfig.radius) {
          unit.stats.health -= ionCannonConfig.damage;

          if (unit.stats.health <= 0) {
            this.gameManager.combatManager.removeCombatUnit(unit);
          }
        }
      });

      if (timeElapsed >= ionCannonConfig.duration) {
        this.isFiring = false;
        clearInterval(damageInterval);
      }
    }, ionCannonConfig.interval);
  }

  private drawLightningBolt(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    zigzagCount: number
  ) {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);

    for (let i = 0; i < zigzagCount; i++) {
      // Generate a random point along the line for the zigzag
      const t = i / zigzagCount;
      const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 20; // Random horizontal deviation
      const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 20; // Random vertical deviation
      this.ctx.lineTo(x, y);
    }

    // Connect to the final point
    this.ctx.lineTo(endX, endY);

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private drawLightningInCircle(
    x: number,
    y: number,
    radius: number,
    boltCount: number
  ) {
    for (let i = 0; i < boltCount; i++) {
      // Random starting point within the circle
      const startAngle = Math.random() * Math.PI * 2;
      const startRadius = Math.random() * radius;
      const startX = x + startRadius * Math.cos(startAngle);
      const startY = y + startRadius * Math.sin(startAngle);

      // Random ending point within the circle
      const endAngle = Math.random() * Math.PI * 2;
      const endRadius = Math.random() * radius;
      const endX = x + endRadius * Math.cos(endAngle);
      const endY = y + endRadius * Math.sin(endAngle);

      // Draw a lightning bolt between the start and end points
      this.drawLightningBolt(startX, startY, endX, endY, 5); // 5 segments for zigzag
    }
  }

  private animateLightning(x: number, y: number) {
    const endTime = Date.now() + ionCannonConfig.duration * 1000;

    const animate = () => {
      // Draw new lightning bolts
      this.drawLightningInCircle(x, y, ionCannonConfig.radius, 3); // 3 bolts per frame

      // Continue animation while within the duration
      if (Date.now() < endTime) {
        requestAnimationFrame(animate);
      }
    };

    animate(); // Start the animation
  }
}
