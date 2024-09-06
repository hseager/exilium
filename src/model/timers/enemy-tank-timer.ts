import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import {
  baseEnemyTankStats,
  enemyTankIncrementStat,
  enemyTankTimerSpeed,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";
import { Tank } from "../tank";

export class EnemyTankTimer extends Timer {
  constructor() {
    super(TimerType.EnemyDeployTank, enemyTankTimerSpeed);
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    gameManager.units.push(
      new Tank(Faction.Dominus, gameManager.statManager.getEnemyTankStats())
    );
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
