import { select } from "@/util";
import { ResearchOption } from "../research-option";
import { GameManager } from "@/core/game-manager";
import { ResearchType } from "@/core/types";
import { IonCannonTimer } from "../timers/ion-cannon-timer";

export class IonCannonOption extends ResearchOption {
  constructor() {
    const title = "Launch Ion Cannon Satellite";
    const type = ResearchType.IonCannonSatellite;

    super(title, type);
  }

  onSelect(gameManager: GameManager) {
    const element = select("#ion-cannon-option");
    element?.classList.remove("d-none");

    gameManager.timers.push(new IonCannonTimer());
  }
}
