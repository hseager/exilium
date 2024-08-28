import { select } from "@/util";
import { Faction, Mode, Pylon, Stats, TimerType, UnitType } from "./types";
import { Unit } from "../model/unit";
import { playerInfantryStats, playerTankStats, pylonCount } from "./config";
import { PlayerInfantryTimer } from "@/model/timers/player-infantry-timer";
import { Timer } from "@/model/timer";
import { ResearchTimer } from "@/model/timers/research-timer";
import { EnemyUnitTimer } from "@/model/timers/enemy-unit-timer";
import { Player } from "@/model/player";

export class GameManager {
  mode: Mode;
  unitToDeploy?: UnitType;
  units: Unit[];
  pylons: Pylon[];
  timers: Timer[];
  player: Player;

  constructor() {
    this.mode = Mode.Playing;
    this.units = [];
    this.pylons = Array.from({ length: pylonCount }, () => ({
      maxLife: 100,
      life: 100,
    }));
    this.timers = [];
    this.player = new Player();

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
      this.unitToDeploy = UnitType.Infantry;
    });

    const deployTankButton = select<HTMLButtonElement>("#deploy-tank");
    deployTankButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = UnitType.Tank;
    });

    c2d.addEventListener("click", () => {
      if (this.mode === Mode.PlaceUnit) {
        switch (this.unitToDeploy) {
          case UnitType.Infantry:
            const infantry = new Unit(UnitType.Infantry, Faction.Vanguard, {
              ...playerInfantryStats,
            });
            this.units.push(infantry);
            const infantryTimer = this.timers.find(
              (timer) => timer.type == TimerType.PlayerDeployInfantry
            );
            infantryTimer && infantryTimer.restart();
            break;
          case UnitType.Tank:
            const tank = new Unit(UnitType.Tank, Faction.Vanguard, {
              ...playerTankStats,
            });
            this.units.push(tank);
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
