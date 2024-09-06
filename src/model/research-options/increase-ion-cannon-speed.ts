import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseIonCannonSpeed extends ResearchOption {
  constructor() {
    const title = "Increase Ion Cannon Charge Time";
    const type = ResearchType.IncreaseIonCannonSpeed;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.IonCannonTimer) {
        timer.speed += researchUpgradeStats.timers.ionCannon;
      }
      return timer;
    });
  }
}
