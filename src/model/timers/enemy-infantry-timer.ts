import { Faction, Stats, TimerType, UnitType } from "@/core/types";
import { Timer } from "./timer";
import {
  baseEnemyInfantryStats,
  enemyInfantryIncrementStat,
  enemyInfantryTimer,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Unit } from "../unit";

export class EnemyInfantryTimer extends Timer {
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
    // We increment each enemy stat for each player level to make the game harder as the player levels up

    const unitStats: Stats = {
      attack:
        baseEnemyInfantryStats.attack +
        gameManager.player.level * enemyInfantryIncrementStat.attack,
      attackSpeed:
        baseEnemyInfantryStats.attackSpeed +
        gameManager.player.level * enemyInfantryIncrementStat.attackSpeed,
      health:
        baseEnemyInfantryStats.health +
        gameManager.player.level * enemyInfantryIncrementStat.health,
      moveSpeed:
        baseEnemyInfantryStats.moveSpeed +
        gameManager.player.level * enemyInfantryIncrementStat.moveSpeed,
      range:
        baseEnemyInfantryStats.range +
        gameManager.player.level * enemyInfantryIncrementStat.range,
    };

    // const unitStats = Object.keys(baseEnemyInfantryStats).reduce((acc, key) => {
    //   acc[key as keyof Stats] =
    //     baseEnemyInfantryStats[key as keyof Stats] +
    //     gameManager.player.level *
    //       enemyInfantryIncrementStat[key as keyof Stats];
    //   return acc;
    // }, {} as Stats);

    const unit = new Unit(UnitType.Infantry, Faction.Dominus, unitStats);

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
