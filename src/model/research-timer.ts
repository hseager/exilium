import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import {
  hideResearchOptions,
  showResearchOptions,
} from "@/core/research-manager";

const maxTime = 100;
// const speed = 0.005;
const speed = 0.2;

export class ResearchTimer extends Timer {
  constructor() {
    super(TimerType.Research, maxTime, speed);
  }

  start() {
    super.start();
    hideResearchOptions();
  }

  handleComplete() {
    super.stop();
    showResearchOptions();
  }

  tick(deltaTime: number) {
    super.tick(deltaTime);

    const progress = select<HTMLProgressElement>("#research-progress");
    if (progress) {
      progress.value = this.currentTime;
    }
  }
}
