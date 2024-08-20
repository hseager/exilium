import { select } from "@/util";
import {
  Faction,
  Mode,
  Pylon,
  Stats,
  Timer,
  TimerType,
  UnitType,
} from "./types";
import { Unit } from "./unit";
import { playerInfantryStats, pylonCount, timerConfig } from "./config";

export class GameManager {
  mode: Mode;
  unitToPlace?: UnitType;
  units: Unit[];
  pylons: Pylon[];
  timers: Timer[];

  constructor() {
    this.mode = Mode.Playing;
    this.units = [];
    this.pylons = Array.from({ length: pylonCount }, () => ({
      maxLife: 100,
      life: 100,
    }));
    this.timers = [];

    this.attachDomEvents();
    this.setInitialTimers();
  }

  private setInitialTimers() {
    const infantryTimer: Timer = {
      type: TimerType.Infantry,
      currentTime: 0,
      maxTime: timerConfig.infantry.max,
      speed: timerConfig.infantry.speed,
    };
    this.timers.push(infantryTimer);
  }

  // This method should be called in your game loop
  updateTimers(deltaTime: number) {
    this.timers.forEach((timer) => {
      console.log(timer.currentTime);
      // Update the timer's current time based on its speed and deltaTime
      timer.currentTime += timer.speed * deltaTime;

      // Check if the timer has reached or exceeded its max time
      if (timer.currentTime >= timer.maxTime) {
        this.handleTimerCompletion(timer);

        // Optionally reset or remove the timer
        timer.currentTime = 0; // Reset timer for repeating timers
        // Or remove the timer if it's a one-time timer:
        // this.timers = this.timers.filter(t => t !== timer);
      }
    });
  }

  handleTimerCompletion(timer: Timer) {
    switch (timer.type) {
      case TimerType.Infantry:
        const deployInfantryButton =
          select<HTMLButtonElement>("#deploy-infantry");
        if (deployInfantryButton) {
          deployInfantryButton.disabled = false;
        }
        break;
      default:
        console.log(`Timer ${timer} completed.`);
        break;
    }
  }

  private attachDomEvents() {
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToPlace = UnitType.Infantry;
    });

    c2d.addEventListener("click", () => {
      if (this.mode === Mode.PlaceUnit) {
        switch (this.unitToPlace) {
          case UnitType.Infantry:
            const infantry = new Unit(
              UnitType.Infantry,
              Faction.Vanguard,
              playerInfantryStats
            );
            this.units.push(infantry);
            break;
        }
      }
      this.unitToPlace = undefined;
      this.mode = Mode.Playing;
    });
  }
}
