export interface State {
  onUpdate: (timeElapsed: number) => void;
  onEnter?: Function;
  onLeave?: Function;
}

export type GameManager = {
  units: Unit[];
  timers: Timer[];
  player: Player;
};

type Player = {
  availableStatPoints: number;
  maxStatPoints: number;
};

type Timer = {
  type: TimerType;
  currentTime: number;
  maxTime: number;
  speed: number;
};

enum TimerType {
  Infantry,
  Tank,
  Aircraft,
  Research,
}

type Unit = {
  type: UnitType;
  position: DOMPoint;
  stats: Stats;
  faction: Faction;
};

enum Faction {
  Dominus,
  Vanguard,
}

type Stats = {
  attack: number;
  health: number;
  defence: number;
};

// Tank > Infantry
// Infantry > AirCraft
// AirCraft > Tank
enum UnitType {
  Infantry,
  Tank,
  Aircraft,
}
