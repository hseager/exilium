import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseInfantryAutoDeploy extends ResearchOption {
  constructor() {
    const title = "Increase Infantry Auto Deploy Speed";
    const type = ResearchType.IncreaseInfantryAutoDeploySpeed;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.AutoDeployInfantry) {
        timer.speed += researchUpgradeStats.timers.playerInfantryAutoDeploy;
      }
      return timer;
    });
  }
}
