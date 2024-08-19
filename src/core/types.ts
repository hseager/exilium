import { Unit } from "./unit";

export interface State {
  onUpdate: (timeElapsed: number) => void;
  onEnter?: Function;
  onLeave?: Function;
}

export type GameManager = {
  mode: Mode;
  units: Unit[];
  timers: Timer[];
  player: Player;
};

export enum Mode {
  Playing,
  PlaceUnit,
}

export type Player = {
  availableStatPoints: number;
  maxStatPoints: number;
};

export type Timer = {
  type: TimerType;
  currentTime: number;
  maxTime: number;
  speed: number;
};

export enum TimerType {
  Infantry,
  Tank,
  Aircraft,
  Research,
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
