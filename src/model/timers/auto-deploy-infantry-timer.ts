import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import { autoDeployInfantryTimer } from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";

export class AutoDeployInfantryTimer extends Timer {
  constructor() {
    super(
      TimerType.AutoDeployInfantry,
      autoDeployInfantryTimer.maxTime,
      autoDeployInfantryTimer.speed
    );
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    const unit = new Unit(
      UnitType.Infantry,
      Faction.Vanguard,
      gameManager.getUnitStats(UnitType.Infantry)
    );

    unit.setRandomStartPosition();

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
