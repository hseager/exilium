import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType, TimerType } from "@/core/types";
import { researchUpgradeStats } from "@/core/config";

export class IncreaseAircraftBuildSpeed extends ResearchOption {
  constructor() {
    const title = "Increase Aircraft Build Speed";
    const type = ResearchType.IncreaseAircraftBuildSpeed;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers = gameManager.timers.map((timer) => {
      if (timer.type === TimerType.PlayerDeployAircraft) {
        timer.speed += researchUpgradeStats.timers.playerAircraft;
      }
      return timer;
    });
  }
}
