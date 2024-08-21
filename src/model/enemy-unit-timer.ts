import { Faction, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import { enemyInfantryStats, enemyInfantryTimer } from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "./unit";

export class EnemyUnitTimer extends Timer {
  constructor() {
    super(
      TimerType.EnemyDeployInfantry,
      enemyInfantryTimer.maxTime,
      enemyInfantryTimer.speed
    );
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    const infantry = new Unit(
      UnitType.Infantry,
      Faction.Dominus,
      enemyInfantryStats
    );

    gameManager.units.push(infantry);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
