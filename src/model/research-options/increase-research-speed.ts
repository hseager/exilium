import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseResearchSpeed extends ResearchOption {
  constructor() {
    const title = "Increase Research Speed";
    const type = ResearchType.IncreaseResearchSpeed;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.PlayerResearch) {
        timer.speed += researchUpgradeStats.timers.playerInfantry;
      }
      return timer;
    });
  }
}
