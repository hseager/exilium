import { GameManager } from "@/core/game-manager";
import { TimerType } from "../../core/types";

export class Timer {
  type: TimerType;
  currentTime = 0;
  maxTime: number;
  speed: number;
  active = true;

  constructor(type: TimerType, maxTime: number, speed: number) {
    this.type = type;
    this.maxTime = maxTime;
    this.speed = speed;
  }

  reset() {
    this.currentTime = 0;
  }

  stop() {
    this.active = false;
  }

  restart() {
    this.reset();
    this.start();
  }

  start() {
    this.active = true;
  }

  tick(deltaTime: number) {
    this.currentTime += this.speed * deltaTime;
  }

  handleComplete(gameManager: GameManager) {}
}
