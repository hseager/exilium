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

  constructor(type: UnitType, faction: Faction, stats: Stats) {
    this.type = type;
    this.faction = faction;
    this.position = this.getStartingPosition();
    this.stats = stats;
    this.hasAttackedPylon = false;
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

    ctx.beginPath();

    if (this.type === UnitType.Infantry) {
      ctx.arc(
        x ?? this.position.x,
        y ?? this.position.y,
        this.stats.range,
        0,
        2 * Math.PI
      );
    } else if (this.type === UnitType.Tank) {
      ctx.rect(
        x ? x - tankStyle.width / 2 : this.position.x - tankStyle.width / 2,
        y ? y - tankStyle.height / 2 : this.position.y - tankStyle.height / 2,
        tankStyle.width,
        tankStyle.height
      );
    }

    ctx.fillStyle = theme.fill;
    ctx.strokeStyle = theme.border;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
