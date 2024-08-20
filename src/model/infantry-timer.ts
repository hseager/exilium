import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";

const maxTime = 100;
const speed = 0.01;

export class InfantryTimer extends Timer {
  constructor() {
    super(TimerType.Infantry, maxTime, speed);
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
      progress.value = this.currentTime;
    }
  }
}
