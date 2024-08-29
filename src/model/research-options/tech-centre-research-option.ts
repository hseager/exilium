import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType } from "@/core/types";
import { TechCentre } from "../tech-center";

export class TechCentreResearchOption extends ResearchOption {
  constructor() {
    const title = "Build Tech Centre";
    const type = ResearchType.IncreaseInfantryRecruitment;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.techCentre = new TechCentre();
  }
}
