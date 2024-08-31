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
    super(
      TimerType.EnemyDeployTank,
      enemyTankTimer.maxTime,
      enemyTankTimer.speed
    );
  }

  start() {
    super.start();
  }

  handleComplete(gameManager: GameManager) {
    // We increment each enemy stat for each player level to make the game harder as the player levels up
    const unitStats = Object.keys(baseEnemyTankStats).reduce((acc, key) => {
      acc[key as keyof Stats] =
        baseEnemyTankStats[key as keyof Stats] +
        gameManager.player.level * enemyTankIncrementStat[key as keyof Stats];
      return acc;
    }, {} as Stats);

    const unit = new Unit(UnitType.Tank, Faction.Dominus, unitStats);

    gameManager.units.push(unit);
    super.restart();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);
  }
}
