import { select } from "@/util";
import { ResearchOption } from "../research-option";
import { GameManager } from "@/core/game-manager";
import { PlayerTankTimer } from "../timers/player-tank-timer";
import { ResearchType } from "@/core/types";

export class WarFactory extends ResearchOption {
  constructor() {
    const title = "Build War Factory";
    const type = ResearchType.WarFactory;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    const element = select<HTMLDivElement>("#tank-option");
    element?.classList.remove("d-none");

    gameManager.timers.push(new PlayerTankTimer());
  }
}
