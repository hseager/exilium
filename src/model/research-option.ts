import { GameManager } from "@/core/game-manager";

export class ResearchOption {
  name: string;
  title: string;

  constructor(name: string, title: string) {
    this.name = name;
    this.title = title;
  }

  onSelect(gameManager: GameManager) {}
}
