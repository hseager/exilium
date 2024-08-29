import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType } from "@/core/types";

export class TechCentre extends ResearchOption {
  constructor() {
    const title = "Build Tech Centre";
    const type = ResearchType.IncreaseInfantryRecruitment;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    // Unlock Stats
    console.log("Build Tech Centre");
  }
}
