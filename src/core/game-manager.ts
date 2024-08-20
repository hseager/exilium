import { select } from "@/util";
import { Faction, Mode, Pylon, Stats, TimerType, UnitType } from "./types";
import { Unit } from "../model/unit";
import { playerInfantryStats, pylonCount } from "./config";
import { InfantryTimer } from "@/model/infantry-timer";
import { Timer } from "@/model/timer";
import { ResearchTimer } from "@/model/research-timer";

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
    this.timers.push(new InfantryTimer());
    this.timers.push(new ResearchTimer());
  }

  // This method should be called in your game loop
  updateTimers(deltaTime: number) {
    this.timers
      .filter((timer) => timer.active)
      .forEach((timer) => {
        timer.tick(deltaTime);
        if (timer.currentTime >= timer.maxTime) {
          timer.handleComplete();

          // Or remove the timer if it's a one-time timer:
          // this.timers = this.timers.filter(t => t !== timer);
        }
      });
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
            const infantryTimer = this.timers.find(
              (timer) => timer.type == TimerType.Infantry
            );
            infantryTimer && infantryTimer.restart();
            break;
        }
      }
      this.unitToPlace = undefined;
      this.mode = Mode.Playing;
    });
  }
}
