import { getFactionTheme } from "@/core/config";
import { Unit } from "./unit";
import { Faction, Stats, TimerType } from "@/core/types";
import { Timer } from "./timers/timer";

export class Infantry extends Unit {
  constructor(faction: Faction, stats: Stats) {
    super(faction, stats);
  }

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const theme = getFactionTheme(this.faction);

    const posX = x ?? this.position.x;
    const posY = y ?? this.position.y;

    const healthRatio = this.stats.health / this.maxHealth;

    ctx.beginPath();

    // Draw the full arc stroke for the range (outer circle)
    ctx.arc(posX, posY, this.stats.range, 0, 2 * Math.PI);
    ctx.strokeStyle = theme.border;
    ctx.stroke();

    // Calculate the radius of the health circle based on health ratio
    const healthRadius = this.stats.range * healthRatio;

    // Draw the filled arc for health (inner circle)
    ctx.beginPath();
    ctx.arc(posX, posY, healthRadius, 0, 2 * Math.PI);
    ctx.fillStyle = theme.fill;
    ctx.fill();

    ctx.closePath();
  }
}
