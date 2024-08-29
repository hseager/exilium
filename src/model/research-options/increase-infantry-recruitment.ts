import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseInfantryRecruitment extends ResearchOption {
  constructor() {
    const title = "Increase Infantry Recruitment Speed";
    const type = ResearchType.IncreaseInfantryRecruitment;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.PlayerDeployInfantry) {
        timer.speed += researchUpgradeStats.timers.playerInfantry;
      }
      return timer;
    });
  }
}
