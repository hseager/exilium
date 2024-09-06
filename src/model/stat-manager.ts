import {
  baseEnemyAircraftStats,
  baseEnemyInfantryStats,
  baseEnemyTankStats,
  basePlayerAircraftStats,
  basePlayerInfantryStats,
  basePlayerTankStats,
  enemyInfantryIncrementStat,
  enemyTankIncrementStat,
  techCentreStatIncrement,
} from "@/core/config";
import { GameManager } from "@/core/game-manager";
import { Stats } from "@/core/types";

export class StatManager {
  private gameManager: GameManager;
  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  getPlayerInfantryStats(): Stats {
    if (!this.gameManager.techCentre) {
      return {
        ...basePlayerInfantryStats,
      };
    } else {
      return {
        attack:
          basePlayerInfantryStats.attack +
          this.gameManager.techCentre?.infantryStatPoints.attack *
            techCentreStatIncrement.attack,
        attackSpeed:
          basePlayerInfantryStats.attackSpeed +
          this.gameManager.techCentre?.infantryStatPoints.attackSpeed *
            techCentreStatIncrement.attackSpeed,
        health:
          basePlayerInfantryStats.health +
          this.gameManager.techCentre?.infantryStatPoints.health *
            techCentreStatIncrement.health,
        moveSpeed:
          basePlayerInfantryStats.moveSpeed +
          this.gameManager.techCentre?.infantryStatPoints.moveSpeed *
            techCentreStatIncrement.moveSpeed,
        range:
          basePlayerInfantryStats.range +
          this.gameManager.techCentre?.infantryStatPoints.range *
            techCentreStatIncrement.range,
      };
    }
  }

  getPlayerTankStats(): Stats {
    if (!this.gameManager.techCentre) {
      return {
        ...basePlayerTankStats,
      };
    } else {
      return {
        attack:
          basePlayerTankStats.attack +
          this.gameManager.techCentre?.tankStatPoints.attack *
            techCentreStatIncrement.attack,
        attackSpeed:
          basePlayerTankStats.attackSpeed +
          this.gameManager.techCentre?.tankStatPoints.attackSpeed *
            techCentreStatIncrement.attackSpeed,
        health:
          basePlayerTankStats.health +
          this.gameManager.techCentre?.tankStatPoints.health *
            techCentreStatIncrement.health,
        moveSpeed:
          basePlayerTankStats.moveSpeed +
          this.gameManager.techCentre?.tankStatPoints.moveSpeed *
            techCentreStatIncrement.moveSpeed,
        range:
          basePlayerTankStats.range +
          this.gameManager.techCentre?.tankStatPoints.range *
            techCentreStatIncrement.range,
      };
    }
  }

  getPlayerAircraftStats(): Stats {
    if (!this.gameManager.techCentre) {
      return {
        ...basePlayerAircraftStats,
      };
    } else {
      return {
        attack:
          basePlayerAircraftStats.attack +
          this.gameManager.techCentre?.aircraftStatPoints.attack *
            techCentreStatIncrement.attack,
        attackSpeed:
          basePlayerAircraftStats.attackSpeed +
          this.gameManager.techCentre?.aircraftStatPoints.attackSpeed *
            techCentreStatIncrement.attackSpeed,
        health:
          basePlayerAircraftStats.health +
          this.gameManager.techCentre?.aircraftStatPoints.health *
            techCentreStatIncrement.health,
        moveSpeed:
          basePlayerAircraftStats.moveSpeed +
          this.gameManager.techCentre?.aircraftStatPoints.moveSpeed *
            techCentreStatIncrement.moveSpeed,
        range:
          basePlayerAircraftStats.range +
          this.gameManager.techCentre?.aircraftStatPoints.range *
            techCentreStatIncrement.range,
      };
    }
  }

  getEnemyInfantryStats(): Stats {
    return {
      attack:
        baseEnemyInfantryStats.attack +
        this.gameManager.player.level * enemyInfantryIncrementStat.attack,
      attackSpeed:
        baseEnemyInfantryStats.attackSpeed +
        this.gameManager.player.level * enemyInfantryIncrementStat.attackSpeed,
      health:
        baseEnemyInfantryStats.health +
        this.gameManager.player.level * enemyInfantryIncrementStat.health,
      moveSpeed:
        baseEnemyInfantryStats.moveSpeed +
        this.gameManager.player.level * enemyInfantryIncrementStat.moveSpeed,
      range:
        baseEnemyInfantryStats.range +
        this.gameManager.player.level * enemyInfantryIncrementStat.range,
    };
  }

  getEnemyTankStats(): Stats {
    return {
      attack:
        baseEnemyTankStats.attack +
        this.gameManager.player.level * enemyTankIncrementStat.attack,
      attackSpeed:
        baseEnemyTankStats.attackSpeed +
        this.gameManager.player.level * enemyTankIncrementStat.attackSpeed,
      health:
        baseEnemyTankStats.health +
        this.gameManager.player.level * enemyTankIncrementStat.health,
      moveSpeed:
        baseEnemyTankStats.moveSpeed +
        this.gameManager.player.level * enemyTankIncrementStat.moveSpeed,
      range:
        baseEnemyTankStats.range +
        this.gameManager.player.level * enemyTankIncrementStat.range,
    };
  }

  getEnemyAircraftStats(): Stats {
    return {
      attack:
        baseEnemyAircraftStats.attack +
        this.gameManager.player.level * enemyTankIncrementStat.attack,
      attackSpeed:
        baseEnemyAircraftStats.attackSpeed +
        this.gameManager.player.level * enemyTankIncrementStat.attackSpeed,
      health:
        baseEnemyAircraftStats.health +
        this.gameManager.player.level * enemyTankIncrementStat.health,
      moveSpeed:
        baseEnemyAircraftStats.moveSpeed +
        this.gameManager.player.level * enemyTankIncrementStat.moveSpeed,
      range:
        baseEnemyAircraftStats.range +
        this.gameManager.player.level * enemyTankIncrementStat.range,
    };
  }
}
