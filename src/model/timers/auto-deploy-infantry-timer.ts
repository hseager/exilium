import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import { autoDeployInfantryTimerSpeed } from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";
import { Infantry } from "../infantry";

export class AutoDeployInfantryTimer extends Timer {
  constructor() {
    super(TimerType.AutoDeployInfantry, autoDeployInfantryTimerSpeed);
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    const unit = new Infantry(
      Faction.Vanguard,
      gameManager.statManager.getPlayerInfantryStats()
    );

    unit.setRandomStartPosition();

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
