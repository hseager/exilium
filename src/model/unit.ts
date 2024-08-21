import { wallConfig } from "@/core/config";
import { drawEngine } from "../core/draw-engine";
import { Faction, Stats, UnitType } from "../core/types";

export class Unit {
  type: UnitType;
  position: DOMPoint;
  faction: Faction;
  stats: Stats;
  hasAttackedPylon: boolean;

  constructor(type: UnitType, faction: Faction, stats: Stats) {
    this.type = type;
    this.faction = faction;
    this.position = this.getStartingPosition(faction);
    this.stats = stats;
    this.hasAttackedPylon = false;
  }

  private getStartingPosition(faction: Faction) {
    if (faction === Faction.Vanguard) {
      return new DOMPoint(
        drawEngine.mousePosition.x,
        drawEngine.canvasHeight - 25
      );
    } else {
      const min = wallConfig.x;
      const max = drawEngine.canvasWidth - wallConfig.x;
      const randomX = Math.floor(Math.random() * (max - min + 1)) + min;

      return new DOMPoint(randomX, wallConfig.y);
    }
  }
}
