import { Faction, Stats, TimerConfig } from "./types";

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
  "#3F3C7D", // Deep Purple
  "#4C4F9B", // Medium Purple-Blue
  "#7A79C0", // Light Purple-Blue
  "#8F8EC4", // Soft Purple-Blue
  "#A4A1C8", // Very Light Purple-Blue
  "#B9B6D1", // Lightest Purple-Blue
  "#D0C9E3", // Almost White Purple-Blue
  "#C8B9E2", // Very Light Lavender
  "#B0A1E1", // Light Lavender-Blue
  "#9B8CD0", // Medium Lavender-Blue
  "#7A79C0", // Light Purple-Blue
  "#4C4F9B", // Medium Purple-Blue
  "#3F3C7D", // Deep Purple
];

export const playerMaxLife = 100;

// Give the player a couple of minutes to work out what's going on before
// sending enemy infantry and player research
export const initialGameStartDelay = 1000 * 30;

// Player base stats
export const basePlayerInfantryStats: Stats = {
  attack: 11,
  attackSpeed: 0.2, // The bigger the faster the attack
  moveSpeed: 0.35,
  health: 100,
  range: 16,
};

export const basePlayerTankStats: Stats = {
  attack: 24,
  attackSpeed: 0.1,
  moveSpeed: 0.27,
  health: 150,
  range: 28,
};

// Enemy base stats
export const baseEnemyInfantryStats: Stats = {
  attack: 7,
  attackSpeed: 0.15,
  moveSpeed: 0.3,
  health: 100,
  range: 12,
};

export const baseEnemyTankStats: Stats = {
  attack: 20,
  attackSpeed: 0.1,
  moveSpeed: 0.2,
  health: 140,
  range: 28,
};

export const techCentreStatIncrement: Stats = {
  attack: 2,
  attackSpeed: 0.05,
  moveSpeed: 0.1,
  health: 4,
  range: 1.5,
};

// The amount that enemy unit stats increment by each player level
export const enemyInfantryIncrementStat: Stats = {
  attack: 0.3,
  attackSpeed: 0.005,
  moveSpeed: 0.02,
  health: 1,
  range: 0.6,
};

export const enemyTankIncrementStat: Stats = {
  attack: 0.4,
  attackSpeed: 0.002,
  moveSpeed: 0.02,
  health: 1,
  range: 0.7,
};

export function getFactionTheme(faction: Faction) {
  if (faction === Faction.Vanguard) {
    return {
      fill: "#18beba",
      border: "#08121c",
    };
  } else {
    return {
      fill: "#481c7f",
      border: "#290639",
    };
  }
}

export const tankStyle = {
  width: 30,
  height: 42,
};

export const playerInfantryTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.006,
};
export const playerTankTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.0035,
};
export const playerResearchTimer: TimerConfig = {
  maxTime: 100,
  // speed: 0.0035,
  speed: 0.02,
};
export const enemyInfantryTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.003,
};
export const enemyTankTimer: TimerConfig = {
  maxTime: 100,
  speed: 0.002,
};

export const researchUpgradeStats = {
  timers: {
    playerInfantry: 0.0022,
    playerTank: 0.002,
    playerResearch: 0.002,
  },
};
