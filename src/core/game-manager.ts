import { select } from "@/util";
import { Faction, Mode, Stats, UnitType } from "./types";
import { Unit } from "./unit";

export class GameManager {
  mode: Mode;
  unitToPlace?: UnitType;
  units: Unit[];

  constructor() {
    this.mode = Mode.Playing;
    this.attachEvents();
    this.units = [];
  }

  private attachEvents() {
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToPlace = UnitType.Infantry;
    });

    c2d.addEventListener("click", () => {
      if (this.mode === Mode.PlaceUnit) {
        switch (this.unitToPlace) {
          case UnitType.Infantry:
            const stats: Stats = {
              attack: 10,
              attackSpeed: 20,
              moveSpeed: 0.3,
              defence: 3,
              health: 100,
              range: 4,
            };
            const infantry = new Unit(
              UnitType.Infantry,
              Faction.Vanguard,
              stats
            );
            this.units.push(infantry);
            break;
        }
      }
      this.unitToPlace = undefined;
      this.mode = Mode.Playing;
    });
  }
}
