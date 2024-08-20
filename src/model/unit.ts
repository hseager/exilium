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
      return new DOMPoint(400, 120);
    }
  }
}
