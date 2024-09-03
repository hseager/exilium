import { GameManager } from "@/core/game-manager";
import { ResearchOption } from "../research-option";
import { ResearchType } from "@/core/types";

export class AddTechSkillPoint extends ResearchOption {
  points = 1;

  constructor(points?: number) {
    const title = points
      ? `Add ${points} skill points`
      : "Add tech skill point";
    const type = ResearchType.AddTechSkillPoint;

    super(title, type);

    if (points) {
      this.points = points;
    }
  }

  onSelect(gameManager: GameManager) {
    gameManager.techCentre &&
      gameManager.techCentre.addSkillPoints(this.points);
  }
}
