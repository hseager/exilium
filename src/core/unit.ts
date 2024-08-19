import { drawEngine } from "./draw-engine";
import { Faction, Stats, UnitType } from "./types";

export class Unit {
  type: UnitType;
  position: DOMPoint;
  faction: Faction;
  stats: Stats;

  constructor(type: UnitType, faction: Faction, stats: Stats) {
    this.type = type;
    this.faction = faction;
    this.position = this.getStartingPosition(faction);
    this.stats = stats;
  }

  private getStartingPosition(faction: Faction) {
    if (faction === Faction.Vanguard) {
      return new DOMPoint(
        drawEngine.mousePosition.x,
        drawEngine.canvasHeight - 25
      );
    } else {
      return new DOMPoint(400, 120);
    }
  }
}
