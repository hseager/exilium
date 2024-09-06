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
}
