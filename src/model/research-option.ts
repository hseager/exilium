import { GameManager } from "@/core/game-manager";
import { ResearchType } from "@/core/types";

export class ResearchOption {
  title: string;
  type: ResearchType;

  constructor(title: string, type: ResearchType) {
    this.title = title;
    this.type = type;
  }

  onSelect(gameManager: GameManager) {}
}
