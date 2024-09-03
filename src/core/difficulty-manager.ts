import { EnemyTankTimer } from "@/model/timers/enemy-tank-timer";
import { Timer } from "@/model/timers/timer";
import { TimerType } from "./types";
import {
  enemyInfantrySpawnIncreaseSpeed,
  enemyTankSpawnIncreaseSpeed,
} from "./config";

export class DifficultyManager {
  handleAiScaling(level: number, timers: Timer[]) {
    if (level === 5) {
      timers.push(new EnemyTankTimer());
      this.increaseEnemyInfantrySpawnSpeed(timers);
    }

    if (level === 10) {
      this.increaseEnemyInfantrySpawnSpeed(timers);
      this.increaseEnemyTankSpawnSpeed(timers);
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
