import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import { playerInfantryTimerSpeed } from "@/core/config";

export class PlayerInfantryTimer extends Timer {
  constructor() {
    super(TimerType.PlayerDeployInfantry, playerInfantryTimerSpeed);
  }

  start() {
    super.start();

    const button = select<HTMLButtonElement>("#deploy-infantry");
    if (button) {
      button.disabled = true;
    }
  }

  handleComplete() {
    super.stop();

    const button = select<HTMLButtonElement>("#deploy-infantry");
    if (button) {
      button.disabled = false;
    }
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);

    const progress = select<HTMLProgressElement>("#infantry-progress");
    if (progress) {
      progress.value = this.currentTime / 10;
    }
  }
}
