import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType } from "@/core/types";

export class AddTechSkillPoint extends ResearchOption {
  constructor() {
    const title = "Add tech skill point";
    const type = ResearchType.AddTechSkillPoint;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    gameManager.techCentre && gameManager.techCentre.addSkillPoints(1);
  }
}
