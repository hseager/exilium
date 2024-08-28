import { select } from "@/util";
import { ResearchOption } from "../research-option";
import { GameManager } from "@/core/game-manager";
import { PlayerTankTimer } from "../timers/player-tank-timer";

export class WarFactoryResearchOption extends ResearchOption {
  constructor() {
    const name = "war-factory";
    const title = "Build War Factory";

    super(name, title);
  }

  onSelect(gameManager: GameManager) {
    const element = select<HTMLDivElement>("#tank-option");
    element?.classList.remove("d-none");

    gameManager.timers.push(new PlayerTankTimer());
  }
}
