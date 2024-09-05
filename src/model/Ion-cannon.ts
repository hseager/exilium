import { ionCannonConfig } from "@/core/config";
import { drawEngine } from "@/core/draw-engine";
import { Unit } from "./unit";

export class IonCannon {
  ctx = drawEngine.context;

  fire(units: Unit[]) {
    let timeElapsed = 0;
    let x = drawEngine.mousePosition.x;
    let y = drawEngine.mousePosition.y;

    const damageInterval = setInterval(() => {
      timeElapsed += 1;

      units.forEach((unit) => {
        const distance = Math.sqrt(
          (unit.position.x - x) ** 2 + (unit.position.y - y) ** 2
        );

        if (distance <= ionCannonConfig.radius) {
          unit.stats.health -= ionCannonConfig.damage;
        }
      });

      if (timeElapsed >= ionCannonConfig.duration) {
        clearInterval(damageInterval);
      }

      this.ctx.globalAlpha = ionCannonConfig.opacity;
      this.ctx.beginPath();
      this.ctx.arc(x, y, ionCannonConfig.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = ionCannonConfig.color;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.globalAlpha = 1;
    }, ionCannonConfig.interval);
  }
}
