export interface State {
  onUpdate: (timeElapsed: number) => void;
  onEnter?: Function;
  onLeave?: Function;
}

// Convert Enum to object with type so closure doesn't delete it
export const Mode = {
  Playing: 1,
  PlaceUnit: 2,
};

export type Mode = (typeof Mode)[keyof typeof Mode];

export type Player = {
  availableStatPoints: number;
  maxStatPoints: number;
};

export const TimerType = {
  PlayerDeployInfantry: 0,
  PlayerDeployTank: 1,
  PlayerDeployAircraft: 2,
  PlayerResearch: 3,
  EnemyDeployInfantry: 4,
  EnemyDeployTank: 5,
  AutoDeployInfantry: 6,
};

export type TimerType = (typeof TimerType)[keyof typeof TimerType];

// Convert Enum to object with type so closure doesn't delete it
export const Faction = {
  Dominus: 1,
  Vanguard: 2,
};

export type Faction = (typeof Faction)[keyof typeof Faction];

export type Stats = {
  attack: number;
  attackSpeed: number;
  health: number;
  moveSpeed: number;
  range: number;
};

// Tank > Infantry
// Infantry > AirCraft
// AirCraft > Tank
export const UnitType = {
  Infantry: "infantry",
  Tank: "tank",
  Aircraft: "aircraft",
};

export type UnitType = (typeof UnitType)[keyof typeof UnitType];

export type Pylon = {
  maxLife: number;
  life: number;
};

export const ResearchType = {
  IncreaseInfantryRecruitment: 0,
  IncreaseResearchSpeed: 1,
  IncreaseTankBuildSpeed: 2,
  TankFactory: 3,
  TechCentre: 4,
  AddTechSkillPoint: 5,
  AutoDeployInfantry: 6,
  IncreaseInfantryAutoDeploySpeed: 7,
  AirBase: 8,
};

export type ResearchType = (typeof ResearchType)[keyof typeof ResearchType];

export interface TimerConfig {
  maxTime: number;
  speed: number;
}

export type Building = {
  x: number;
  y: number;
  width: number;
  height: number;
  lights: Light[];
};

export type Light = {
  x: number;
  y: number;
  size: number;
};
