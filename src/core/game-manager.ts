import { select } from "@/util";
import { Faction, Mode, Pylon, Stats, TimerType, UnitType } from "./types";
import { Unit } from "../model/unit";
import {
  basePlayerAircraftStats,
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
import { DifficultyManager } from "./difficulty-manager";
import { Infantry } from "@/model/infantry";
import { Tank } from "@/model/tank";
import { Aircraft } from "@/model/aircraft";
import { IonCannon } from "@/model/Ion-cannon";
import { CombatManager } from "./combat-manager";
import { StatManager } from "@/model/stat-manager";

export class GameManager {
  mode: Mode;
  unitToDeploy: Unit | null;
  units: Unit[];
  pylons: Pylon[];
  timers: Timer[];
  player: Player;
  difficultyManager: DifficultyManager;
  researchOptions: ResearchOption[];
  techCentre: TechCentre | null;
  ionCannon: IonCannon | null;
  combatManager: CombatManager;
  statManager: StatManager;

  constructor() {
    this.mode = Mode.Playing;
    this.units = [];
    this.pylons = Array.from({ length: pylonCount }, () => ({
      maxLife: 100,
      life: 100,
    }));
    this.timers = [];
    this.player = new Player();
    this.difficultyManager = new DifficultyManager();
    this.researchOptions = [];
    this.unitToDeploy = null;
    this.techCentre = null;
    this.combatManager = new CombatManager(this);
    this.ionCannon = new IonCannon(this);
    this.statManager = new StatManager(this);

    this.attachDomEvents();
    this.setInitialTimers();
  }

  private setInitialTimers() {
    this.timers.push(new PlayerInfantryTimer());

    setTimeout(() => {
      this.units.push(
        new Infantry(Faction.Dominus, this.statManager.getEnemyInfantryStats())
      );

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
    this.difficultyManager.handleAiScaling(this.player.level, this.timers);
  }

  private attachDomEvents() {
    // TODO this could be refactored similar to research options
    const deployInfantryButton = select<HTMLButtonElement>("#deploy-infantry");
    deployInfantryButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Infantry(
        Faction.Vanguard,
        this.statManager.getPlayerInfantryStats()
      );
    });

    const deployTankButton = select<HTMLButtonElement>("#deploy-tank");
    deployTankButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Tank(
        Faction.Vanguard,
        this.statManager.getPlayerTankStats()
      );
    });

    const deployAircraftButton = select<HTMLButtonElement>("#deploy-aircraft");
    deployAircraftButton?.addEventListener("click", () => {
      this.mode = Mode.PlaceUnit;
      this.unitToDeploy = new Aircraft(
        Faction.Vanguard,
        this.statManager.getPlayerAircraftStats()
      );
    });

    const deployIonCannonButton =
      select<HTMLButtonElement>("#deploy-ion-cannon");
    deployIonCannonButton?.addEventListener("click", () => {
      this.mode = Mode.IonCannon;
    });

    const handleCanvasClick = (event: MouseEvent) => {
      if (this.mode === Mode.PlaceUnit) {
        this.unitToDeploy?.initPosition();
        this.unitToDeploy && this.units.push(this.unitToDeploy);

        if (this.unitToDeploy instanceof Infantry) {
          const infantryTimer = this.timers.find(
            (timer) => timer.type == TimerType.PlayerDeployInfantry
          );
          infantryTimer && infantryTimer.restart();
        } else if (this.unitToDeploy instanceof Tank) {
          const tankTimer = this.timers.find(
            (timer) => timer.type == TimerType.PlayerDeployTank
          );
          tankTimer && tankTimer.restart();
        } else if (this.unitToDeploy instanceof Aircraft) {
          const aircraftTimer = this.timers.find(
            (timer) => timer.type == TimerType.PlayerDeployAircraft
          );
          aircraftTimer && aircraftTimer.restart();
        }
      } else if (this.mode === Mode.IonCannon) {
        this.ionCannon?.fire(this.units);
        const ionCannonTimer = this.timers.find(
          (timer) => timer.type == TimerType.IonCannonTimer
        );
        ionCannonTimer && ionCannonTimer.restart();
      }
      this.unitToDeploy = null;
      this.mode = Mode.Playing;
    };

    c2d.addEventListener("click", handleCanvasClick);
    c2d.addEventListener("touchend", handleCanvasClick);
  }
}
