import { Faction, Stats } from "./types";

// # Scene
export const wallConfig = {
  x: 20,
  y: 141,
  color: "#111",
  width: 3,
};
export const safeZoneConfig = {
  x: 20,
  y: 50,
  color: "#ccc",
  width: 3,
};

export const pylonCount = 13;
export const pylonWidth = 44;
export const pylonY = 40;
export const pylonDamageRange = 108;

export const pylonHexCodes = [
  "#78769b",
  "#8d8bb1",
  "#a7a5cb",
  "#bcbbdf",
  "#c9c7e7",
  "#dbdaed",
  "#e0dff7",
  "#dbdaed",
  "#c9c7e7",
  "#bcbbdf",
  "#a7a5cb",
  "#8d8bb1",
  "#78769b",
];

export const ionCannonConfig = {
  radius: 62,
  color: "#25bedf",
  opacity: 0.4,
  damage: 7,
  duration: 25,
  interval: 100,
  bolts: 4,
};

// Give the player a while to work out what's going on before
// sending enemy infantry and player research
export const initialGameStartDelay = 1000 * 12;

// # Theme
export function getFactionTheme(faction: Faction) {
  if (faction === Faction.Vanguard) {
    return {
      fill: "#18beba",
      border: "#08121c",
    };
  } else {
    return {
      fill: "#481c7f",
      border: "#170221",
    };
  }
}

export const tankStyle = {
  width: 30,
  height: 42,
};

export const aircraftStyle = {
  width: 28,
  height: 40,
};

// # Stats
export const playerMaxLife = 100;

// Player base stats
export const basePlayerInfantryStats: Stats = {
  attack: 11,
  attackSpeed: 0.2, // the higher, the faster the attack
  moveSpeed: 0.35,
  health: 100,
  range: 16,
};

export const basePlayerTankStats: Stats = {
  attack: 24,
  attackSpeed: 0.12,
  moveSpeed: 0.27,
  health: 150,
  range: 28,
};

export const basePlayerAircraftStats: Stats = {
  attack: 30,
  attackSpeed: 0.1,
  moveSpeed: 0.4,
  health: 100,
  range: 35,
};

// Enemy base stats
export const baseEnemyInfantryStats: Stats = {
  attack: 10,
  attackSpeed: 0.15,
  moveSpeed: 0.3,
  health: 100,
  range: 15,
};
export const baseEnemyTankStats: Stats = {
  attack: 20,
  attackSpeed: 0.1,
  moveSpeed: 0.2,
  health: 140,
  range: 28,
};
export const baseEnemyAircraftStats: Stats = {
  attack: 26,
  attackSpeed: 0.1,
  moveSpeed: 0.38,
  health: 100,
  range: 35,
};
export const techCentreStatIncrement: Stats = {
  attack: 2,
  attackSpeed: 0.05,
  moveSpeed: 0.1,
  health: 4,
  range: 1.5,
};

// # Difficulty
// The amount that enemy unit stats increment by each player level
export const enemyInfantryIncrementStat: Stats = {
  attack: 0.3,
  attackSpeed: 0.01,
  moveSpeed: 0.01,
  health: 1,
  range: 0.4,
};
export const enemyTankIncrementStat: Stats = {
  attack: 0.6,
  attackSpeed: 0.003,
  moveSpeed: 0.008,
  health: 1,
  range: 0.6,
};
export const enemyAircraftIncrementStat: Stats = {
  attack: 0.4,
  attackSpeed: 0.002,
  moveSpeed: 0.007,
  health: 1,
  range: 0.7,
};

export const enemyInfantrySpawnIncreaseSpeed = 0.03;
export const enemyTankSpawnIncreaseSpeed = 0.025;

// # Timers
export const playerInfantryTimerSpeed = 0.07;
export const playerTankTimerSpeed = 0.035;
export const playerAircraftTimerSpeed = 0.025;
export const playerResearchTimerSpeed = 0.035;
export const autoDeployInfantryTimerSpeed = 0.02;
export const ionCannonTimer = 0.02;

export const enemyInfantryTimerSpeed = 0.03;
export const enemyTankTimerSpeed = 0.02;
export const enemyAircraftTimerSpeed = 0.012;

// # Research
export const researchUpgradeStats = {
  timers: {
    playerInfantry: 0.015,
    playerTank: 0.02,
    playerResearch: 0.01,
    playerInfantryAutoDeploy: 0.02,
    playerAircraft: 0.015,
    ionCannon: 0.015,
  },
};
