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
    // We increment each enemy stat for each player level to make the game harder as the player levels up
    const unitStats: Stats = {
      attack:
        baseEnemyAircraftStats.attack +
        gameManager.player.level * enemyTankIncrementStat.attack,
      attackSpeed:
        baseEnemyAircraftStats.attackSpeed +
        gameManager.player.level * enemyTankIncrementStat.attackSpeed,
      health:
        baseEnemyAircraftStats.health +
        gameManager.player.level * enemyTankIncrementStat.health,
      moveSpeed:
        baseEnemyAircraftStats.moveSpeed +
        gameManager.player.level * enemyTankIncrementStat.moveSpeed,
      range:
        baseEnemyAircraftStats.range +
        gameManager.player.level * enemyTankIncrementStat.range,
    };

    const unit = new Aircraft(Faction.Dominus, unitStats);

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
