import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType } from "@/core/types";
import { AutoDeployInfantryTimer } from "../timers/auto-deploy-infantry-timer";

export class AutoDeployInfantryOption extends ResearchOption {
  constructor() {
    const title = "Auto Deploy Infantry";
    const type = ResearchType.AutoDeployInfantry;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.timers.push(new AutoDeployInfantryTimer());
  }
}
