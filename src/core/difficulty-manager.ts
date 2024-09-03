import { EnemyTankTimer } from "@/model/timers/enemy-tank-timer";
import { Timer } from "@/model/timers/timer";
import { TimerType } from "./types";
import {
  enemyInfantrySpawnIncreaseSpeed,
  enemyTankSpawnIncreaseSpeed,
} from "./config";
import { EnemyAircraftTimer } from "@/model/timers/enemy-aircraft-timer";

export class DifficultyManager {
  handleAiScaling(level: number, timers: Timer[]) {
    if (level === 5) {
      timers.push(new EnemyTankTimer());
      this.increaseEnemyInfantrySpawnSpeed(timers);
    }

    if (level === 8) {
      this.increaseEnemyInfantrySpawnSpeed(timers);
      this.increaseEnemyTankSpawnSpeed(timers);
    }

    if (level === 13) {
      timers.push(new EnemyAircraftTimer());
    }
  }

  private increaseEnemyInfantrySpawnSpeed(timers: Timer[]) {
    const timer = timers.find(
      (timer) => timer.type === TimerType.EnemyDeployInfantry
    );
    if (timer) {
      timer.speed += enemyInfantrySpawnIncreaseSpeed;
    }
  }

  private increaseEnemyTankSpawnSpeed(timers: Timer[]) {
    const timer = timers.find(
      (timer) => timer.type === TimerType.EnemyDeployTank
    );
    if (timer) {
      timer.speed += enemyTankSpawnIncreaseSpeed;
    }
  }
}
