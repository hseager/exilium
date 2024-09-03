import { select } from "@/util";
import { ResearchOption } from "../research-option";
import { GameManager } from "@/core/game-manager";
import { ResearchType } from "@/core/types";
import { PlayerAircraftTimer } from "../timers/player-aircraft-timer";

export class AirBase extends ResearchOption {
  constructor() {
    const title = "Build Air Base";
    const type = ResearchType.AirBase;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    select("#aircraft-option")?.classList.remove("d-none");
    select("#aircraft-tab")?.classList.remove("d-none");

    gameManager.timers.push(new PlayerAircraftTimer());

    // Add 2 exta tech points when building airbase
    gameManager.techCentre && gameManager.techCentre.addSkillPoints(2);
  }
}
