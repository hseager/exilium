import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import { playerTankTimer } from "@/core/config";

export class PlayerTankTimer extends Timer {
  constructor() {
    super(TimerType.PlayerDeployTank, playerTankTimer.speed);
  }

  start() {
    super.start();

    const button = select<HTMLButtonElement>("#deploy-tank");
    if (button) {
      button.disabled = true;
    }
  }

  handleComplete() {
    super.stop();

    const button = select<HTMLButtonElement>("#deploy-tank");
    if (button) {
      button.disabled = false;
    }
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);

    const progress = select<HTMLProgressElement>("#tank-progress");
    if (progress) {
      progress.value = this.currentTime / 10;
    }
  }
}
