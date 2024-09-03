import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import {
  baseEnemyInfantryStats,
  baseEnemyTankStats,
  enemyInfantryIncrementStat,
  enemyTankIncrementStat,
  enemyTankTimer,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";

export class EnemyTankTimer extends Timer {
  constructor() {
    super(TimerType.EnemyDeployTank, enemyTankTimer.speed);
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    // We increment each enemy stat for each player level to make the game harder as the player levels up
    const unitStats: Stats = {
      attack:
        baseEnemyTankStats.attack +
        gameManager.player.level * enemyTankIncrementStat.attack,
      attackSpeed:
        baseEnemyTankStats.attackSpeed +
        gameManager.player.level * enemyTankIncrementStat.attackSpeed,
      health:
        baseEnemyTankStats.health +
        gameManager.player.level * enemyTankIncrementStat.health,
      moveSpeed:
        baseEnemyTankStats.moveSpeed +
        gameManager.player.level * enemyTankIncrementStat.moveSpeed,
      range:
        baseEnemyTankStats.range +
        gameManager.player.level * enemyTankIncrementStat.range,
    };

    const unit = new Unit(UnitType.Tank, Faction.Dominus, unitStats);

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
