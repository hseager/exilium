import { select } from "@/util";
import { Mode } from "./types";

export class GameManager {
  mode: Mode;

  constructor() {
    this.mode = Mode.Playing;
    this.attachEvents();
  }

  private attachEvents() {
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
    });

    c2d.addEventListener("click", () => {
      if (this.mode === Mode.PlaceUnit) {
        // Place Unit
        this.mode = Mode.Playing;
      }
    });
  }
}
