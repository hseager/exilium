import { select } from "@/util";
import { Faction, Mode, Pylon, Stats, TimerType, UnitType } from "./types";
import { Unit } from "../model/unit";
import {
  basePlayerInfantryStats,
  basePlayerTankStats,
  initialGameStartDelay,
  pylonCount,
  techCentreStatIncrement,
} from "./config";
import { PlayerInfantryTimer } from "@/model/timers/player-infantry-timer";
import { Timer } from "@/model/timers/timer";
import { ResearchTimer } from "@/model/timers/research-timer";
import { EnemyInfantryTimer } from "@/model/timers/enemy-infantry-timer";
import { Player } from "@/model/player";
import { ResearchOption } from "@/model/research-option";
import { TechCentre } from "@/model/tech-center";
import { EnemyTankTimer } from "@/model/timers/enemy-tank-timer";

export class GameManager {
  mode: Mode;
  unitToDeploy: Unit | null;
  units: Unit[];
  pylons: Pylon[];
  timers: Timer[];
  player: Player;
  researchOptions: ResearchOption[];
  techCentre: TechCentre | null;

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
    this.unitToDeploy = null;
    this.techCentre = null;

    this.attachDomEvents();
    this.setInitialTimers();
  }

  private setInitialTimers() {
    this.timers.push(new PlayerInfantryTimer());

    setTimeout(() => {
      this.timers.push(new ResearchTimer());
      this.timers.push(new EnemyInfantryTimer());

      select("#research-centre")?.classList.remove("d-none");
    }, initialGameStartDelay);
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

  levelUp() {
    this.player.level++;
    this.handleAIScaling(this.player.level);
  }

  private handleAIScaling(level: number) {
    if (level === 5) {
      this.timers.push(new EnemyTankTimer());
    }
  }

  getUnitStats(unitType: UnitType) {
    let unitStats: Stats;

    switch (unitType) {
      case UnitType.Infantry:
        if (!this.techCentre) {
          unitStats = {
            ...basePlayerInfantryStats,
          };
        } else {
          unitStats = {
            attack:
              basePlayerInfantryStats.attack +
              this.techCentre?.infantryStatPoints.attack *
                techCentreStatIncrement.attack,
            attackSpeed:
              basePlayerInfantryStats.attackSpeed +
              this.techCentre?.infantryStatPoints.attackSpeed *
                techCentreStatIncrement.attackSpeed,
            health:
              basePlayerInfantryStats.health +
              this.techCentre?.infantryStatPoints.health *
                techCentreStatIncrement.health,
            moveSpeed:
              basePlayerInfantryStats.moveSpeed +
              this.techCentre?.infantryStatPoints.moveSpeed *
                techCentreStatIncrement.moveSpeed,
            range:
              basePlayerInfantryStats.range +
              this.techCentre?.infantryStatPoints.range *
                techCentreStatIncrement.range,
          };
        }
        break;
      case UnitType.Tank:
        if (!this.techCentre) {
          unitStats = {
            ...basePlayerTankStats,
          };
        } else {
          unitStats = {
            attack:
              basePlayerTankStats.attack +
              this.techCentre?.tankStatPoints.attack *
                techCentreStatIncrement.attack,
            attackSpeed:
              basePlayerTankStats.attackSpeed +
              this.techCentre?.tankStatPoints.attackSpeed *
                techCentreStatIncrement.attackSpeed,
            health:
              basePlayerTankStats.health +
              this.techCentre?.tankStatPoints.health *
                techCentreStatIncrement.health,
            moveSpeed:
              basePlayerTankStats.moveSpeed +
              this.techCentre?.tankStatPoints.moveSpeed *
                techCentreStatIncrement.moveSpeed,
            range:
              basePlayerTankStats.range +
              this.techCentre?.tankStatPoints.range *
                techCentreStatIncrement.range,
          };
        }
        break;
      default:
        unitStats = { ...basePlayerInfantryStats };
        break;
    }

    return unitStats;
  }

  private attachDomEvents() {
    // TODO this could be refactored similar to research options
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Unit(
        UnitType.Infantry,
        Faction.Vanguard,
        this.getUnitStats(UnitType.Infantry)
      );
    });

    const deployTankButton = select<HTMLButtonElement>("#deploy-tank");
    deployTankButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Unit(
        UnitType.Tank,
        Faction.Vanguard,
        this.getUnitStats(UnitType.Tank)
      );
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
      this.unitToDeploy = null;
      this.mode = Mode.Playing;
    });
  }
}
