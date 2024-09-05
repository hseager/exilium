import { wallConfig } from "@/core/config";
import { drawEngine } from "../core/draw-engine";
import { Faction, Stats } from "../core/types";
import { Timer } from "./timers/timer";

export class Unit {
  position: DOMPoint;
  faction: Faction;
  stats: Stats;
  lastAttackTime?: number;
  hasAttackedPylon: boolean;
  maxHealth: number;

  constructor(faction: Faction, stats: Stats) {
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

  draw(ctx: CanvasRenderingContext2D, x?: number, y?: number) {}
}
