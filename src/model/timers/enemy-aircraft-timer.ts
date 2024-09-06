import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import {
  baseEnemyAircraftStats,
  baseEnemyTankStats,
  enemyTankIncrementStat,
  enemyTankTimerSpeed,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";
import { Aircraft } from "../aircraft";

export class EnemyAircraftTimer extends Timer {
  constructor() {
    super(TimerType.EnemyDeployAircraft, enemyTankTimerSpeed);
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    gameManager.units.push(
      new Aircraft(
        Faction.Dominus,
        gameManager.statManager.getEnemyAircraftStats()
      )
    );
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
