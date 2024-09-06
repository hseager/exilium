import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import {
  baseEnemyInfantryStats,
  enemyInfantryIncrementStat,
  enemyInfantryTimerSpeed,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Infantry } from "../infantry";

export class EnemyInfantryTimer extends Timer {
  constructor() {
    super(TimerType.EnemyDeployInfantry, enemyInfantryTimerSpeed);
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    gameManager.units.push(
      new Infantry(
        Faction.Dominus,
        gameManager.statManager.getEnemyInfantryStats()
      )
    );
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
