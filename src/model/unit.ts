import {
  getFactionTheme,
  safeZoneConfig,
  tankStyle,
  wallConfig,
} from "@/core/config";
import { drawEngine } from "../core/draw-engine";
import { Faction, Stats, UnitType } from "../core/types";

export class Unit {
  type: UnitType;
  position: DOMPoint;
  faction: Faction;
  stats: Stats;
  lastAttackTime?: number;
  hasAttackedPylon: boolean;
  maxHealth: number;

  constructor(type: UnitType, faction: Faction, stats: Stats) {
    this.type = type;
    this.faction = faction;
    this.position = this.getStartingPosition();
    this.stats = stats;
    this.hasAttackedPylon = false;
    this.maxHealth = stats.health;
  }

  private getStartingPosition() {
    if (this.faction === Faction.Vanguard) {
      return new DOMPoint(
        drawEngine.mousePosition.x,
        drawEngine.canvasHeight - 25
      );
    } else {
      return this.getRandomStartPosition();
    }
  }

  private getRandomStartPosition() {
    const min = wallConfig.x;
    const max = drawEngine.canvasWidth - wallConfig.x;
    const randomX = Math.floor(Math.random() * (max - min + 1)) + min;

    if (this.faction === Faction.Vanguard) {
      return new DOMPoint(randomX, drawEngine.canvasHeight - 25);
    } else {
      return new DOMPoint(randomX, wallConfig.y);
    }
  }

  setRandomStartPosition() {
    this.position = this.getRandomStartPosition();
  }

  initPosition() {
    this.position = this.getStartingPosition();
  }

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {
    const theme = getFactionTheme(this.faction);

    const posX = x ?? this.position.x;
    const posY = y ?? this.position.y;

    const healthRatio = this.stats.health / this.maxHealth;
    const fillHeight = tankStyle.height * healthRatio;

    ctx.beginPath();

    if (this.type === UnitType.Infantry) {
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
    } else if (this.type === UnitType.Tank) {
      // Draw the full rectangle for the tank
      ctx.rect(
        x ? x - tankStyle.width / 2 : this.position.x - tankStyle.width / 2,
        y ? y - tankStyle.height / 2 : this.position.y - tankStyle.height / 2,
        tankStyle.width,
        tankStyle.height
      );

      // Set the stroke style for the range
      ctx.strokeStyle = theme.border;
      ctx.stroke();

      // Draw the health-based filled rectangle
      ctx.beginPath();
      ctx.rect(
        x ? x - tankStyle.width / 2 : this.position.x - tankStyle.width / 2,
        y
          ? y - tankStyle.height / 2 + (tankStyle.height - fillHeight)
          : this.position.y -
              tankStyle.height / 2 +
              (tankStyle.height - fillHeight),
        tankStyle.width,
        fillHeight
      );
      ctx.fillStyle = theme.fill;
      ctx.fill();
    }

    ctx.closePath();
  }
}
