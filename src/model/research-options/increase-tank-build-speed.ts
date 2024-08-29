import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseTankBuildSpeed extends ResearchOption {
  constructor() {
    const title = "Increase Tank Build Speed";
    const type = ResearchType.IncreaseTankBuildSpeed;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.PlayerDeployTank) {
        timer.speed += researchUpgradeStats.timers.playerTank;
      }
      return timer;
    });
  }
}
