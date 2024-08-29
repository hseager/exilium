import { select } from "@/util";
import { Faction, Mode, Pylon, Stats, TimerType, UnitType } from "./types";
import { Unit } from "../model/unit";
import {
  basePlayerInfantryStats,
  basePlayerTankStats,
  pylonCount,
} from "./config";
import { PlayerInfantryTimer } from "@/model/timers/player-infantry-timer";
import { Timer } from "@/model/timer";
import { ResearchTimer } from "@/model/timers/research-timer";
import { EnemyUnitTimer } from "@/model/timers/enemy-unit-timer";
import { Player } from "@/model/player";
import { ResearchOption } from "@/model/research-option";

export class GameManager {
  mode: Mode;
  unitToDeploy?: Unit;
  units: Unit[];
  pylons: Pylon[];
  timers: Timer[];
  player: Player;
  researchOptions: ResearchOption[];

  constructor() {
    this.mode = Mode.Playing;
    this.units = [];
    this.pylons = Array.from({ length: pylonCount }, () => ({
      maxLife: 100,
      life: 100,
    }));
    this.timers = [];
    this.player = new Player();
    this.researchOptions = [];

    this.attachDomEvents();
    this.setInitialTimers();
  }

  private setInitialTimers() {
    this.timers.push(new PlayerInfantryTimer());
    this.timers.push(new ResearchTimer());
    this.timers.push(new EnemyUnitTimer());
  }

  updateTimers(deltaTime: number) {
    this.timers
      .filter((timer) => timer.active)
      .forEach((timer) => {
        timer.tick(deltaTime);
        if (timer.currentTime >= timer.maxTime) {
          timer.handleComplete(this);
        }
      });
  }

  private attachDomEvents() {
    // TODO this could be refactored similar to research options
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Unit(UnitType.Infantry, Faction.Vanguard, {
        ...basePlayerInfantryStats,
      });
    });

    const deployTankButton = select<HTMLButtonElement>("#deploy-tank");
    deployTankButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Unit(UnitType.Tank, Faction.Vanguard, {
        ...basePlayerTankStats,
      });
    });

    c2d.addEventListener("click", () => {
      if (this.mode === Mode.PlaceUnit) {
        switch (this.unitToDeploy?.type) {
          case UnitType.Infantry:
            this.unitToDeploy.initPosition();
            this.units.push(this.unitToDeploy);
            const infantryTimer = this.timers.find(
              (timer) => timer.type == TimerType.PlayerDeployInfantry
            );
            infantryTimer && infantryTimer.restart();
            break;
          case UnitType.Tank:
            this.unitToDeploy.initPosition();
            this.units.push(this.unitToDeploy);
            const tankTimer = this.timers.find(
              (timer) => timer.type == TimerType.PlayerDeployTank
            );
            tankTimer && tankTimer.restart();
            break;
        }
      }
      this.unitToDeploy = undefined;
      this.mode = Mode.Playing;
    });
  }
}
