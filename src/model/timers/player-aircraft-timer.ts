import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import { playerAircraftTimerSpeed } from "@/core/config";

export class PlayerAircraftTimer extends Timer {
  constructor() {
    super(TimerType.PlayerDeployAircraft, playerAircraftTimerSpeed);
  }

  start() {
    super.start();

    const button = select<HTMLButtonElement>("#deploy-aircraft");
    if (button) {
      button.disabled = true;
    }
  }

  handleComplete() {
    super.stop();

    const button = select<HTMLButtonElement>("#deploy-aircraft");
    if (button) {
      button.disabled = false;
    }
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);

    const progress = select<HTMLProgressElement>("#aircraft-progress");
    if (progress) {
      progress.value = this.currentTime / 10;
    }
  }
}
