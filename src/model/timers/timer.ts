import { GameManager } from "@/core/game-manager";
import { TimerType } from "../../core/types";

export class Timer {
  type: TimerType;
  currentTime = 0;
  maxTime = 1000;
  speed: number;
  active = true;

  constructor(type: TimerType, speed: number) {
    this.type = type;
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
