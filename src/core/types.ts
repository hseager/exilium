import { Timer } from "@/model/timer";
import { Unit } from "../model/unit";

export interface State {
  onUpdate: (timeElapsed: number) => void;
  onEnter?: Function;
  onLeave?: Function;
}

export enum Mode {
  Playing,
  PlaceUnit,
}

export type Player = {
  availableStatPoints: number;
  maxStatPoints: number;
};

export enum TimerType {
  PlayerDeployInfantry,
  PlayerDeployTank,
  PlayerDeployAircraft,
  PlayerResearch,
  EnemyDeployInfantry,
}

export enum Faction {
  Dominus,
  Vanguard,
}

export type Stats = {
  attack: number;
  attackSpeed: number;
  health: number;
  defence: number;
  moveSpeed: number;
  range: number;
};

// Tank > Infantry
// Infantry > AirCraft
// AirCraft > Tank
export enum UnitType {
  Infantry,
  Tank,
  Aircraft,
}

export type Pylon = {
  maxLife: number;
  life: number;
};

export enum ResearchType {
  NewUnit = "New Unit",
  RecruitmentSpeed = "Recruitment Speed",
  TechUpgrade = "Tech Upgrade",
}

export interface TimerConfig {
  maxTime: number;
  speed: number;
}
