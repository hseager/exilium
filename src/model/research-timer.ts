import { TimerType } from "@/core/types";
import { Timer } from "./timer";
import { select } from "@/util";
import {
  hideResearchOptions,
  showResearchOptions,
} from "@/core/research-manager";
import { playerResearchTimer } from "@/core/config";

export class ResearchTimer extends Timer {
  constructor() {
    super(
      TimerType.PlayerResearch,
      playerResearchTimer.maxTime,
      playerResearchTimer.speed
    );
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
