import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import { ionCannonTimer } from "@/core/config";

export class IonCannonTimer extends Timer {
  constructor() {
    super(TimerType.IonCannonTimer, ionCannonTimer);
  }

  start() {
    super.start();

    const button = select<HTMLButtonElement>("#deploy-ion-cannon");
    if (button) {
      button.disabled = true;
    }
  }

  handleComplete() {
    super.stop();

    const button = select<HTMLButtonElement>("#deploy-ion-cannon");
    if (button) {
      button.disabled = false;
    }
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);

    const progress = select<HTMLProgressElement>("#ion-cannon-progress");
    if (progress) {
      progress.value = this.currentTime / 10;
    }
  }
}
